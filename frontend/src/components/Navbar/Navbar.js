import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faFilm} from '@fortawesome/free-solid-svg-icons';

export default function Navbar(props) {
  return(
    <div className="nav-div">
      <h1>Movies<FontAwesomeIcon icon={faFilm}/> </h1>
      <div className="user">
        <a href="/login">Login</a>
        <a href="/SignUp"> /Register</a>
      </div>
    </div>
  );
}