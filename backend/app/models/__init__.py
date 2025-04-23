# backend/app/models/__init__.py
from app import db # 如果需要从 models 包访问 db，则使其可用
from .user import User
from .profile import Profile

__all__ = ['db', 'User', 'Profile']