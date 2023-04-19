import json
from flask import Flask, url_for, redirect, session, request, jsonify, render_template
from datetime import datetime, timedelta, timezone
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import create_access_token,get_jwt,get_jwt_identity, \
                               unset_jwt_cookies, jwt_required, JWTManager
from models import db, User, Recipe, Ingredient, Favorites, IngredientList, ShoppingCart

from flask_cors import CORS #NEEDED

app = Flask(__name__, static_folder="../public", template_folder="../public")

CORS(app) #NEEDED

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipeasy.db'

app.config['SECRET_KEY'] = 'your_secret_key'
app.config["JWT_SECRET_KEY"] = "super-secret"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=1)
jwt = JWTManager(app)

app.config.from_object(__name__)

db.init_app(app)


#@app.before_first_request
@app.cli.command('initdb')
def createTables():
    db.drop_all()
    db.create_all()

#@app.before_first_request
@app.cli.command('filldb')
def filldb():
    all_foods = ["Baking Soda","Salt", "Pepper", "Garlic", "Onion", "Olive Oil", "Butter", "Eggs", "Milk", "Flour", "Sugar", "Honey", "Vinegar", "Lemon Juice", "Soy Sauce", "Worcestershire Sauce", "Mayonnaise", "Mustard", "Ketchup", "Hot Sauce", "Tomatoes", "Potatoes", "Carrots", "Celery", "Lettuce", "Cucumbers", "Broccoli", "Cauliflower", "Peppers", "Mushrooms", "Green Beans", "Spinach", "Kale", "Cabbage", "Zucchini", "Pumpkin", "Squash", "Corn", "Peas", "Lentils", "Beans", "Chickpeas", "Rice", "Pasta", "Bread", "Cheese", "Mozzarella", "Cheddar", "Parmesan", "Ricotta", "Feta", "Cream Cheese", "Yogurt", "Sour Cream", "Heavy Cream", "Cream", "Beef", "Chicken", "Turkey", "Pork", "Bacon", "Sausage", "Ham", "Salmon", "Tuna", "Shrimp", "Crab", "Lobster", "Scallops", "Clams", "Oysters", "Breadcrumbs", "Nuts", "Almonds", "Walnuts", "Cashews", "Peanuts", "Pecans", "Hazelnuts", "Macadamia Nuts", "Coconut", "Chocolate", "Cocoa Powder", "Vanilla Extract", "Cinnamon", "Nutmeg", "Ginger", "Cloves", "Bay Leaves"]
    for ingredient in all_foods:
        new_ingredient = Ingredient(ingredient)
        db.session.add(new_ingredient)
        db.session.commit()

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
   #return jsonify({"message": "Hello, world!"})
    return redirect(url_for('login_page'))

@app.route('/login', methods=['POST'])
def login_page():
    if request.method == 'POST':
        username = request.json.get('username')
        password = request.json.get('password')

        user = User.query.filter_by(username=username).first()

        if user and user.password == password:
            access_token = create_access_token(identity=username)
            return jsonify({"access_token": access_token}), 200
        else:
            return jsonify({"message": "Invalid username or password"}), 401

    return jsonify

@app.route('/registerAccount',  methods=["POST"])
def registerAccount():
    if request.method == 'POST':
        username = request.json.get('username')
        password = request.json.get('password')

        if User.query.filter_by(username=username).first() is not None:
            return jsonify({"message": "User already exists"}), 400

        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()

        access_token = create_access_token(identity=username)
        return jsonify({"access_token": access_token}), 200

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
@jwt_required()
def get_recipes():
    username = get_jwt_identity()
    print("get_recipes user_id:", username)
    user = User.query.filter_by(username=username).first()
    user_id = user.userId
    recipes = Recipe.query.filter_by(userId = user_id).all()
    recipes_list = []

    print("All recipes in the database:")
    all_recipes = Recipe.query.all()
    for r in all_recipes:
        print(r.recipeId, r.recipeName, r.userId)

    for recipe in recipes:
        recipes_list.append({
            'recipeId': recipe.recipeId,
            'recipeName': recipe.recipeName,
            'mealType': recipe.mealType,
            'instructions': recipe.instructions
        })
    print("get_recipes recipes_list:", recipes_list)
    return jsonify(recipes_list)



@app.route('/api/get_ingredients')
def get_ingredients():
    recipes = Ingredient.query.all()
    return jsonify([recipe.serialize() for recipe in recipes])

@app.route('/api/getCurrRecipe/<int:id>')
def getCurrRecipe(id):
    recipes = Recipe.query.filter_by(recipeId=id).all()
    ingredients = IngredientList.query.filter_by(recipeId=id).all()
    ingredient_ids = [ingredient.ingredientId for ingredient in ingredients]
    ingredient_names = [Ingredient.query.filter_by(ingredientId=id).first().ingredientName for id in ingredient_ids]
    recipe_data = [recipe.serialize() for recipe in recipes]
    ingredient_data = {'ingredientIds': ingredient_ids, 'ingredientNames': ingredient_names}
    data = {'recipes': recipe_data, 'ingredients': ingredient_data}
    return jsonify(data)


@app.route('/api/newrecipes', methods=['POST'])
@jwt_required()
def add_recipe():
    if request.method == 'POST':
        username = get_jwt_identity()
        print("add_recipe user_id:", username)
        user = User.query.filter_by(username=username).first()
        user_id = user.userId
        # Retrieve the data from the request
        recipe_name = request.json['recipe_name']
        meal_type = request.json['meal_type']
        instructions = request.json['instructions']
        ingredient_ids = request.json['ingredient_ids']

        # Create a new Recipe object
        new_recipe = Recipe(recipeName=recipe_name, mealType=meal_type, instructions=instructions,userId=user_id)
        
        # Add the new recipe to the database
        db.session.add(new_recipe)
        db.session.commit()
        print("add_recipe new_recipe:", new_recipe)
        for ingredient_id in ingredient_ids:
            ingredient_list = IngredientList(ingredientId=ingredient_id, recipeId=new_recipe.recipeId)
            db.session.add(ingredient_list)
            db.session.commit()


        # Return a success response
        return jsonify({'message': 'Recipe added successfully'})




@app.route('/api/addToFavorites/<int:recipe_id>/<string:user_id>', methods=['POST'])
def add_to_favorites(recipe_id, user_id):
    recipe = Recipe.query.get(recipe_id)
    user = User.query.filter_by(username=user_id).first()
    if recipe and user:
        favorite = Favorites(recipe_id=recipe.id, user_id=user.id)
        db.session.add(favorite)
        db.session.commit()
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Recipe or user not found"})

@app.route('/api/deleteFavorite/<string:user_id>/<int:recipe_id>', methods=['DELETE'])
def delete_from_favorites(recipe_id, user_id):
    favorite = Favorites.query.filter_by(recipe_id=recipe_id, user_id=user_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({"success": True})
    else:
        return jsonify({"success": False, "message": "Favorite not found"})

# @app.route('/api/get_favorites')
# def get_favorites():
#     recipes = Ingredient.query.all()
#     return jsonify([recipe.serialize() for recipe in recipes])