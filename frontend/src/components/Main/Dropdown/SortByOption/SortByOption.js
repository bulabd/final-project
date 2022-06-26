export default function SortByOption(props) {

  return (
    
    <span onClick={() => props.onChange(props.sorting)} >{props.children}</span>
  );
};