import './styles/Recipes.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Recipes(props) {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {

        props.setLocation(window.location.href.split("/")[window.location.href.split("/").length - 1]);
        fetch('http://localhost:5000/api/recipes')
            .then(response => response.json())
            .then(data => {
                setRecipes(data);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div className='recipeScreen'>
            <Link to="/newrecipe">
                <div className='addNewCard'>

                    <div className="newNameDateContainer">
                        <div className="newRecipeName">Add New Recipe</div>
                    </div>
                </div>
            </Link>
            {recipes.map(card => (
                <Link to={'/recipe/'+card.recipeId}>
                    <div className='recipeCard' key={card.recipeId} >
                        <div className="nameDateContainer">
                            <div className="recipeName"> {card.recipeName} {/* will be a variable */}</div>
                            <div className="recipeMeal"> {card.mealType} {/* will be a variable */}</div>
                        </div>
                        <a className="favoriteButton" href="/test">Favorite</a>
                    </div>
                </Link>

            ))}
        </div>
    );
}

export default Recipes;