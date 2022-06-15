import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import handleCookies from '../../utils/helpers';
import './SignUp.css';


export default function SignUp() {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [error, setError] = useState(null);
  const [, setCookie] = useCookies();
  const navigate = useNavigate();

  async function onSignUp() {
    try {
      const {data} = await axios.post('http://localhost:8080/sign-up', {name, email, password});

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
        navigate("/");
      }
    } catch(ex) {
      setError(ex.response.data.error || 'Whoops! Something went wrong 🤪');
    }
  }

  return(
    <div className="signup-wrapper">
      {error && <h1>{error}</h1>}
      <label>
        <p>Name</p>
        <input type="text" name="name" onChange={(ev) => setName(ev.target.value)}/>
      </label>
      <label>
        <p>Email</p>
        <input type="text" name="email" onChange={(ev) => setEmail(ev.target.value)}/>
      </label>
      <label>
        <p>Password</p>
        <input type="password" name="password" onChange={(ev) => setPassword(ev.target.value)}/>
      </label>
      <div>
        <br />
      <button type="submit" onClick={onSignUp}>Submit</button>
      </div>
    </div>
  );
};

//State managing to store data
//Create function (SignUp handler) to make the Axios call
//Makes API call to backend
//When we get token/cookie we can store
//Redirect to protected route