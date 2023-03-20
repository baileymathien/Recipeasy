from flask import Flask, url_for, redirect

app = Flask(__name__)

@app.route('/')
def base():
    return redirect(url_for('login_page'))

@app.route('/login')
def login_page():
    response_body = {
        "fname": "john",
        "lname": "smith"
    }
    return response_body