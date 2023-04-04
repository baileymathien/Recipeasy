import './styles/Recipes.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';



function Recipes() {

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
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
                <div className='recipeCard'>
                    <div className="nameDateContainer">
                        <div className="recipeName"> {card.recipeName} {/* will be a variable */}</div>
                        <div className="recipeMeal"> {card.mealType} {/* will be a variable */}</div>
                    </div>
                    <a className="favoriteButton" href="#test">Favorite</a>
                    
                </div>
            ))}
        </div>
    );
}

export default Recipes;