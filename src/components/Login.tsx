import { useState, FormEvent } from 'react';
import './login.css';
import API from './API-CALL';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import { AppDispatch } from '../redux/store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const result = await API('POST', 'login', { email, password });
    if (result.token) {
      setMessage('Login Successful!');
      dispatch(login({
          email, token: result.token,
          id: '',
          name: ''
      }));
      navigate('/');
    } else {
      setMessage(result.error || 'Login failed');
    }
  };

  return (
    <div className="loginForm">
      <form className="loginBox" onSubmit={handleSubmit}>
        <div className="input-group">
          <img src="/user.svg" alt="User Icon" className="input-icon" />
          <input
            type="email"
            placeholder="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <img src="/lock.svg" alt="Lock Icon" className="input-icon" />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="remember-me">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember">Remember me</label>
        </div>
        <input type="submit" value="Log in" className="submitBtn" />
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
