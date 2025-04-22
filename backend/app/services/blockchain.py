from web3 import Web3

class BlockchainService:
    def __init__(self, provider_url, contract_address, abi, default_account=None, private_key=None):
        self.web3 = Web3(Web3.HTTPProvider(provider_url))
        if default_account:
            self.web3.eth.default_account = default_account
            self.default_account = default_account
        else:
            self.default_account = None
        self.private_key = private_key
        self.contract = self.web3.eth.contract(address=contract_address, abi=abi)

    def get_balance(self, address):
        return self.web3.eth.get_balance(address)

    def send_transaction(self, from_address, to_address, value, private_key):
        transaction = {
            'to': to_address,
            'value': self.web3.toWei(value, 'ether'),
            'gas': 2000000,
            'gasPrice': self.web3.toWei('50', 'gwei'),
            'nonce': self.web3.eth.getTransactionCount(from_address),
        }
        signed_txn = self.web3.eth.account.sign_transaction(transaction, private_key)
        txn_hash = self.web3.eth.sendRawTransaction(signed_txn.rawTransaction)
        return txn_hash.hex()

    def call_contract_function(self, function_name, *args):
        function = self.contract.functions[function_name](*args)
        return function.call()
    
    def send_contract_transaction(self, function_name, args=None, from_address=None, private_key=None):
        args = args or []
        from_addr = from_address or self.default_account
        priv_key = private_key or self.private_key
        func = self.contract.functions[function_name](*args)
        txn = func.buildTransaction({
            'from': from_addr,
            'nonce': self.web3.eth.getTransactionCount(from_addr),
            'gas': 2000000,
            'gasPrice': self.web3.toWei('50', 'gwei')
        })
        signed = self.web3.eth.account.sign_transaction(txn, priv_key)
        tx_hash = self.web3.eth.sendRawTransaction(signed.rawTransaction)
        return tx_hash.hex()