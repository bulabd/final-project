import axios from 'axios';
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