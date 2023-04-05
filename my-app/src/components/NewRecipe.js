import './styles/NewRecipe.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const meals = [
    { value: 'Breakfast', label: 'Breakfast' },
    { value: 'Lunch', label: 'Lunch' },
    { value: 'Dinner', label: 'Dinner' }
]



const animatedComponents = makeAnimated();
function NewRecipe(props) {
    useEffect(() => {
        props.setLocation(window.location.href.split("/")[window.location.href.split("/").length-1]);
      }, []);


    const [title, setTitle] = useState();
    const [mealType, setMealType] = useState();
    const [instructions, setInstructions] = useState();
    const navigate = useNavigate()


    function addRecipe() {
        console.log(title, mealType)
        const recipe = {
            recipe_name: title.value,
            meal_type: mealType.value,
            instructions: instructions.value
        };

console.log(recipe)
        fetch('http://localhost:5000/api/newrecipes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
                <textarea className='textarea' placeholder='Enter recipe instructions here...' type="textarea" name="name" onChange={(e) => setInstructions({ value: e.target.value })}/>
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