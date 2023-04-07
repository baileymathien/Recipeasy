import './styles/CurRecipes.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


function CurRecipes(props) {
    const [recipes, setRecipes] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [favorited, setFavorited] = useState(false);

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

    function favorite() {
        // if (favorited) {
        //     // Remove from favorites
        //     fetch(`http://localhost:5000/api/deleteFavorite/${props.userID}/${recipes[0].recipeId}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //         })
        //         .catch(error => {
        //             console.error(error);
        //         });
        // } else {
        //     // Add to favorites
        //     fetch(`http://localhost:5000/api/addFavorite/${props.userID}/${recipes[0].recipeId}`)
        //         .then(response => response.json())
        //         .then(data => {
        //             console.log(data);
        //         })
        //         .catch(error => {
        //             console.error(error);
        //         });
        // }
        setFavorited(!favorited);
    }

    return (
        <div >
            <link href="//netdna.bootstrapcdn.com/bootstrap/3.0.0/css/bootstrap.min.css" rel="stylesheet"></link>
            {recipes[0] && ingredients && (
                <div>
                    <div className='titleClass'>
                        <label htmlFor="id-of-input" className="custom-checkbox" onClick={favorite}>
                            <input type="checkbox" id="id-of-input" />
                            <i className="glyphicon glyphicon-star-empty"></i>
                            {favorited ? <i className="glyphicon glyphicon-star"></i> : <i className="glyphicon glyphicon-star-empty"></i>}
                            <span> {recipes[0].recipeName}</span>
                        </label>
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