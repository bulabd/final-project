import axios from 'axios';
import { createTheme } from '@material-ui/core';
/*
  handleCookies(cookies: Array<{name, value, options}>, callback: () => any)
*/
export function handleCookies(cookies, callback) {
  cookies.forEach(cookie => callback(cookie.name, cookie.value, cookie.options || {
    path: "/"
  }));
};

export async function getMovieTitle(movieId) {
  const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);

  return data.title;
};

// ------MODAL STYLING---------------

export const style = {
  color: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'black',
  border: '2px solid #ffc300',
  borderRadius: 10,
  boxShadow: 24,
  p: 4
};

export const style1 = {
  color: 'white',
  padding: '10px',
  borderRadius: 2,
  width: '220px',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 150ms ease-in-out',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.3)',
    boxShadow: '0px 5px 5px 5px rgba(252,195,0,0.3)',
    transform: 'scale(1.2)'
  }
}

export const style2 = {
  color: '#ffc300',
  border: '2px solid #ffc300',
  marginLeft: '2em',
  marginTop: '0.4em',
  '&:hover': {
    backgroundColor: '#ffc300',
    color: 'black'
  }
}

export const theme = createTheme({
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

export  const verifyReleaseDate = (date) => {
  if (date === undefined) {
    return undefined;
  }
  return `(${date.slice(0, 4)})`;
}