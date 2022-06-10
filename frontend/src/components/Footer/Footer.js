import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

export default function Footer(props) {
  return(
    <div className="footer-div">
   <a href="https://github.com/bulabd"><FontAwesomeIcon icon={faGithub} /> Bulat Abdullin</a>
   <a href="https://github.com/George-was-here"><FontAwesomeIcon icon={faGithub} /> George Burt</a>
   <a href="https://github.com/Baila3"><FontAwesomeIcon icon={faGithub} /> Baila Ly</a>
    </div>
  );
}