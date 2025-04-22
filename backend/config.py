from dotenv import load_dotenv

load_dotenv()

import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your_default_secret_key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///site.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    DEBUG = os.environ.get('DEBUG', 'False') == 'True'

    # Blockchain configuration
    BLOCKCHAIN_PROVIDER_URL = os.environ.get('BLOCKCHAIN_PROVIDER_URL') or 'https://polygon-rpc.com'
    CONTRACT_ADDRESS = os.environ.get('CONTRACT_ADDRESS') or '0xYourDeployedContractAddress'
    PRIVATE_KEY = os.environ.get('PRIVATE_KEY') or 'your_private_key_here'
    DEPLOYER_ADDRESS = os.environ.get('DEPLOYER_ADDRESS') or '0xYourDeployAddress'
    # Path to compiled contract ABI
    CONTRACT_ABI_PATH = os.environ.get('CONTRACT_ABI_PATH') or \
        os.path.join(os.path.dirname(__file__), '..', '..', 'blockchain', 'build', 'contracts', 'UrbanDevelopment.json')
    JWT_SECRET_KEY = SECRET_KEY  # Use SECRET_KEY for JWT auth