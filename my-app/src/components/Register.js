import React, { useState } from 'react';
import './styles/Register.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register(props) {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  function register(event) {
    event.preventDefault();

    if (registerForm.password !== registerForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    axios({
      method: 'POST',
      url: '/registerAccount',
      data: {
        username: registerForm.username,
        password: registerForm.password,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('jwtToken', response.data.access_token);
          props.setToken(response.data.access_token);
          navigate('/home');
        }
      })
      .catch((error) => {
        console.error(error);
      });

    setRegisterForm({
      username: '',
      password: '',
      confirmPassword: '',
    });
  }

  function handleChange(event) {
    const { value, name } = event.target;
    setRegisterForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }

  return (
    <div className="register-container">
      <h1>Register</h1>
      <form className="register-form" onSubmit={register}>
        <input
          onChange={handleChange}
          type="text"
          name="username"
          placeholder="Username"
          value={registerForm.username}
        />
        <input
          onChange={handleChange}
          type="password"
          name="password"
          placeholder="Password"
          value={registerForm.password}
        />
        <input
          onChange={handleChange}
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={registerForm.confirmPassword}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;