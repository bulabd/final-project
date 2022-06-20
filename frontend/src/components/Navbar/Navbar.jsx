import React from "react";
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';


export default function Navbar() {
  const [cookies] = useCookies();

  const isLoggedIn = cookies.idCookie;

  return(

    <div className="nav-div">
      <div className="logo-container">
      <Link className="NavMage" to="/" title="Phone home"><img src={require('file:///Users/bailaly/Documents/Screen%20Shot%202022-06-18%20at%206.32.11%20PM.png')} alt="" width = "50" height = "auto"/></Link>
      <h1>Everyone's a Critic <FontAwesomeIcon icon={faFilm}/></h1>
      </div>
      <div className="user">
        {isLoggedIn ? (
          <>
         <h4 className="welcome-back">Welcome back {cookies.nameCookie}!</h4>
         <button className="Navbut"><Link className="NavLink" to="/playlists" title="Playlists">Playlists</Link></button>
         <button className="Navbut"><Link className="NavLink" to="/user-dashboard" title="Dashboard">Dashboard</Link></button>
         <button className="Navbut"><Link className="NavLink" to="/logout" title="Logout User">Logout</Link></button>
         </>
        ):(
          <>
          <button className="Navbut"><Link className="NavLink" to="/playlists" title="Playlists">Playlists</Link></button>
          <button className="Navbut"><Link className="NavLink" to="/login" title="Login User">Login</Link></button>
          <button className="Navbut"><Link className="NavLink" to="/sign-up" title="Register for an Account">Register</Link></button>
          </>
        )}
      </div>
    </div>
  );
}