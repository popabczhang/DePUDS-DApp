import json
import os
from web3 import Web3
from web3.middleware import geth_poa_middleware # Required for PoA networks like Polygon

class BlockchainService:
    def __init__(self, provider_url, contract_address, abi_path, default_account=None, private_key=None):
        self.w3 = Web3(Web3.HTTPProvider(provider_url))
        # Inject PoA middleware for networks like Polygon/Amoy
        self.w3.middleware_onion.inject(geth_poa_middleware, layer=0)

        if not self.w3.is_connected():
            raise ConnectionError("Failed to connect to the blockchain node.")

        self.contract_address = Web3.to_checksum_address(contract_address)
        self.abi = self._load_abi(abi_path)
        self.contract = self.w3.eth.contract(address=self.contract_address, abi=self.abi)

        self.default_account = default_account
        self.private_key = private_key
        if default_account:
             self.w3.eth.default_account = Web3.to_checksum_address(default_account)
        elif private_key:
             self.default_account = self.w3.eth.account.from_key(private_key).address
             self.w3.eth.default_account = self.default_account
        else:
            # Handle case where no account/key is provided for sending transactions
            # You might want to raise an error or only allow read operations
            print("Warning: No default account or private key provided for BlockchainService. Sending transactions will fail.")


    def _load_abi(self, abi_path):
        """Loads ABI from a JSON file."""
        if not os.path.exists(abi_path):
             raise FileNotFoundError(f"ABI file not found at path: {abi_path}")
        with open(abi_path, 'r') as f:
            contract_json = json.load(f)
            return contract_json['abi']

    def get_project_count(self):
        """Calls the public projectCount variable."""
        try:
            count = self.contract.functions.projectCount().call()
            return count
        except Exception as e:
            # Log error appropriately
            print(f"Error getting project count: {e}")
            return None

    def get_project(self, project_id):
        """Calls the projects mapping to get project details."""
        try:
            # Solidity mappings return default values if key not found.
            # Check projectCount or handle default return values.
            project_data = self.contract.functions.projects(project_id).call()
            # Assuming the struct Project has fields like name, description, voteCount, isActive
            # The order matters and corresponds to the struct definition in Solidity.
            # Example: return {'id': project_id, 'name': project_data[0], 'description': project_data[1], ...}
            # Adjust based on your actual struct fields.
            # If the first element is empty or zero, the project likely doesn't exist.
            if not project_data or not project_data[0]: # Basic check if project exists
                 return None
            # Replace with actual struct fields and order
            return {
                "id": project_id,
                "field1": project_data[0], # e.g., name
                "field2": project_data[1], # e.g., description
                "field3": project_data[2], # e.g., voteCount
                # ... add other fields based on your struct
            }
        except Exception as e:
            print(f"Error getting project {project_id}: {e}")
            return None

    def add_project(self, name, description, submitter_private_key):
        """
        Calls the addProject function (assuming it exists).
        Requires the private key of the account submitting the transaction.
        """
        if not submitter_private_key:
            raise ValueError("Private key required to add a project.")

        account = self.w3.eth.account.from_key(submitter_private_key)
        nonce = self.w3.eth.get_transaction_count(account.address)

        try:
            # Assume your contract has: function addProject(string memory _name, string memory _description) public { ... }
            transaction = self.contract.functions.addProject(name, description).build_transaction({
                'chainId': 80002, # Amoy Chain ID
                'gas': 2000000, # Estimate or set appropriate gas limit
                # Let web3.py estimate gas price or set manually if needed
                # 'gasPrice': self.w3.to_wei('30', 'gwei'), # Example manual gas price
                'nonce': nonce,
                'from': account.address # Ensure 'from' is set
            })

            signed_txn = self.w3.eth.account.sign_transaction(transaction, private_key=submitter_private_key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            return {"tx_hash": tx_hash.hex(), "receipt": receipt}
        except Exception as e:
            print(f"Error adding project: {e}")
            # Consider returning specific error info
            return None

    def vote_on_project(self, project_id, voter_private_key):
        """
        Calls the vote function (assuming it exists).
        Requires the private key of the voter.
        """
        if not voter_private_key:
            raise ValueError("Private key required to vote.")

        account = self.w3.eth.account.from_key(voter_private_key)
        nonce = self.w3.eth.get_transaction_count(account.address)

        try:
            # Assume your contract has: function vote(uint _projectId) public { ... }
            transaction = self.contract.functions.vote(project_id).build_transaction({
                'chainId': 80002, # Amoy Chain ID
                'gas': 500000, # Estimate or set appropriate gas limit
                'nonce': nonce,
                'from': account.address
            })

            signed_txn = self.w3.eth.account.sign_transaction(transaction, private_key=voter_private_key)
            tx_hash = self.w3.eth.send_raw_transaction(signed_txn.rawTransaction)
            receipt = self.w3.eth.wait_for_transaction_receipt(tx_hash)
            return {"tx_hash": tx_hash.hex(), "receipt": receipt}
        except Exception as e:
            print(f"Error voting on project {project_id}: {e}")
            return None

    # Add other methods as needed to interact with your contract functions