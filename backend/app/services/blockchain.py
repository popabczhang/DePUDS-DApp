import json
import os
from web3 import Web3
from web3.middleware import geth_poa_middleware # Required for PoA networks like Polygon
from web3.exceptions import ContractLogicError # Import for better error handling

# --- Add get_blockchain_service to services/blockchain.py ---
# It's better practice to keep the getter close to where the service might be instantiated
# or managed, although having it in app/__init__.py is also common.
# We'll keep the one in app/__init__.py for now as it uses the global instance.

class BlockchainService:
    def __init__(self, provider_url, contract_address, abi_path, private_key=None):
        self.w3 = Web3(Web3.HTTPProvider(provider_url))
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)

        if not self.w3.isConnected():
            raise ConnectionError(f"Failed to connect to the blockchain node at {provider_url}.")

        # --- Change this line ---
        # self.contract_address = Web3.to_checksum_address(contract_address)
        self.contract_address = Web3.toChecksumAddress(contract_address) # Use toChecksumAddress() instead
        # --- End change ---
        self.abi = self._load_abi(abi_path)
        self.contract = self.w3.eth.contract(address=self.contract_address, abi=self.abi)

        self.account = None
        self.private_key = private_key
        if private_key:
            self.account = self.w3.eth.account.from_key(private_key)
            self.w3.eth.default_account = self.account.address # Set default account for calls if key provided
            print(f"BlockchainService initialized with account: {self.account.address}")
        else:
            print("Warning: No private key provided for BlockchainService. Sending transactions will require a key passed to send_contract_transaction.")

    def _load_abi(self, abi_path):
        """Loads ABI from a JSON file."""
        if not os.path.exists(abi_path):
            raise FileNotFoundError(f"ABI file not found at path: {abi_path}")
        with open(abi_path, 'r') as f:
            contract_json = json.load(f)
            # Ensure ABI is actually present
            if 'abi' not in contract_json or not contract_json['abi']:
                 raise ValueError(f"ABI array not found or empty in {abi_path}. Did you compile the contract?")
            return contract_json['abi']

    def call_contract_function(self, function_name, *args):
        """Calls a view or pure function on the contract."""
        try:
            func = self.contract.functions[function_name](*args)
            result = func.call()
            return result
        except Exception as e:
            # Log error appropriately
            print(f"Error calling contract function '{function_name}' with args {args}: {e}")
            # Re-raise or handle specific exceptions as needed
            raise e

    def send_contract_transaction(self, function_name, args_list, sender_private_key=None):
        """Builds, signs, and sends a transaction to the contract."""
        signing_key = sender_private_key or self.private_key
        if not signing_key:
            raise ValueError("Private key required to send a transaction, none provided.")

        account = self.w3.eth.account.from_key(signing_key)
        nonce = self.w3.eth.get_transaction_count(account.address)
        chain_id = self.w3.eth.chain_id # Get chain ID dynamically

        try:
            # Build Transaction
            func = self.contract.functions[function_name](*args_list)
            tx_params = {
                'chainId': chain_id,
                'gas': 2000000, # Consider estimating gas: func.estimate_gas({'from': account.address})
                # Let web3.py handle gas price estimation for EIP-1559 networks like Polygon
                'nonce': nonce,
                'from': account.address
            }
            # Estimate gas if needed, handle potential errors
            # try:
            #     estimated_gas = func.estimate_gas({'from': account.address})
            #     tx_params['gas'] = int(estimated_gas * 1.2) # Add buffer
            # except Exception as estimate_error:
            #     print(f"Warning: Gas estimation failed for {function_name}: {estimate_error}. Using default.")
            #     # Keep default gas or handle error

            transaction = func.build_transaction(tx_params)

            # Sign Transaction
            signed_txn = self.w3.eth.account.sign_transaction(transaction, private_key=signing_key)

            # Send Transaction
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            print(f"Transaction sent: {tx_hash.hex()}") # Log tx hash immediately

            # Wait for Receipt (optional here, can be done by caller if needed)
            # receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            # print(f"Transaction confirmed: {receipt.transactionHash.hex()}")
            return tx_hash.hex() # Return the transaction hash

        except ContractLogicError as cle:
             print(f"Contract logic error sending transaction '{function_name}': {cle}")
             # Extract revert reason if possible (depends on web3.py version and node)
             # You might need custom error decoding based on your contract
             raise Exception(f"Transaction reverted: {cle}") # Re-raise a more generic exception for the API layer
        except ValueError as ve:
             # Handle specific web3.py value errors (e.g., insufficient funds, gas issues)
             print(f"Value error sending transaction '{function_name}': {ve}")
             raise Exception(f"Transaction error: {ve}")
        except Exception as e:
            print(f"Error sending transaction '{function_name}': {e}")
            raise e # Re-raise other unexpected errors

    # Remove or comment out the old specific methods if no longer needed
    # def get_project_count(self): ...
    # def get_project(self, project_id): ...
    # def add_project(self, name, description, submitter_private_key): ...
    # def vote_on_project(self, project_id, voter_private_key): ...