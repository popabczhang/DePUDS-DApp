from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from app.models.user import User
from app.models.profile import Profile

api = Blueprint('api', __name__)

# Auth: Register new user
@api.route('/auth/register', methods=['POST'])
def register():
    data = request.json or {}
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    if not username or not email or not password:
        return jsonify({'error': 'Missing fields'}),400
    if User.query.filter((User.username==username)|(User.email==email)).first():
        return jsonify({'error': 'User already exists'}),409
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    access_token = create_access_token(identity=user.id)
    return jsonify({'message':'User registered','access_token':access_token}),201

# Auth: Login
@api.route('/auth/login', methods=['POST'])
def login():
    data = request.json or {}
    email = data.get('email')
    password = data.get('password')
    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({'error':'Invalid credentials'}),401
    access_token = create_access_token(identity=user.id)
    return jsonify({'message':'Login successful','access_token':access_token}),200

# Profile: Save or update encrypted data
@api.route('/user/profile', methods=['POST'])
@jwt_required()
def save_profile():
    user_id = get_jwt_identity()
    data = request.json or {}
    wallet = data.get('walletAddress')
    encrypted = data.get('encryptedData')
    if not wallet or not encrypted:
        return jsonify({'error':'Missing fields'}),400
    profile = Profile.query.filter_by(wallet_address=wallet).first()
    if profile:
        profile.encrypted_data = encrypted
    else:
        profile = Profile(user_id=str(user_id), wallet_address=wallet, encrypted_data=encrypted)
        db.session.add(profile)
    db.session.commit()
    return jsonify({'message':'Profile saved','profileId':profile.id}),200

# Profile: Get encrypted data
@api.route('/user/profile', methods=['GET'])
@jwt_required()
def get_profile():
    wallet = request.args.get('walletAddress')
    profile = Profile.query.filter_by(wallet_address=wallet).first()
    if not profile:
        return jsonify({'error':'Profile not found'}),404
    return jsonify({'walletAddress':profile.wallet_address,'encryptedData':profile.encrypted_data}),200

# Projects: Fetch all on-chain projects
@api.route('/projects', methods=['GET'])
def list_projects():
    svc = current_app.blockchain_service
    count = svc.call_contract_function('projectCount')
    projects = []
    for pid in range(1, count+1):
        id,name,description,owner,votes,isActive = svc.call_contract_function('getProject', pid)
        projects.append({
            'id':id,
            'name':name,
            'description':description,
            'owner':owner,
            'votes':votes,
            'isActive':isActive
        })
    return jsonify({'projects':projects}),200

# Projects: Create new project
@api.route('/projects', methods=['POST'])
def create_project():
    data = request.json or {}
    name = data.get('name'); desc = data.get('description')
    if not name or not desc:
        return jsonify({'error':'Missing fields'}),400
    tx_hash = current_app.blockchain_service.send_contract_transaction('createProject',[name, desc])
    return jsonify({'txHash':tx_hash}),200

# Vote: Cast a vote for a project
@api.route('/vote', methods=['POST'])
def cast_vote():
    data = request.json or {}
    project_id = data.get('projectId')
    if not project_id:
        return jsonify({'error':'Missing projectId'}),400
    tx_hash = current_app.blockchain_service.send_contract_transaction('vote',[project_id])
    return jsonify({'txHash':tx_hash}),200

# Votes: Get vote count for a project
@api.route('/votes/<int:project_id>', methods=['GET'])
def get_votes(project_id):
    svc = current_app.blockchain_service
    id,name,description,owner,votes,isActive = svc.call_contract_function('getProject', project_id)
    return jsonify({'projectId':id,'votes':votes}),200