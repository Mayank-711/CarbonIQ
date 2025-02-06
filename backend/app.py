from flask import Flask
from models import db  # Import the db instance

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
db.init_app(app)  

@app.route('/')
def home():
    return "Welcome to the API!"

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  
    app.run(debug=True)