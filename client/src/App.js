import React, { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  NavLink,
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import GameDetails from "./components/GameDetails";
import GameList from "./components/GameList";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Searching from "./components/Searching";
import Search from "./components/Search";
import Messages from "./components/Messages";
import Selling from "./components/Selling";
import { useSession } from "react-session";
import { useDispatch, useSelector } from "react-redux";
import store from "./store";

function App() {
  const user = useSelector((state) => state.user);
  console.log(user);
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <nav className="lg bg-body-tertiary">
            <div className="flex items-center mr-4">
              <NavLink
                to="/games/1"
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                aria-current="page"
              >
                <span class="self-center text-2xl font-semibold whitespace-nowrap">
                  Gamify
                </span>
              </NavLink>
              <button
                data-collapse-toggle="navbar-default"
                type="button"
                class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
              <div className="hidden w-6/12 md:block" id="navbar-default">
                <ul className="font-medium flex flex-col p-3 md:p-0 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white ml-auto">
                  <li>
                    <NavLink
                      to="/games/1"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      aria-current="page"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Selling
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="#"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Pricing
                    </NavLink>
                  </li>
                  <li hidden={!user.loggedIn}>
                    <NavLink
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                      to="/messages"
                    >
                      Messages
                    </NavLink>
                  </li>
                  <li hidden={user.loggedIn}>
                    <NavLink
                      to="/login"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li hidden={user.loggedIn}>
                    <NavLink
                      to="/signup"
                      className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                    >
                      Sign Up
                    </NavLink>
                  </li>
                </ul>
              </div>
              <Searching />
            </div>
          </nav> */}

          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <NavLink className="navbar-brand" to="/games/1">
                GAMIFY
              </NavLink>
              <button
                data-collapse-toggle="navbar-default"
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarText"
                aria-controls="navbarText"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <NavLink
                      className="nav-link active"
                      aria-current="page"
                      to="/games/1"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                  <NavLink className="nav-link active" to="/selling">
                  Selling
                </NavLink>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Pricing
                    </a>
                  </li>
                </ul>
                <NavLink className="navlink" to="/messages">
                  Messages
                </NavLink>
                {!user.loggedIn ? <NavLink className="navlink" to="/login">
                  Login
                </NavLink> : null}
                {!user.loggedIn ? <NavLink className="navlink" to="/signup">
                  Sign Up
                </NavLink> : null}
                {user.loggedIn ? <button className="navlink">LogOut</button> : null}
              </div>
              <Searching />
            </div>
          </nav>
          <br />
          <h1 className="App-title">Gamify</h1>
          <h2 className="text-white">Your home for games</h2>
          <br />
          <br />
          <br />
        </header>
        <Routes>
          <Route exact path="games/:pagenum" element={<GameList />} />
          <Route exact path="/game/:id" element={<GameDetails />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/search/:page/:search" element={<Search />} />
          <Route exact path="/messages" element={<Messages />} />
          <Route exact path="/selling" element={<Selling />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
