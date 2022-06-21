import "./Footer.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faGithub} from '@fortawesome/free-brands-svg-icons';

export default function Footer(props) {
  return(
    <main>
      <div className="footer-div">
        <a href="https://github.com/bulabd" target="_blank"><FontAwesomeIcon icon={faGithub} /> Bulat Abdullin</a>
        <a href="https://github.com/George-was-here" target="_blank"><FontAwesomeIcon icon={faGithub} /> George Burt</a>
        <a href="https://github.com/Baila3" target="_blank"><FontAwesomeIcon icon={faGithub} /> Baila Ly</a>
      </div>
    </main>
  );
}