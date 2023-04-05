import './styles/Recipes.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


function CurRecipes(props) {
    useEffect(() => {
        props.setLocation(window.location.href.split("/")[window.location.href.split("/").length - 1]);
    }, []);

    const [recipes, setRecipes] = useState([]);

    // useEffect(() => {

    //     props.setLocation(window.location.href.split("/")[window.location.href.split("/").length - 1]);
    //     fetch('http://localhost:5000/api/recipes')
    //         .then(response => response.json())
    //         .then(data => {
    //             setRecipes(data);
    //             console.log(data);
    //         })
    //         .catch(error => {
    //             console.error(error);
    //         });
    // }, []);

    return (
        <div className='recipeScreen'>
            Hello
        </div>
    );
}

export default CurRecipes;