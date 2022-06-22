import "./Dropdown.css"
import DropdownGenre from "./DropdownGenre/DropdownGenre";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSortDesc} from '@fortawesome/free-solid-svg-icons';

export default function Dropdown(props) {

  return (

    <div className="dropdownGenre">
      <button className="dropbtn">Select a genre <FontAwesomeIcon className="buttonIcon" icon={faSortDesc}/></button>
      <div className="dropdown-content">
        <DropdownGenre onChange={props.onChange} genreID={28} >Action</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={12} >Adventure</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={16} >Animation</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={35} >Comedy</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={80} >Crime</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={99} >Documentary</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={18} >Drama</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={10751} >Family</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={14} >Fantasy</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={36} >History</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={27} >Horror</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={10402} >Music</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={9648} >Mystery</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={10749} >Romance</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={878} >Science Fiction</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={10770} >TV Movie</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={53} >Thriller</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={10752} >War</DropdownGenre>
        <DropdownGenre onChange={props.onChange} genreID={37} >Western</DropdownGenre>
      </div>
    </div>
  );
}