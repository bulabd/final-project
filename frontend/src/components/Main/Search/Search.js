import "./Search.css";
import TextField from "@material-ui/core/TextField";

export default function Search(props) {
  return (
    <div>
      <TextField
        style={{ flex: 1 }}
        className="searchBox"
        label="Search a movie:"
        variant="filled"
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
}