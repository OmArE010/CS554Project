import React, {useState} from 'react';
import axios from 'axios';
import '../App.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const SignUpForm = () => 
{
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let data = await axios.post(`http://localhost:4000/user/signup`, {firstname: e.target.firstName.value, lastname: e.target.lastName.value, username: e.target.userName.value,
            password: e.target.password.value});
            console.log(data);
            navigate('/games/1');
        }catch(e){
            console.log(e.response.data.error);
            alert(e.response.data.error);
        }
    }
    return (
      <div>
        <br/>
        <br/>
        <br/>
        <form id='SignUpForm' onSubmit={(e) => handleSubmit(e)}>
        <h1 className='h3 mb-3 fw-normal'>Sign Up to Gamify</h1>
          <label className='form-label'>
            First Name:
            <input id='firstName'name='firstName' type='text' className='form-control'
              placeholder='First Name'required
            />
          </label>
          <br />
          <label className='form-label'>
            Last Name:
            <input id='lastName' name='lastName' type='text' className='form-control'
              placeholder='Last Name' required
            />
          </label>
          <br />
          <label className='form-label'>
            User-Name:
            <input
              id='userName' name='userName' type='text' className='form-control'
              placeholder='User Name' required
            />
          </label>
          <br />
          <label className='form-label'>
            Password:
            <input id='password' name='password' type='password' className='form-control'
              placeholder='Password' required
            />
            <div class="col-auto">
            <span id="passwordHelpInline" class="form-text">
            Must Contain Capital Letter and Special Character.
            </span>
        </div>
          </label>
          <br/>
          <br />
          <input className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none' type='submit' value='Submit' />
          <br />
          <Link to="/login" className='link'> Already have an account? Click here to log-in! </Link>
        </form>
      </div>
    );
}

export default SignUpForm;