export default function DropdownGenre(props) {
  
  return (

    <span onClick={() => props.onChange(props.genreID)} >{props.children}</span>
  );
};