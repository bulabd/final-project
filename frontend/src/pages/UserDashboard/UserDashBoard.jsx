import React from 'react';
import './UserDashboard.css';

export default function UserDashboard() {
  return(
    <div className="login-wrapper">
    <form>
      <label>
        <p>Username</p>
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
  );
};