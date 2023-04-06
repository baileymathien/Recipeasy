import './App.css';
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import Recipes from './components/Recipes.js'
import { BrowserRouter, Route, Routes, Link, useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import Login from './components/Login'
import Profile from './components/Profile'
import useToken from './components/useToken'
import Newrecipe from './components/NewRecipe'
import CurRecipe from './components/CurRecipe'
import Cart from './components/Cart'

function App() {
  const { token, removeToken, setToken } = useToken();
  const [location, setLocation] = useState();
  const [recipeID, setRecipeID] = useState();


  return (
    <BrowserRouter>
      <div className="App">
        { false ?
          <Login setToken={setToken} />
          : (
            <>
              <Header token={removeToken} location={window.location.href.split("/")[window.location.href.split("/").length-1]}/>
              <Routes>
                <Route exact path="/profile" element={<Profile setLocation={setLocation} token={token} setToken={setToken} />}></Route>
                <Route exact path="/home" element={<Recipes setLocation={setLocation} setRecipeID={setRecipeID}/>}  ></Route>
                <Route exact path="/newrecipe" element={<Newrecipe setLocation={setLocation} />}></Route>
                <Route exact path="/recipe/:id" element={<CurRecipe setLocation={setLocation} id={recipeID} />}></Route>
                <Route exact path="/cart" element={<Cart setLocation={setLocation} />}></Route>
              </Routes>
              {/* <Recipes></Recipes> */}
            </>
          )}
      </div>
    </BrowserRouter>

  );
}
// MOVED THE SIGN IN CHECK HERE FOR TESTING
// !token && token !== "" && token !== undefined

export default App;
