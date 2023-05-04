import React from 'react';
import './App.css';
import {NavLink, BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import GameDetails from './components/GameDetails';
import GameList from './components/GameList';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {/* <h1 className='App-title'>GAMIFY</h1> */}
          <nav class="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
              <NavLink className='navbar-brand' to='/games/1'>
              GAMIFY
            </NavLink>
              <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
              </button>
              <div class="collapse navbar-collapse" id="navbarText">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Features</a>
                  </li>
                  <li class="nav-item">
                    <a class="nav-link" href="#">Pricing</a>
                  </li>
                </ul>
                <NavLink className='navlink' to='/login'>
                 Login
                </NavLink>
                <NavLink className='navlink' to='/signup'>
                  Sign Up
                </NavLink>
              </div>
            </div>
          </nav>
          <br/>
          <h1 className='App-title'>GAMIFY</h1>
          <br/>
          <br/>
          {/* <nav>
            <NavLink className='navlink' to='/games/1'>
              GAMIFY
            </NavLink>
            <NavLink className='navlink' to='/login'>
              Login
            </NavLink>
            <NavLink className='navlink' to='/signup'>
              Sign Up
            </NavLink>
          </nav> */}
        </header>
        <Routes>
          <Route exact path = 'games/:pagenum' element={<GameList/>}/>
          <Route exact path = '/game/:id' element={<GameDetails />}/>
          <Route exact path = '/login' element={<Login />}/>
          <Route exact path = '/signup' element={<SignUp />}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
