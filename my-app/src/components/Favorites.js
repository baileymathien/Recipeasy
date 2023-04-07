import './styles/Recipes.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const meals = [
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Lunch', label: 'Lunch' },
    { value: 'Dinner', label: 'Dinner' },
    { value: 'Dessert', label: 'Dessert' }
]

const animatedComponents = makeAnimated();
function Favorites(props) {
    const [mealType, setMealType] = useState();

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        props.setLocation(window.location.href.split("/")[window.location.href.split("/").length - 1]);
        // fetch('http://localhost:5000/api/recipes')
        //     .then(response => response.json())
        //     .then(data => {
        //         setRecipes(data);
        //     })
        //     .catch(error => {
        //         console.error(error);
        //     });
    }, []);

    return (
        <div className='recipeScreen'>
            Filter by Meal Type
            <div className='selectCont'>
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? ' rgb(6, 106, 43)' : ' rgb(6, 106, 43)',
                            background: '#f4f4f4',
                        }),
                    }}
                    onChange={(value) => {
                        if (!value.length) {
                        setMealType(null);
                        } else {
                        setMealType(value);
                        }
                    }}
                    className='mealFilter'
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={meals}
                    name="ingredients"
                    value={mealType}
                />
            </div>
            {recipes.filter(card => {
                if (!mealType) { // if no meal type is selected, display all recipes
                    return true;
                } else { // filter recipes based on selected meal types
                    return mealType.some(type => card.mealType.includes(type.value));
                }
            }).map(card => (
                <Link to={'/recipe/' + card.recipeId} onClick={() => props.setRecipeID(card.recipeId)} key={card.recipeId}>
                    <div className='recipeCard'>
                        <div className="nameDateContainer">
                            <div className="recipeName">{card.recipeName}</div>
                            <div className="recipeMeal">{card.mealType}</div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default Favorites;