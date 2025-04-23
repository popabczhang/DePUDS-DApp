from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.extensions import db
from app.models.user import User
from app.models.profile import Profile
from app.services.blockchain import get_blockchain_service # Import the service getter

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
        # Ensure the profile belongs to the logged-in user if updating
        if str(profile.user_id) != str(user_id):
             return jsonify({'error': 'Unauthorized access to profile'}), 403
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
    user_id = get_jwt_identity() # Get user ID from token
    wallet = request.args.get('walletAddress')
    if not wallet:
        return jsonify({'error': 'Missing walletAddress parameter'}), 400

    profile = Profile.query.filter_by(wallet_address=wallet).first()
    if not profile:
        return jsonify({'error':'Profile not found'}),404

    # Optional: Check if the requesting user owns this profile
    # if str(profile.user_id) != str(user_id):
    #     return jsonify({'error': 'Unauthorized'}), 403 # Or just return not found

    return jsonify({'walletAddress':profile.wallet_address,'encryptedData':profile.encrypted_data}),200

# Projects: Fetch all on-chain projects
@api.route('/projects', methods=['GET'])
def list_projects():
    svc = get_blockchain_service() # Use the getter
    try:
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
    except Exception as e:
        current_app.logger.error(f"Error fetching projects: {e}")
        return jsonify({'error': 'Failed to fetch projects from blockchain'}), 500


# Projects: Create new project
@api.route('/projects', methods=['POST'])
@jwt_required() # Require login to create projects
def create_project():
    # Note: Decide how to handle the private key for sending transactions.
    # Option 1: Use a single backend wallet (configured in BlockchainService).
    # Option 2: Get private key/signing method from user profile (requires secure storage/handling).
    # Option 3: Require private key in request (highly discouraged for security reasons).
    # Current implementation assumes Option 1.
    user_id = get_jwt_identity() # Get user ID to potentially associate project or check permissions
    data = request.json or {}
    name = data.get('name'); desc = data.get('description')
    if not name or not desc:
        return jsonify({'error':'Missing fields'}),400
    svc = get_blockchain_service() # Use the getter
    try:
        # Consider adding user_id or associated wallet address if your contract needs it
        tx_hash = svc.send_contract_transaction('createProject',[name, desc])
        return jsonify({'txHash':tx_hash}),200
    except Exception as e:
        current_app.logger.error(f"Error creating project: {e}")
        return jsonify({'error': 'Failed to create project on blockchain'}), 500

# Vote: Cast a vote for a project
@api.route('/vote', methods=['POST'])
@jwt_required() # Require login to vote
def cast_vote():
    # Similar private key considerations as create_project
    user_id = get_jwt_identity() # Get user ID to potentially check voting eligibility
    data = request.json or {}
    project_id = data.get('projectId')
    if not project_id:
        return jsonify({'error':'Missing projectId'}),400
    try:
        project_id = int(project_id) # Ensure project_id is an integer
    except ValueError:
        return jsonify({'error': 'Invalid projectId format'}), 400

    svc = get_blockchain_service() # Use the getter
    try:
        # Consider adding checks here (e.g., has user already voted?)
        tx_hash = svc.send_contract_transaction('vote',[project_id])
        return jsonify({'txHash':tx_hash}),200
    except Exception as e:
        current_app.logger.error(f"Error casting vote: {e}")
        return jsonify({'error': 'Failed to cast vote on blockchain'}), 500


# Votes: Get vote count for a project
@api.route('/votes/<int:project_id>', methods=['GET'])
def get_votes(project_id):
    svc = get_blockchain_service() # Use the getter
    try:
        # Fetch project details which include votes
        id_val, name, description, owner, votes, isActive = svc.call_contract_function('getProject', project_id)
        if id_val == 0: # Assuming ID 0 means project not found in contract
             return jsonify({'error': 'Project not found'}), 404
        return jsonify({'projectId':id_val,'votes':votes}),200
    except Exception as e:
        current_app.logger.error(f"Error getting votes for project {project_id}: {e}")
        # Check if the error indicates the project doesn't exist (this depends on contract behavior)
        # For now, return a generic error
        return jsonify({'error': 'Failed to get votes from blockchain'}), 500