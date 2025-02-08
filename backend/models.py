from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()  # Define the database instance


def configure_database(app):
    """Configure the database and initialize Flask-Migrate."""
    db.init_app(app)
    Migrate(app, db)  # Set up migration

class User(db.Model):
    __tablename__ = 'users' 
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)


class Prediction(db.Model):
    __tablename__ = 'predictions'
    
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), db.ForeignKey('users.username'), nullable=False)
    source = db.Column(db.String(255), nullable=False)
    destination = db.Column(db.String(255), nullable=False)
    vehicle_type = db.Column(db.String(50), nullable=False)
    passenger_count = db.Column(db.Integer, nullable=False)
    is_electric = db.Column(db.String(10), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    distance = db.Column(db.Float, nullable=False)
    time_taken = db.Column(db.Float, nullable=False)
    predicted_co2 = db.Column(db.Float, nullable=False)  

    def __repr__(self):
        return f'<Prediction {self.id} by {self.username}>'