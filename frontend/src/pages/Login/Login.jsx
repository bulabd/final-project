import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
// import { useCookies } from 'react-cookie';
// import axios from 'axios';
import './Login.css';

export default function Login(props) {
  // console.log("Login function's props", props);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  // const [cookie, setCookie] = useCookies(['user']);
  const navigate = useNavigate();


  // function handleCookie(data) {
  //   setCookie("userCookie", data.id, {
  //     path: "/"
  //   });
  // }

  // async function onLogin() {
  //   try {
  //     const {data} = await axios.post('http://localhost:8080/login', {email, password});
  //     console.log("I am data!----------", data);
  //     if(data) {
  //       handleCookie(data);
  //       navigate("..", { replace: true });
  //     }
  //   } catch(ex) {
  //     setError(ex.response.data.error || 'Whoops! Something went wrong 🤪');
  //   }
  // }

  // function testFunction (e) {
  //   console.log("-------EVENT TEST FUNC------------");
  //   console.log("------password:", password);
  //   e.preventDefault();
  // }

  return(
      <form id="loginform" onSubmit={() => props.onFormSubmit(email, password, navigate("..", { replace: true }))}>
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
        <br />
        <button form="loginform" type="submit">Submit</button>
      </div>
    </div>
  </form>
  );
};

//props.onSubmit(email, password)