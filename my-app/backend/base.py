import json
from flask import Flask, url_for, redirect, session, request, jsonify
from datetime import datetime, timedelta, timezone
from flask_sqlalchemy import SQLAlchemy
# from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
#                                unset_jwt_cookies, jwt_required, JWTManager
from models import db, User, Recipe, Ingredient, Favorites, IngredientList, ShoppingCart

from flask_cors import CORS #NEEDED

app = Flask(__name__)

CORS(app) #NEEDED

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipeasy.db'

app.config['SECRET_KEY'] = 'your_secret_key'
# app.config["JWT_SECRET_KEY"] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3OTQxNzQ0MywianRpIjoiNGRiOTllYWQtZTE1My00MTFlLTg0NWYtZjJlZmQxYTUwYjY5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6InRlc3QiLCJuYmYiOjE2Nzk0MTc0NDMsImV4cCI6MTY3OTQyMTA0M30.tzQgITU2zwXnb8qpJbnkfTrztPgiPZMC9AqM743XBPo"
# app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
# jwt = JWTManager(app)

app.config.from_object(__name__)

db.init_app(app)


#@app.before_first_request
@app.cli.command('initdb')
def createTables():
    db.drop_all()
    db.create_all()

# Refresh token login
# @app.after_request
# def refresh_expiring_jwts(response):
#     try:
#         exp_timestamp = get_jwt()["exp"]
#         now = datetime.now(timezone.utc)
#         target_timestamp = datetime.timestamp(now + timedelta(minutes=30))
#         if target_timestamp > exp_timestamp:
#             access_token = create_access_token(identity=get_jwt_identity())
#             data = response.get_json()
#             if type(data) is dict:
#                 data["access_token"] = access_token 
#                 response.data = json.dumps(data)
#         return response
#     except (RuntimeError, KeyError):
#         # Case where there is not a valid JWT. Just return the original respone
#         return response

# Logic for generating token dont forget to change config variable!!
# @app.route('/token', methods=["POST"])
# def create_token():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     if email != "test" or password != "test":
#         return {"msg": "Wrong email or password"}, 401

#     access_token = create_access_token(identity=email)
#     response = {"access_token":access_token}
#     return response

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
    # unset_jwt_cookies(response)
    return response

# Test auth here

@app.route('/profile')
# @jwt_required()
def my_profile():
    response_body = {
        "name": "Testing",
        "about" :"hello you are authorized"
    }

    return response_body

@app.route('/api/recipes')
def get_recipes():
    recipes = Recipe.query.all()
    return jsonify([recipe.serialize() for recipe in recipes])


@app.route('/api/newrecipes', methods=['POST'])
def add_recipe():
    if request.method == 'POST':
        # Retrieve the data from the request
        recipe_name = request.json['recipe_name']
        meal_type = request.json['meal_type']

        # Create a new Recipe object
        new_recipe = Recipe(recipeName=recipe_name, mealType=meal_type)

        # Add the new recipe to the database
        db.session.add(new_recipe)
        db.session.commit()

        # Return a success response
        return jsonify({'message': 'Recipe added successfully'})