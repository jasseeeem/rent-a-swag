import { signInWithGoogle } from '../services/firebase.js';

import '../App.css';

const Login = () => {
  return (
    <div>
      <button className="button" onClick={signInWithGoogle}><i className="fab fa-google"></i>Sign in with google</button>
    </div>
  )
}

export default Login;
