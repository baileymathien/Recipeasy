import './styles/Recipes.css'
import {  Link } from 'react-router-dom'
// Function to gett all database recipes

const headers = ["test"];

function Recipes() {
    return (
        <div className='recipeScreen'>
             <Link to="/newrecipe">
                <div className='addNewCard'>
               
                <div className="nameDateContainer">
                    <div className="recipeName">Add New Recipe</div>
                </div>
            </div>
            </Link>
            {headers.map(type => (
                <div className='recipeCard'>
                   <div className="nameDateContainer">
                        <div className="recipeName">{type} {/* will be a variable */}</div>
                        <div className="recipeMeal">{type} {/* will be a variable */}</div>
                </div>
                <a className="favoriteButton" href="#test">Favorite</a>
                </div>
            ))}
        </div>
    );
}

export default Recipes;