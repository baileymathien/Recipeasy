import { useState } from 'react';
import axios from "axios";
import './styles/Login.css'
import { useNavigate } from 'react-router-dom';

function Login(props) {
  const navigate = useNavigate();
  const [loginForm, setloginForm] = useState({
    username: "",
    password: ""
  })

  function logMeIn(event) {
    event.preventDefault()
    axios({
      method: "POST",
      url: "/login",
      data: {
        username: loginForm.username,
        password: loginForm.password
      }
    })
      .then((response) => {
        localStorage.setItem('jwtToken', response.data.access_token);
        props.setToken(response.data.access_token);
        navigate('/home');
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })

    setloginForm(({
      username: "",
      password: ""
    }))

  }

  function handleChange(event) {
    const { value, name } = event.target
    setloginForm(prevNote => ({
      ...prevNote, [name]: value
    })
    )
  }

  return (
    <div className="login-form">
      <form className="login" onSubmit={logMeIn}>
        <h1>Login</h1>
        <div className="input-field">
          <input onChange={handleChange}
            type="test"
            name="username"
            placeholder="Username"
            value={loginForm.username} />
        </div>

        <div className="input-field">
          <input onChange={handleChange}
            type="password"
            name="password"
            placeholder="Password"
            value={loginForm.password} />
        </div>

        <div className="action">
          <button type="submit">Sign In</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
