import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SignUp.css';


export default function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies(['user']);
  const navigate = useNavigate();

  async function onSignUp() {
    try {
      const {data} = await axios.post('http://localhost:8080/sign-up', {name, email, password});
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
    <div className="signup-wrapper">
      {error && <h1>{error}</h1>}
        <div className='boxS'>
        <h1>Register</h1>
          <label>
            <h4>Name</h4>
            <input className='forms'  type="text" name="name" onChange={(ev) => setName(ev.target.value)}/>
          </label>
          <label>
            <h4>Email</h4>
            <input className='forms' type="text" name="email" onChange={(ev) => setEmail(ev.target.value)}/>
          </label>
          <label>
            <h4>Password</h4>
            <input className='forms' type="password" name="password" onChange={(ev) => setPassword(ev.target.value)}/>
          </label>
          <div>
            <button className='Userbut' type="submit" onClick={onSignUp}>Register</button>
          </div>
      </div>
    </div>
  );
};

//State managing to store data
//Create function (SignUp handler) to make the Axios call
//Makes API call to backend
//When we get token/cookie we can store
//Redirect to protected route