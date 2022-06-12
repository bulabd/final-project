import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';

export default function Navbar(props) {
  return(
    <div className="nav-div">
      <h1>Movies<FontAwesomeIcon icon={faFilm}/> </h1>
      <div className="user">
       <button><a href="/login">Login</a></button>
       <button><a href="/SignUp">Register</a></button>
      </div>
    </div>
  );
}