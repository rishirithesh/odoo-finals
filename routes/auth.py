from flask import Blueprint, request, jsonify
from extensions import db, bcrypt
from models import User
import jwt
import datetime

auth_bp = Blueprint("auth", __name__, url_prefix="/api/auth")

# -------------------
# Register new user
# -------------------
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "user")  # default role: user

    if not username or not email or not password:
        return jsonify({"message": "Missing fields"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode("utf-8")
    user = User(username=username, email=email, password_hash=hashed_password, role=role)
    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully", "user_id": user.id}), 201

# -------------------
# Login user
# -------------------
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    if not email or not password:
        return jsonify({"message": "Missing email or password"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({"message": "Invalid credentials"}), 401

    token = jwt.encode(
        {
            "user_id": user.id,
            "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=12)
        },
        key="your-secret-key-here",  # should match app.config['SECRET_KEY']
        algorithm="HS256"
    )

    return jsonify({
        "message": "Login successful",
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "role": user.role
        }
    }), 200

# -------------------
# Protected test route
# -------------------
from functools import wraps
from flask import current_app

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get("Authorization")
        if not token:
            return jsonify({"message": "Token is missing"}), 401
        try:
            decoded = jwt.decode(token, key=current_app.config['SECRET_KEY'], algorithms=["HS256"])
            user_id = decoded["user_id"]
        except Exception as e:
            return jsonify({"message": "Token is invalid", "error": str(e)}), 401
        return f(user_id, *args, **kwargs)
    return decorated

@auth_bp.route("/protected", methods=["GET"])
@token_required
def protected(user_id):
    user = User.query.get(user_id)
    return jsonify({"message": f"Hello {user.username}, you are authenticated!"})
