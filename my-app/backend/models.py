from flask_sqlalchemy import SQLAlchemy


db = SQLAlchemy()


# MODELS
class User(db.Model):
    userId = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False, unique=True)
    password = db.Column(db.String(30), nullable=False)
       
    def __repr__(self):
       return '<User {}>'.format(self.username)
    
class Recipe(db.Model):
    recipeId = db.Column(db.Integer, primary_key=True)
    recipeName = db.Column(db.String(30), nullable=False)
    instructions =  db.relationship('Ingredient', backref='recipe', lazy=True)

    def __repr__(self):
        return '<Recipe{}>'.format(self.recipeName)
    
class Ingredient(db.Model):
    ingredientId = db.Column(db.Integer, primary_key=True)
    ingredientName = db.Column(db.String(50), nullable=False)

    def __repr__(self):
        return '<Ingredient{}>'.format(self.ingredientName)
    
class Favorites(db.Model):
    userId = db.Column(db.Integer, db.ForeignKey('user.userId'), primary_key=True)
    recipeId = db.Column(db.Integer, db.ForeignKey('recipe.recipeId'), primary_key=True)

    def __repr__(self):
        return '<Favorites: User:{}, Recipe:{}'.format(self.userId, self.recipeId)
    
class IngredientList(db.Model):
    ingredientId = db.Column(db.Integer, db.ForeignKey('ingredient.ingredientId'), primary_key=True)
    recipeId = db.Column(db.Integer, db.ForeignKey('recipe.recipeId'), primary_key=True)

    def __repr__(self):
        return '<IngredientList: Ingredient ID:{}, Recipe ID:{}'.format(self.ingredientId, self.recipeId)
    
class ShoppingCart(db.Model):
    ingredientId = db.Column(db.Integer, db.ForeignKey('ingredient.ingredientId'), primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('user.userId'), primary_key=True)

    def __repr__(self):
        return '<ShoppingCart: Ingredient ID:{}, User ID:{}'.format(self.ingredientId, self.userId)