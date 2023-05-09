
import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import actions from "../actions";

const LoginForm = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log(props);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let { data } = await axios.post(`http://localhost:4000/login`, {
        username: e.target.userName.value,
        password: e.target.password.value,
      });
      dispatch(
        actions.setUser(
          data.username,
          data.firstname,
          data.lastname,
          data.password,
          data.gamesSelling,
          true
        )
      );
      navigate(`/games/1`);
    } catch (e) {
      console.log(e.response.data.error);
      alert(e.response.data.error);
    }
  };
  return (
    <div>
      <br />
      {/* {error && (
        <div
          class="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
          role="alert"
        >
          <span class="font-medium">Warning!</span>
          {error.message}
        </div>
      )} */}
      <form
        id="LoginForm"
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {/* </div>method="POST" action = "/login">  */}
        <div className="mb-3">
          <h1 className="h3 mb-3 fw-normal">Please Log In</h1>
          <label className="form-label">
            User-Name:
            <input
              id="userName"
              name="userName"
              type="text"
              className="form-control"
              placeholder="User Name"
              required
            />
          </label>
          <br />
          <label className="form-label">
            Password:
            <input
              id="password"
              name="password"
              type="text"
              className="form-control"
              placeholder="Password"
              required
            />
          </label>
          <br />
          <input
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none"
            type="submit"
            value="Submit"
          />
          <br />
          <a href="/signup"> Don't have an account? Click here to sign-up! </a>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
