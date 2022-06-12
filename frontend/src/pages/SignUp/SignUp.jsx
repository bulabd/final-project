import React from 'react';
import './SignUp.css';


export default function SignUp() {
  return(
    <div className="signup-wrapper">
    <form action="http://localhost:8000/users/createuser">
      <label>
        <p>Name</p>
        <input type="text" />
      </label>
      <label>
        <p>Email</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
    </div>
  )
};

//State managing to store data
//Create function (SignUp handler) to make the Axios call
//Makes API call to backend
//When we get token/cookie we can store
//Redirect to protected route