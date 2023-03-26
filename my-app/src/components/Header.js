import './styles/Header.css'
import axios from "axios";
import {  Link } from 'react-router-dom'


function Header(props) {

    function logMeOut() {
        axios({
          method: "POST",
          url:"/logout",
        })
        .then((response) => {
           props.token()
        }).catch((error) => {
          if (error.response) {
            console.log(error.response)
            console.log(error.response.status)
            console.log(error.response.headers)
            }
        })}

    return (
<div>

    <div className="header">
    <a href="#default" className="logo">Recipeasy</a>
    <div className="header-right">
        <Link className="active" to="home">Home</Link>
        <Link to="contact">Favorites</Link>
        <Link to="about">Shopping Cart</Link>
        <Link to="profile">Profile</Link>
        <Link onClick={logMeOut}>Logout</Link>
    </div>
    </div>
</div>
    );
  }
  
  export default Header;