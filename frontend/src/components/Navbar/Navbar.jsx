import React from "react";
import { useCookies } from 'react-cookie';
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';

export default function Navbar(props) {
  const [cookies] = useCookies(['user']); 
  const isLoggedIn = cookies.userId;

  console.log("cookies", cookies);
  console.log("cookies userID", cookies.userId);

  return(
    <div className="nav-div">
      <a href="/"><h1>Movies<FontAwesomeIcon icon={faFilm}/> </h1></a>
      <div className="user">
        {isLoggedIn ? (
          <>
         <h4>yay user logged in</h4>
         <button><a href="/user-dashboard" >Dashboard</a></button>
         <button><a href="/logout" >Logout</a></button>
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