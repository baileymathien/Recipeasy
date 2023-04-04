import './styles/NewRecipe.css'
import Select from 'react-select'
import makeAnimated from 'react-select/animated';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

const meals = [
    { value: 'breakfast', label: 'Breakfast' },
    { value: 'lunch', label: 'Lunch' },
    { value: 'dinner', label: 'Dinner' }
]

const animatedComponents = makeAnimated();
function NewRecipe() {
    return (
        <div >
            <div className='titleClass'>
                Add New Recipe
            </div>
            <form className='formCont'>
                <label className='smallTitle'>
                    Recipe Title
                </label>
                <input className='textbox' placeholder='Recipe Title' type="text" name="name" />
                <br />
                <label className='smallTitle'>
                    Instructions
                </label>
                <textarea className='textarea'  placeholder='Enter recipe instructions here...' type="textarea" name="name" />
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
                    options={options} name="ingredients"
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
                    className='selectClass'
                    components={animatedComponents}
                    options={meals} name="ingredients"
                />
                <a className='submit' type="submit">Submit</a>

            </form>
        </div>
    );
}

export default NewRecipe;