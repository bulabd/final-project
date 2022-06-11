import React from "react";

import "./Movies.css"
import Movie from "./Movie/Movie";

export default function Movies(props) {
  let moviesArr = props.movies.map((movie) => {
    return (
      <Movie
        key={movie.id}
        title={movie.title}
        poster={movie.poster_path}
        rating={movie.vote_average}
      />
    );
  });

  return(
    <section>
      {moviesArr}
    </section>
  );
}