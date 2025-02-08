from flask import Flask
from flask_cors import CORS
from models import configure_database, db
from flask_jwt_extended import JWTManager
from routes.auth_routes import auth_bp  # Import your auth routes blueprint
from routes.calcu_co2 import co2_prediction



def create_app():
    app = Flask(__name__)

    # Database Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config["JWT_SECRET_KEY"] = "3b5ab708578bda03026bbaa00bfc67aa5d1b48b8a2ded39c302bd85796bedb96"
    app.config['JWT_ACCESS_TOKEN_EXPIRES'] = 3600

    # Initialize extensions
    configure_database(app)
    JWTManager(app)
    CORS(app)

    CORS(app, resources={r"/api/*": {"origins": "*"}}) 
    
    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(co2_prediction)
    
    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True)
