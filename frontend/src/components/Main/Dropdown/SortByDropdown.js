import "./Dropdown.css"

import SortByOption from "./SortByOption/SortByOption";

export default function SortByDropdown(props) {
  return (
    <div className="dropdown">
      <button className="dropbtn">Sort by</button>
      <div className="dropdown-content">
        <SortByOption onChange={props.onChange} sorting={'popularity.desc'} >Popularity desc.</SortByOption>
        <SortByOption onChange={props.onChange} sorting={'popularity.asc'} >Popularity asc.</SortByOption>

        <SortByOption onChange={props.onChange} sorting={'release_date.desc'} >Release Date desc.</SortByOption>
        <SortByOption onChange={props.onChange} sorting={'release_date.asc'} >Release Date asc.</SortByOption>

        <SortByOption onChange={props.onChange} sorting={'vote_average.desc'} >Rating desc.</SortByOption>
        <SortByOption onChange={props.onChange} sorting={'vote_average.asc'} >Rating asc.</SortByOption>

      </div>
    </div>
  );
}