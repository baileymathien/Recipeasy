# Recipeasy

## To run the frontend

1. cd into my-app
2. run `npm start`

Note...
If you get an error like this:
> my-app@0.1.0 start
> react-scripts start
'react-scripts' is not recognized as an internal or external command,
operable program or batch file.

... run `npm install` and it should fix it


## To run the backend

1. In `recipeasy/my-app/backend` create a python virtual environment
   1. [You can find more here](https://flask.palletsprojects.com/en/2.2.x/installation/) in the virtual environment section
2. Activate your virtual environment
3. Run `pip install flask`
4. Then run your backend by running `flask --app base.py run` while in the `/backend` folder.
