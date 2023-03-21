import json
from flask import Flask, url_for, redirect, session, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager


app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipeasy.db'
db = SQLAlchemy(app)

app.config['SECRET_KEY'] = 'your_secret_key'
app.config["JWT_SECRET_KEY"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3OTQxNzQ0MywianRpIjoiNGRiOTllYWQtZTE1My00MTFlLTg0NWYtZjJlZmQxYTUwYjY5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2Nzk0MTc0NDMsImV4cCI6MTY3OTQyMTA0M30.tzQgITU2zwXnb8qpJbnkfTrztPgiPZMC9AqM743XBPo"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

# MODELS
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    password = db.Column(db.String(30), nullable=False)
       
    def __repr__(self):
       return '<User {}>'.format(self.username)
    
class Recipe(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    recipeId = db.Column(db.String(30), nullable=False)
    recipeName = db.Column(db.String(30), nullable=False)
    instructions =  db.relationship('Ingredient', backref='recipe', lazy=True)


#@app.before_first_request
@app.cli.command('initdb')
def createTables():
    db.drop_all()
    db.create_all()

# Refresh token login
@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.now(timezone.utc)
        target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        # Case where there is not a valid JWT. Just return the original respone
        return response

# Logic for generating token dont forget to change config variable!!
@app.route('/token', methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != "test" or password != "test":
        return {"msg": "Wrong email or password"}, 401

    access_token = create_access_token(identity=email)
    response = {"access_token":access_token}
    return response

@app.route('/')
def base():
    return redirect(url_for('login_page'))

@app.route('/login' ,methods=['POST', 'GET'])
def login_page():
    response_body = {
        "fname": "john",
        "lname": "smith"
    }
    return response_body

@app.route('/logout',  methods=["POST"])
def logout():
    session.clear()
    response = jsonify({"msg": "logout successful"})
    unset_jwt_cookies(response)
    return response

# Test auth here

@app.route('/profile')
@jwt_required()
def my_profile():
    response_body = {
        "name": "Testing",
        "about" :"hello you are authorized"
    }

    return response_body
