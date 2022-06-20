import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {handleCookies} from '../../utils/helpers';
import './SignUp.scss';


export default function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  async function onSignUp() {
    try {
      const {data} = await axios.post('/sign-up', {name, email, password});

      if(data) {
        const cookies = [
          {
            name: "idCookie",
            value: data.id,
          },
          {
            name: "emailCookie",
            value: data.email,
          },
          {
            name: "nameCookie",
            value: data.name,
          }
        ]
        handleCookies(cookies, setCookie);
        navigate("/");
      }
    } catch(ex) {
      setError(ex.response.data.error || 'Whoops! Something went wrong 🤪');
    }
  }

  return(
    <div className="signup_wrapper">
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
            <button className='user_btn' type="submit" onClick={onSignUp}>Register</button>
          </div>
      </div> 
    </div>
  );
};