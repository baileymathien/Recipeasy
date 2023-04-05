import './styles/Cart.css'
import { Link } from 'react-router-dom'
import React, { useState, useEffect } from 'react';


function Cart(props) {
    useEffect(() => {
        props.setLocation(window.location.href.split("/")[window.location.href.split("/").length - 1]);
    }, []);

    const [recipes, setRecipes] = useState([]);





    return (
        <div className='recipeScreen'>
            Shopping Cart : 
        </div>
    );
}

export default Cart;