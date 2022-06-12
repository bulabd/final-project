import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './Login.css';

export default function Login() {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  async function onLogin() {
    try {
      const {data} = await axios.post('http://localhost:8080/login', {email, password});
      console.log(data);
      if(data) {
        setCookie('userId', data.id);
        navigate("..", { replace: true });
      }
    } catch(ex) {
      setError(ex.response.data.error || 'Whoops! Something went wrong 🤪');
    }
  }

  return(
    <div className="login-wrapper">
      {error && <h1>{error}</h1>}
      <label>
        <p>Email</p>
        <input type="text" name="email" onChange={(ev) => setEmail(ev.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" name="password" onChange={(ev) => setPassword(ev.target.value)}/>
      </label>
      <div>
        <button type="submit" onClick={onLogin}>Submit</button>
      </div>
    </div>
  );
};