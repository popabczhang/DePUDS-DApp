from flask import Flask
from flask_cors import CORS
from config import Config
from .extensions import db, jwt
from .services.blockchain import BlockchainService # Import the service class
import os

# Define blockchain_service globally
blockchain_service = None

def create_app(config_class=Config):
    global blockchain_service

    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    CORS(app)
    db.init_app(app)
    jwt.init_app(app)

    # Initialize Blockchain Service
    try:
        rpc_url = app.config.get('AMOY_RPC_URL')
        contract_address = app.config.get('CONTRACT_ADDRESS')
        abi_path = app.config.get('CONTRACT_ABI_PATH')
        backend_private_key = app.config.get('BACKEND_WALLET_PRIVATE_KEY') # Get the key

        if not rpc_url or not contract_address or not abi_path:
            raise ValueError("Missing blockchain configuration (AMOY_RPC_URL, CONTRACT_ADDRESS, CONTRACT_ABI_PATH).")

        if not os.path.exists(abi_path):
             raise FileNotFoundError(f"ABI file not found at: {abi_path}")

        # --- Use Option 1: Initialize with the backend private key ---
        blockchain_service = BlockchainService(
            provider_url=rpc_url,
            contract_address=contract_address,
            abi_path=abi_path,
            private_key=backend_private_key # Pass the key
        )
        # --- End Option 1 ---

        # Option 2 (commented out): Initialize without a default key
        # blockchain_service = BlockchainService(
        #     provider_url=rpc_url,
        #     contract_address=contract_address,
        #     abi_path=abi_path
        # )

        print("BlockchainService initialized successfully.")
        app.blockchain_service = blockchain_service # Attach to app context if needed elsewhere

    except (ConnectionError, FileNotFoundError, ValueError, Exception) as e:
        app.logger.error(f"Fatal Error initializing BlockchainService: {e}", exc_info=True) # Use app logger
        # Decide if the app should fail to start
        raise RuntimeError(f"Could not initialize BlockchainService: {e}") from e
        # blockchain_service = None # Set to None if allowing app to run without it

    # Register blueprints
    # Ensure routes_bp is correctly defined in app/routes/__init__.py
    from .routes import routes_bp
    app.register_blueprint(routes_bp, url_prefix='/api')

    # Create database tables if they don't exist
    with app.app_context():
        # db.drop_all() # Optional: drop tables for clean start during dev
        db.create_all()
        print("Database tables checked/created.")

    return app

# Function to get the blockchain service instance
def get_blockchain_service():
    # Access the globally initialized service
    global blockchain_service
    if blockchain_service is None:
        # This should ideally not happen if create_app raises an error on failure
        raise RuntimeError("BlockchainService is not initialized.")
    return blockchain_service