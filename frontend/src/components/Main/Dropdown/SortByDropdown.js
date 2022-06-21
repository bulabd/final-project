import SortByOption from "./SortByOption/SortByOption";
import "./Dropdown.css"


export default function SortByDropdown(props) {

  return (

    <div className="dropdownSort">
      <button className="dropbtn">Sort By</button>
      <div className="dropdown-content">
        <SortByOption onChange={props.onChange} sorting={'popularity.desc'} >Popularity</SortByOption>

        <SortByOption onChange={props.onChange} sorting={'release_date.desc'} >Release Date</SortByOption>

        <SortByOption onChange={props.onChange} sorting={'vote_average.desc'} >Rating</SortByOption>

      </div>
    </div>
  );
}