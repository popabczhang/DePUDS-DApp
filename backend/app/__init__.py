from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from config import Config
from .extensions import db, jwt # Assuming you have db and jwt in extensions.py
from .services.blockchain import BlockchainService # Import the service
import os # Import os

# Define blockchain_service globally or attach it to the app context
blockchain_service = None

def create_app(config_class=Config):
    global blockchain_service # Access the global variable

    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    CORS(app) # Enable CORS
    db.init_app(app)
    jwt.init_app(app)

    # Initialize Blockchain Service
    try:
        # Check if necessary config values are present
        if not app.config.get('AMOY_RPC_URL') or \
           not app.config.get('CONTRACT_ADDRESS') or \
           not app.config.get('CONTRACT_ABI_PATH'):
            raise ValueError("Missing blockchain configuration in environment variables (AMOY_RPC_URL, CONTRACT_ADDRESS, CONTRACT_ABI_PATH).")

        # Check if ABI file exists before initializing
        if not os.path.exists(app.config['CONTRACT_ABI_PATH']):
             raise FileNotFoundError(f"ABI file not found at: {app.config['CONTRACT_ABI_PATH']}")

        # Instantiate the service - decide how to handle the private key
        # Option 1: Use a dedicated backend wallet key from config (if needed for sending txns)
        # backend_private_key = app.config.get('BACKEND_WALLET_PRIVATE_KEY')
        # blockchain_service = BlockchainService(
        #     provider_url=app.config['AMOY_RPC_URL'],
        #     contract_address=app.config['CONTRACT_ADDRESS'],
        #     abi_path=app.config['CONTRACT_ABI_PATH'],
        #     private_key=backend_private_key # Pass the key if backend sends transactions
        # )

        # Option 2: Initialize without a default key (if txns are signed client-side or per-request)
        blockchain_service = BlockchainService(
            provider_url=app.config['AMOY_RPC_URL'],
            contract_address=app.config['CONTRACT_ADDRESS'],
            abi_path=app.config['CONTRACT_ABI_PATH']
            # No private_key here; it will be passed per-method call if needed
        )
        print("BlockchainService initialized successfully.") # Add print statement

    except (ConnectionError, FileNotFoundError, ValueError, Exception) as e:
        # Log the error appropriately instead of just printing
        print(f"Error initializing BlockchainService: {e}")
        # Decide if the app should fail to start or continue without blockchain features
        # raise e # Uncomment to make app fail if blockchain service fails
        blockchain_service = None # Ensure it's None if initialization failed

    # Register blueprints
    from .routes import routes_bp # Assuming routes are in routes_bp
    app.register_blueprint(routes_bp, url_prefix='/api')

    # Create database tables if they don't exist
    with app.app_context():
        db.create_all()

    return app

# Function to get the blockchain service instance (useful in blueprints/routes)
def get_blockchain_service():
    global blockchain_service
    if blockchain_service is None:
        # This shouldn't happen if create_app succeeded and didn't raise an error,
        # but handle it defensively.
        raise RuntimeError("BlockchainService is not initialized.")
    return blockchain_service