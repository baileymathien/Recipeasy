from flask import Flask, url_for, redirect, session
from flask_sqlalchemy import SQLAlchemy


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///recipeasy.db'
db = SQLAlchemy(app)

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

@app.route('/logout',  methods=["GET", "POST"])
def logout():
    session.clear()
    return redirect(url_for("login"))


