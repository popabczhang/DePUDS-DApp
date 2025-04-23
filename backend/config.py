import os # ensure os is imported
from dotenv import load_dotenv

load_dotenv()

# Define the base directory of the backend application
BASE_DIR = os.path.abspath(os.path.dirname(os.path.dirname(__file__))) # Adjust if your config.py is elsewhere
# Define the path to the ABI file relative to the base directory
ABI_FILE_PATH = os.path.join(BASE_DIR, '..', 'blockchain', 'build', 'contracts', 'UrbanDevelopment.json')


class Config:
    # ... existing config variables ...
    SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your-default-secret-key'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///app.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your-default-jwt-secret-key'

    # Blockchain Config
    AMOY_RPC_URL = os.environ.get('AMOY_RPC_URL')
    CONTRACT_ADDRESS = os.environ.get('CONTRACT_ADDRESS')
    CONTRACT_ABI_PATH = ABI_FILE_PATH
    # Optional: Load backend wallet key if needed for sending transactions
    BACKEND_WALLET_PRIVATE_KEY = os.environ.get('BACKEND_WALLET_PRIVATE_KEY')