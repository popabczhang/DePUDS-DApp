from datetime import datetime
from app.extensions import db  # 从 extensions 导入 db

# Profile 模型用于存储用户加密的人口统计数据和钱包地址
class Profile(db.Model):
    __tablename__ = 'profiles'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.String(80), nullable=True)
    wallet_address = db.Column(db.String(42), unique=True, nullable=False)
    encrypted_data = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Profile {self.wallet_address}>'
