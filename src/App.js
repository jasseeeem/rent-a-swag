import { useState, useEffect } from 'react';

import Navbar from './components/Navbar.js';
import Login from './components/Login.js'
import Home from './components/Home.js';
import Profile from './components/Profile.js';
import AddSwag from './components/AddSwag.js';
import { auth } from './services/Firebase.js';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <Navbar user={user} />
        <div className="container" >
          <Routes>
            <Route
              path="/"
              exact
              element={<Home user={user} />}
            />
            <Route
              path="/login"
              exact
              element={<Login user={user} />}
            />
            <Route
              path="/profile"
              exact
              element={<Profile user={user} />}
            />
            <Route
              path="/add"
              exact
              element={<AddSwag user={user} />}
            />
            {/* <Route
              path="/signup"
              exact
              element={<Signup user={user} />}
            /> */}
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
