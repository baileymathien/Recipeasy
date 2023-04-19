import './styles/NewRecipe.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// { value: 'chocolate', label: 'Chocolate' },
// { value: 'strawberry', label: 'Strawberry' },
// { value: 'vanilla', label: 'Vanilla' }
let options = []

const meals = [
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Lunch', label: 'Lunch' },
    { value: 'Dinner', label: 'Dinner' },
    { value: 'Dessert', label: 'Dessert' }
]



const animatedComponents = makeAnimated();
function NewRecipe(props) {
    const [title, setTitle] = useState();
    const [mealType, setMealType] = useState();
    const [instructions, setInstructions] = useState();
    const [options, setOptions] = useState([]);
    const [selectedIngredients, setSelectedIngredients] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        props.setLocation(window.location.href.split("/")[window.location.href.split("/").length - 1]);
        fetch('http://localhost:5000/api/get_ingredients')
            .then(response => response.json())
            .then(data => {
                for (const test in data) {
                    const newOptions = data.map(item => ({ value: item.ingredientId, label: item.ingredientName }));
                    setOptions(newOptions);
                }
            })
            .catch(error => {
                console.error(error);
            });
    }, [props]);


    function addRecipe() {
        console.log(title, mealType)
        const recipe = {
            recipe_name: title.value,
            meal_type: mealType.value,
            instructions: instructions.value,
            ingredient_ids: selectedIngredients.map(item => item.value),
        };

        fetch('http://localhost:5000/api/newrecipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwtToken')}`

            },
            body: JSON.stringify(recipe)
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data)
                navigate('/home')
            })
            .catch(error => console.error(error));
    }



    return (
        <div >
            <div className='titleClass'>
                Add New Recipe
            </div>
            <form className='formCont'>
                <label className='smallTitle'>
                    Recipe Title
                </label>
                <input className='textbox' placeholder='Recipe Title' type="text" name="name" id='title' onChange={(e) => setTitle({ value: e.target.value })} />
                <br />
                <label className='smallTitle'>
                    Instructions
                </label>
                <textarea className='textarea' placeholder='Enter recipe instructions here...' type="textarea" name="name" onChange={(e) => setInstructions({ value: e.target.value })} />
                <br />
                <label className='smallTitle'>
                    Ingredients
                </label>
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? ' rgb(6, 106, 43)' : ' rgb(6, 106, 43)',
                            background: '#f4f4f4',
                        }),
                    }}
                    className='selectClass'
                    isMulti
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={options}
                    name="ingredients"
                    onChange={setSelectedIngredients}
                    value={selectedIngredients}
                />
                <label className='smallTitle'>
                    Meal Type
                </label>
                <Select
                    styles={{
                        control: (baseStyles, state) => ({
                            ...baseStyles,
                            borderColor: state.isFocused ? ' rgb(6, 106, 43)' : ' rgb(6, 106, 43)',
                            background: '#f4f4f4',
                        }),
                    }}
                    onChange={(e) => setMealType({ value: e.value })}
                    className='selectClass'
                    components={animatedComponents}
                    options={meals}
                    name="mealType"
                    id='mealType'
                />
                <a className='submit' type="submit" onClick={addRecipe} >Submit</a>

            </form>
        </div>
    );
}

export default NewRecipe;