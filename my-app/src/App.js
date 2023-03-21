import './App.css';
import Footer from './Footer.js'
import Header from './Header.js'
import Recipes from './Recipes.js'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Profile from './components/Profile'
import useToken from './components/useToken'

function App() {
  const { token, removeToken, setToken } = useToken();

  return (
    <BrowserRouter>
      <div className="App">
        <Header token={removeToken}/>
        {!token && token!=="" &&token!== undefined?  
        <Login setToken={setToken} />
        :(
          <>
            <Routes>
              <Route exact path="/profile" element={<Profile token={token} setToken={setToken}/>}></Route>
            </Routes>
          </>
        )}
      </div>
      <div className="App">
           <Recipes>
           </Recipes>
      </div>
    </BrowserRouter>

  );
}
//   return (
//     <div className="App">
//       <Header>
//       </Header>
//       <Recipes>
//       </Recipes>
//     </div>
//   );
// }
      // <Footer>
      // </Footer>

export default App;
