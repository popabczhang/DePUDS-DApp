from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
import json
from config import Config
from .services.blockchain import BlockchainService
from .models import user, profile  # Register models for SQLAlchemy

# Initialize extensions
db = SQLAlchemy()
jwt = JWTManager()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)

    with app.app_context():
        # Create database tables
        db.create_all()

        # Load contract ABI and initialize blockchain service
        with open(Config.CONTRACT_ABI_PATH) as f:
            contract_json = json.load(f)
        abi = contract_json.get('abi') or contract_json
        blockchain_service = BlockchainService(
            Config.BLOCKCHAIN_PROVIDER_URL,
            Config.CONTRACT_ADDRESS,
            abi,
            default_account=Config.DEPLOYER_ADDRESS,
            private_key=Config.PRIVATE_KEY
        )
        app.blockchain_service = blockchain_service

        from .routes import api
        app.register_blueprint(api)

    return app

app = create_app()