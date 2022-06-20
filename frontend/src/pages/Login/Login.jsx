import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import {handleCookies} from '../../utils/helpers';
import './Login.css';


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['emailCookie']);
  const navigate = useNavigate();

  async function onLogin() {
    try {
      const {data} = await axios.post(`/login`, {email, password});

      if(data) {
        const cookies = [
          {
            name: "idCookie",
            value: data.id,
          },
          {
            name: "emailCookie",
            value: data.email,
          }
        ]
        handleCookies(cookies, setCookie);
        navigate('/');
      }

    } catch(ex) {
      console.log(ex);
      setError(ex.response.data.error || 'Whoops! Something went wrong 🤪');
    }
  }

  return(
      <div className="login-wrapper">
      {error && <h1>{error}</h1>}
      <div className='boxL'>
        <h1>Login</h1>
        <label>
          <h4>Email</h4>
          <input className='forms' type="text" name="email" onChange={(ev) => setEmail(ev.target.value)}/>
        </label>
        <label>
          <h4>Password</h4>
          <input className='forms' type="password" name="password" onChange={(ev) => setPassword(ev.target.value)}/>
        </label>
        <div>
           {/* NB: Add logic to make spacebar work! It doens't currently work to press submit!! */}
          <button className="user_btn" type="submit" onClick={onLogin}>Login</button>
        </div>
      {/* <label>
        <p>Email</p>
        <input type="text" name="email" onChange={(ev) => setEmail(ev.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" name="password" onChange={(ev) => setPassword(ev.target.value)}/>
      </label>
      <div>
        <br />
        <button form="loginform" type="submit" onClick={onLogin}>Submit</button>  */}
      </div>
    </div>
  );
};
