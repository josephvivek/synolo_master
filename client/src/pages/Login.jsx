import React from 'react';
import { useState,useEffect } from 'react'
import axios from 'axios'
import '../styles/Login.css'

function Login() {

  const [username,setUsername] = useState('');
  const [password,setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      var response = await axios.post('http://127.0.0.1:5000',{username,
        password,
      })
      console.log(response.data.message);
    }
    catch{
      console.log("Login Unsuccessful!");
    }
    
  };

  

  return (
    <>
      <div className="container">
        <p className="logo share-tech-regular">SYNOLO</p>
        <form className='login-form' onSubmit={handleSubmit}>
          <p className="heading">Log in to Synolo</p>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id='username' placeholder='Enter your username' onChange={(e) => setUsername(e.target.value)} value={username} />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="text" id='password' placeholder='Enter your password' onChange={(e) => setPassword(e.target.value)} value={password} />
          </div>
          <button type='submit' className="login-button">
            Proceed
          </button>
          <a href="#" className="create-account">Dont have an account? Sign Up.</a>
        </form>
        
      </div>
    </>
  )
}

export default Login;
