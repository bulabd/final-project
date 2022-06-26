import TextField from "@material-ui/core/TextField";
import { createTheme, ThemeProvider } from '@material-ui/core';
import "./Search.scss";

export default function Search(props) {

  const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: "#ffc300"
      },
      secondary: {
        main: "#ffc300"
      }
    }
  }); 

  return (

    <div>
      <ThemeProvider theme={theme}>
        <div className="searchBar-container">
          <TextField
            style={{ 
              flex: 1,
              width: '50vw'
            }}
            className="searchBox"
            label="Find a movie:"
            variant="outlined"
            onChange={(e) => props.onChange(e.target.value)}
            color="primary"
            focused
          />
        </div>
      </ThemeProvider>
    </div>
  );
}