import { signInWithGoogle } from '../services/Firebase.js';

import '../App.css';
import { useNavigate } from 'react-router';

const Login = ({ user }) => {

  const navigate = useNavigate();

  const onSubmit = async () => {
    await signInWithGoogle();
    navigate('/')
  }

  return (
    <div>
      <button className="button" onClick={onSubmit}><i className="fab fa-google"></i>Sign in with google</button>
    </div>
  )
}

export default Login;
