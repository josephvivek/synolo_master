import { useState } from 'react'
import '../styles/CreateAccount.css'

function CreateAccount() {

  return (
    <>
      <div className="container">
        <p className="logo share-tech-regular">SYNOLO</p>
        <form className='login-form'>
          <p className="heading">Create New Account</p>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input type="text" id='username' placeholder='Enter your username' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input type="text" id='password' placeholder='Enter your password' />
          </div>
          <div className="input-group">
            <label htmlFor="password">Confirm Password</label>
            <input type="text" id='password' placeholder='Re-enter your password' />
          </div>
          <button type='submit' className="login-button">
            Proceed
          </button>
          <a href="#" className="create-account">Already have an account? Log In.</a>
        </form>
        
      </div>
    </>
  )
}

export default CreateAccount;
