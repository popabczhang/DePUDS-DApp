import os
from dotenv import load_dotenv

# Load .env file from the 'backend' directory (where config.py is located)
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path=dotenv_path)

# Define the base directory of the backend application (the 'backend' folder)
BASE_DIR = os.path.abspath(os.path.dirname(__file__))
# Define the path to the ABI file relative to the BASE_DIR (backend folder)
# Go up one level ('..') from backend, then into 'blockchain'
ABI_FILE_PATH = os.path.join(BASE_DIR, '..', 'blockchain', 'build', 'contracts', 'UrbanDevelopment.json')
# Print path for verification during startup
print(f"Attempting to load ABI from: {ABI_FILE_PATH}")


class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'your-default-secret-key' # Use SECRET_KEY standard name
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(BASE_DIR, 'app.db') # Store db in backend folder
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY') or 'your-default-jwt-secret-key' # Keep this for JWT

    # Blockchain Config
    AMOY_RPC_URL = os.environ.get('AMOY_RPC_URL')
    CONTRACT_ADDRESS = os.environ.get('CONTRACT_ADDRESS')
    CONTRACT_ABI_PATH = ABI_FILE_PATH # Use the calculated path
    BACKEND_WALLET_PRIVATE_KEY = os.environ.get('BACKEND_WALLET_PRIVATE_KEY') # Load the key