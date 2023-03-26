import './styles/Header.css'
import axios from "axios";

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
        <a className="active" href="home">Home</a>
        <a href="contact">Favorites</a>
        <a href="about">Shopping Cart</a>
        <a href="profile">Profile</a>
        <a onClick={logMeOut}>Logout</a>
    </div>
    </div>
</div>
    );
  }
  
  export default Header;