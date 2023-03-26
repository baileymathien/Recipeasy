import './App.css';
import Footer from './components/Footer.js'
import Header from './components/Header.js'
import Recipes from './components/Recipes.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import useToken from './components/useToken'

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        { false ?
          <Login setToken={setToken} />
          : (
            <>
              <Header token={removeToken} />
              <Routes>
                <Route exact path="/profile" element={<Profile token={token} setToken={setToken} />}></Route>
                <Route exact path="/home" element={<Recipes />}></Route>
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
