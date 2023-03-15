import './Recipes.css'
import soup from './soup.jpg'
// Function to gett all database recipes
function Recipes() {
    return (
        <div className='recipeScreen'>
            <div className='recipeCard'>
                <img src = {soup} className="recipeImg"/> 
                <div className="nameDateContainer">
                    <div className="recipeName">Chicken Noodle Soup {/* will be a variable */}</div>
                    <div className="recipeMeal">Dinner {/* will be a variable */}</div>
                </div>
                <a className="favoriteButton" href="#test">Favorite</a>
            </div>
            <div className='recipeCard'>
                <img src = {soup} className="recipeImg"/> 
                <div className="nameDateContainer">
                    <div className="recipeName">Chicken Noodle Soup {/* will be a variable */}</div>
                    <div className="recipeMeal">Dinner {/* will be a variable */}</div>
                </div>
                <a className="favoriteButton" href="#test">Favorite</a>
            </div>
            <div className='recipeCard'>
                <img src = {soup} className="recipeImg"/> 
                <div className="nameDateContainer">
                    <div className="recipeName">Chicken Noodle Soup {/* will be a variable */}</div>
                    <div className="recipeMeal">Dinner {/* will be a variable */}</div>
                </div>
                <a className="favoriteButton" href="#test">Favorite</a>
            </div>
            <div className='recipeCard'>
                <img src = {soup} className="recipeImg"/> 
                <div className="nameDateContainer">
                    <div className="recipeName">Chicken Noodle Soup {/* will be a variable */}</div>
                    <div className="recipeMeal">Dinner {/* will be a variable */}</div>
                </div>
                <a className="favoriteButton" href="#test">Favorite</a>
            </div>
        </div>
    );
  }
  
export default Recipes;