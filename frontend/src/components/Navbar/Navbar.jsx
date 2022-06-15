import React from "react";
import { useCookies } from 'react-cookie';
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';

export default function Navbar() {
  const [cookies] = useCookies();

  const isLoggedIn = cookies.idCookie;

  return(
    <div className="nav-div">
      <div className="logo-container">
        <a href="/"><h1>Movies <FontAwesomeIcon icon={faFilm}/> </h1></a>
      </div>
      <div className="user">
        {isLoggedIn ? (
          <>
         <h4>Welcome back {cookies.emailCookie}!</h4>
         <button><a href="/user-dashboard" >Dashboard</a></button>
         <button><a href="/logout" >Logout</a></button>
         </>
        ):(
          <>
          <button><a href="/login">Login</a></button>
          <button><a href="/sign-up">Register</a></button>
          </>
        )}
      </div>
    </div>
  );
}