import React from 'react';
import './App.css';
import {NavLink, BrowserRouter as Router, Route, Routes, Navigate, useNavigate} from 'react-router-dom';
import GameDetails from './components/GameDetails';
import GameList from './components/GameList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Searching from './components/Searching';
import Search from './components/Search';
import Messages from './components/Messages';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
              <NavLink className='navbar-brand' to='/games/1'>
              GAMIFY
            </NavLink>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <li className="nav-item">
                    <a className="nav-link active" aria-current="page" href="/games/1">Home</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Features</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">Pricing</a>
                  </li>
                </ul>
                <NavLink className='navlink' to='/messages'>
                 Messages
                </NavLink>
                <NavLink className='navlink' to='/login'>
                 Login
                </NavLink>
                <NavLink className='navlink' to='/signup'>
                  Sign Up
                </NavLink>
              </div>
              <Searching/>
            </div>
          </nav>
          <h1 className='App-title'>GAMIFY</h1>
          <br/>
          <p className='fs-2'>Your Home For Games</p>
          <br/>
          <br/>
          <br/>
        </header>
        <Routes>
          <Route exact path = 'games/:pagenum' element={<GameList/>}/>
          <Route exact path = '/game/:id' element={<GameDetails />}/>
          <Route exact path = '/login' element={<Login />}/>
          <Route exact path = '/signup' element={<SignUp />}/>
          <Route exact path = '/search/:page/:search' element={<Search />}/>
          <Route exact path = '/messages' element={<Messages />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
