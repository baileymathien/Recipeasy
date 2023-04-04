import './styles/Header.css'
import axios from "axios";
import {  Link } from 'react-router-dom'
const headers = ["Home", "Favorites", "Cart", "Profile"]

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

      function changeActive(prev){
        console.log(prev)
        prev.classList.add("active");
      }

    return (
<div>

    <div className="header">
    <Link to="home" className="logo">Recipeasy</Link>
    <div className="header-right">
      {headers.map(type => (
          <Link
            key={type}
            to={type.toLowerCase()}
            className = {window.location.href.split("/")[window.location.href.split("/").length-1] == type.toLowerCase() ? "active" : ""}
          >
            {type}
          </Link>
        ))}
        {/* <Link className="active" to="home" onClick={changeActive}>Home</Link>
        <Link to="contact" onClick={changeActive}>Favorites</Link>
        <Link to="cart" onClick={changeActive}>Cart</Link>
        <Link to="profile" onClick={changeActive}>Profile</Link> onClick={() => changeActive(type)}
        className = {window.location.href = :}
        */}

        <Link onClick={logMeOut}>Logout</Link>
    </div>
    </div>
</div>
    );
  }
  
  export default Header;