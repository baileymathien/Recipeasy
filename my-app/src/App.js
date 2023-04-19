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
import Favorites from './components/Favorites'
import Register from './components/Register'

function App() {
  const { token, removeToken, setToken } = useToken();
  const [location, setLocation] = useState();
  const [recipeID, setRecipeID] = useState();

  return (
    <BrowserRouter>
      <div className="App">
        <Header token={removeToken} location={window.location.href.split("/")[window.location.href.split("/").length-1]} />
        {!token && (
         <>
          <div class="container">
            <h1>Login or Signup to get Started!</h1>
            <div class="button-group">
              <a href="/login" class="button primary">Login</a>
              <a href="/register" class="button secondary">Signup</a>
            </div>
          </div>
          
         </> 
        )}
        <Routes>
          {!token && (
            <>
            <Route exact path="/login" element={<Login setToken={setToken} />} />
            <Route exact path="/register" element={<Register setToken={setToken} />} />
            </>
            )}
          
          {token && (
            <>
              <Route exact path="/profile" element={<Profile setLocation={setLocation} token={token} setToken={setToken} />}></Route>
              <Route exact path="/home" element={<Recipes setLocation={setLocation} setRecipeID={setRecipeID}/>}  ></Route>
              <Route exact path="/newrecipe" element={<Newrecipe setLocation={setLocation} />}></Route>
              <Route exact path="/recipe/:id" element={<CurRecipe setLocation={setLocation} id={recipeID} userID={1}/>}></Route>
              <Route exact path="/cart" element={<Cart setLocation={setLocation} />}></Route>
              <Route exact path="/favorites" element={<Favorites setLocation={setLocation} userID={1}/>}></Route>
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>

  );
}
// MOVED THE SIGN IN CHECK HERE FOR TESTING
// !token && token !== "" && token !== undefined

export default App;