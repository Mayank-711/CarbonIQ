from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, configure_database, User
from werkzeug.security import generate_password_hash,check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, JWTManager

app = Flask(__name__)
CORS(app)

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize database and migrations
configure_database(app)

app.config["JWT_SECRET_KEY"] = "3b5ab708578bda03026bbaa00bfc67aa5d1b48b8a2ded39c302bd85796bedb96"  # Keep this secret in production
jwt = JWTManager(app)

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return jsonify({"error": "Username and password are required"}), 400

        user = User.query.filter_by(username=username).first()

        if user and check_password_hash(user.password, password):
            # Create JWT Token
            access_token = create_access_token(identity={"username": user.username, "email": user.email})
            return jsonify({"access_token": access_token, "message": "Login successful"}), 200
        else:
            return jsonify({"error": "Invalid username or password"}), 401

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Welcome to the API!"

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()

        if not data:
            return jsonify({"error": "No JSON payload received"}), 400

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirmPassword')

        # Input validation
        if not all([username, email, password, confirm_password]):
            return jsonify({"error": "All fields are required"}), 400

        if password != confirm_password:
            return jsonify({"error": "Passwords do not match"}), 400

        # Check if the user already exists
        if User.query.filter_by(username=username).first():
            return jsonify({"error": "Username already exists"}), 400

        if User.query.filter_by(email=email).first():
            return jsonify({"error": "Email already exists"}), 400

        # Hash the password using a secure method
        hashed_password = generate_password_hash(password, method='pbkdf2:sha256')

        # Create a new user and commit to the database
        new_user = User(username=username, email=email, password=hashed_password)
        db.session.add(new_user)
        db.session.commit()

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Internal server error: " + str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
