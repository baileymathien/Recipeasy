import './Header.css'
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
<body>
    <header className="App-header">
        <button onClick={logMeOut}> 
            Logout
        </button>
    </header>
    <div class="header">
    <a href="#default" class="logo">Recipeasy</a>
    <div class="header-right">
        <a class="active" href="#home">Home</a>
        <a href="#contact">Favorites</a>
        <a href="#about">Shopping Cart</a>
    </div>
    </div>
</body>
    );
  }
  
  export default Header;