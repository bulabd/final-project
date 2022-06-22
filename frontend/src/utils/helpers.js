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
    border: '1px solid #ffc300',
    backgroundColor: 'rgba(0,0,0,0.3)',
    boxShadow: '0px 2px 2px 2px rgba(252,195,0,0.3)',
    transform: 'scale(1.1)'
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


export function getRatingsAndReviewsForMovies(reviews, ratings) {
  let result = {};
  reviews.map( review => {
    if (!result[review.movie_api_id]) {
      result[review.movie_api_id] = {
        movieTitle: review.movie_title
      }
    }  
    result[review.movie_api_id].review_id = review.id
    result[review.movie_api_id].review = review.content
    result[review.movie_api_id].movie_id = review.movie_api_id
  })

  ratings.map( rating => {
    if (!result[rating.movie_api_id]) {
      result[rating.movie_api_id] = {
        movieTitle: rating.movie_title
      }
    } 
     result[rating.movie_api_id].rating = rating.rating
     result[rating.movie_api_id].rating_id = rating.id
     result[rating.movie_api_id].movie_id = rating.movie_api_id
  })
  return Object.values(result)
}

