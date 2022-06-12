import React from "react";
import { useCookies } from 'react-cookie';
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';

export default function Navbar(props) {
  const [cookies] = useCookies(['user']); 
  const isLoggedIn = cookies.userId;

  return(
    <div className="nav-div">
      <h1>Movies<FontAwesomeIcon icon={faFilm}/> </h1>
      <div className="user">
        {isLoggedIn ? (
          <>
         <h1>yay user logged in</h1>
         <a href="/logout">logout</a>
         </>
        ):(
          <>
          <button><a href="/login">Login</a></button>
          <button><a href="/SignUp">Register</a></button>
          </>
        )}
      </div>
    </div>
  );
}