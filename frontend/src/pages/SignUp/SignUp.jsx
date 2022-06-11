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
}
