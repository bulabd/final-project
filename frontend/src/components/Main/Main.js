import React, { useEffect, useState } from 'react';
import "./Main.css"
import axios from "axios";


import Movies from "./Movies/Movies";

export default function Main(props) {
  const [state, setState] = useState([]);
  const [genre, setGenre] = useState(28);

  useEffect(() => {
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genre}&with_watch_monetization_types=flatrate`),
    ]).then((data) => {
      let movies = data[0].data.results
      console.log(movies);
      setState(movies);
    });
  }, []);

  return(
    <>
      <div className="movie-container">
        <Movies movies={state} />
      </div>
    </>
  );
}