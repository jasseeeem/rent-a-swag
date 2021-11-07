import { useState, useEffect } from 'react';

import Login from './components/login.js'
import Home from './components/home.js';
import firebase from './services/firebase.js';

import './App.css';



const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      setUser(user);
    })
  }, [])

  console.log(user);

  return (
    <div className="app">
      {user ? <Home user={user} /> : <Login />}
    </div>
  );
}

export default App;
