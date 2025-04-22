# filepath: backend/app/models/profile.py
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from . import User, db

# Profile model to store user encrypted demographic data and wallet address
class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(80), nullable=True)
    wallet_address = db.Column(db.String(42), unique=True, nullable=False)
    encrypted_data = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Profile {self.wallet_address}>'
