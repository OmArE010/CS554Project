import React, {useState} from 'react';
import axios from 'axios';
import '../App.css';

const SignUpForm = () => 
{
    return (
      <div>
        <form id='SignUpForm' method="POST" action = "/signup">
          <label>
            First Name:
            <input id='firstName'name='firstName' type='text'
              placeholder='First Name'required
            />
          </label>
          <br />
          <label>
            Last Name:
            <input id='lastName' name='lastName' type='text'
              placeholder='Last Name' required
            />
          </label>
          <br />
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
            <input id='password' name='password' type='text'
              placeholder='Password' required
            />
          </label>
          <br />
          <input type='submit' value='Submit' />
          <br />
          <a href="/login"> Already have an account? Click here to log-in! </a>
        </form>
      </div>
    );
}

export default SignUpForm;