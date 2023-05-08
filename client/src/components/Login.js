import React, {useState} from 'react';
import axios from 'axios';
import '../App.css';

const LoginForm = () => 
{

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            let data = await axios.post(`http://localhost:4000/login`, {username: e.target.userName.value, password: e.target.password.value});
            console.log(data);
        }catch(e){
            console.log(e.response.data.error);
            alert(e.response.data.error);
        }
    }
    return (
      <div> 
        <br/>
        <form id='LoginForm' onSubmit={(e) => handleSubmit(e)}> 
        {/* </div>method="POST" action = "/login">  */}
        <div className='mb-3'>
            <h1 className='h3 mb-3 fw-normal'>Please Log In</h1>
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
            <input
              id='password' name='password' type='text' className='form-control'
              placeholder='Password' required
            />
          </label>
          <br />
          <input className='btn btn-primary' type='submit' value='Submit' />
          <br />
          <a href="/signup"> Don't have an account? Click here to sign-up! </a>
          </div>
        </form>
      </div>
    );
}

export default LoginForm;