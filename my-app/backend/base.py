import json
from flask import Flask, request, url_for, redirect
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, get_jwt, get_jwt_identity, unset_jwt_cookies, jwt_required, JWTManager

#setup and configurations
app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = "secrets"
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=1)
jwt = JWTManager(app)

@app.route('/')
def base():
    return redirect(url_for('profile_page'))

@app.route('/token', methods=['POST'])
def create_token():
    """create a token for the profile page"""
    username = request.json.get("username", None)
    password = request.json.get("password", None)

    # ONCE DATABASE IS CONNECTED THIS SHOULD BE COMPARING TO THAT DATA
    if (username != "user" or password != "pass"):
        return {"msg": "wrong email or password"}, 401
    
    access_token = create_access_token(identity=username)
    response = {"access_token":access_token}
    return response

@app.route('/logout', methods=['POST'])
def logout():
    """logout out of application"""
    response = ({"msg": "Successful logout"})
    # should be clearing the cookies?
    return response

@app.route('/profile')
def profile_page():
    """return the profile page"""
    response_body = {
        "fname": "john",
        "lname": "smith"
    }
    return response_body