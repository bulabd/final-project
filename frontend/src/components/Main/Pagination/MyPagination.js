import Pagination from "@material-ui/lab/Pagination";

import { createTheme, ThemeProvider } from '@material-ui/core';

export default function MyPagination(props) {

  const theme = createTheme({
    palette: {
      type: 'dark',
      primary: {
        main: "#ffc300"
      },
      secondary: {
        main: "#ffa500"
      }
    }
  });

  return (
    
    <div>
      <ThemeProvider theme={theme}>
        <Pagination 
          count={props.numOfPages}
          onChange={(event) => props.onChange(event.target.textContent)}
          page={Number(props.pageState)}
          shape="rounded"
          hidePrevButton
          hideNextButton
          color="primary"
        />
      </ThemeProvider>
    </div>
  );
}