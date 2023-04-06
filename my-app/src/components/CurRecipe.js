import './styles/CurRecipes.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


function CurRecipes(props) {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        const recipeId = props.id !== undefined ? props.id : window.location.href.split("/")[window.location.href.split("/").length - 1];
        props.setLocation(window.location.href.split("/")[window.location.href.split("/").length - 1]);
        fetch(`http://localhost:5000/api/getCurrRecipe/${recipeId}`)
            .then(response => response.json())
            .then(data => {
                setRecipes(data.recipes);
                setIngredients(data.ingredients.ingredientNames);
                console.log(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, [props.id]);
    // useEffect(() => {
    //   }, [recipes]);

    console.log(ingredients)
    return (
        <div >
            {recipes[0] && ingredients && (
                <div>
                    <div className='titleClass'  >
                        {recipes[0].recipeName}
                    </div>

                    <div className='subHeader'  >
                        {recipes[0].mealType}
                    </div>

                    <div className='smallTitle'  >
                        Instructions:
                    </div>

                    <div className='body'  >
                        {recipes[0].instructions.split('\n').map((line, index) => (
                            <React.Fragment key={index}>
                                {line}
                                <br />
                            </React.Fragment>
                        ))}
                    </div>

                    <div className='smallTitle'  >
                        Ingredients:
                    </div>

                    <div className='body'  >
                        {ingredients.map((ingredient, index) => (
                            <div key={index}>
                                {ingredient}
                            </div>
                        ))}
                    </div>

                    <br />

                </div>
            )}
        </div>
    );
}

export default CurRecipes;