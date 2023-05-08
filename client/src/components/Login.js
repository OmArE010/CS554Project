import React, {useState} from 'react';
import axios from 'axios';
import '../App.css';

const LoginForm = () => 
{
    return (
      <div> 
        <form id='LoginForm' method="POST" action = "/login"> 
          <label>
            User-Name:
            <input
              id='userName' name='userName' type='text'
              placeholder='User Name' required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              id='password' name='password' type='text'
              placeholder='Password' required
            />
          </label>
          <br />
          <input type='submit' value='Submit' />
          <br />
          <a href="/signup"> Already have an account? Click here to log-in! </a>
        </form>
      </div>
    );
}

export default LoginForm;