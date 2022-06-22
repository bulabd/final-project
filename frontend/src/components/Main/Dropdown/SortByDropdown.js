import SortByOption from "./SortByOption/SortByOption";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDesc  } from '@fortawesome/free-solid-svg-icons';
import "./Dropdown.css"


export default function SortByDropdown(props) {

  return (

    <div className="dropdownSort">
      <button className="dropbtn">Sort By  <FontAwesomeIcon className="buttonIcon" icon={faSortDesc}/></button>
      <div className="dropdown-content">
        <SortByOption onChange={props.onChange} sorting={'popularity.desc'} >Popularity</SortByOption>

        <SortByOption onChange={props.onChange} sorting={'release_date.desc'} >Release Date</SortByOption>

        <SortByOption onChange={props.onChange} sorting={'vote_average.desc'} >Rating</SortByOption>

      </div>
    </div>
  );
}