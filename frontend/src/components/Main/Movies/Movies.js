import Movie from "./Movie/Movie";
import "./Movies.css"

export default function Movies(props) {
  let moviesArr = props.movies.map((movie) => {
    
    return (

      <Movie
        key={movie.id}
        id = {movie.id}
        title={movie.title}
        poster={movie.poster_path}
        overview={movie.overview}
        rating={movie.vote_average}

        release_date={movie.release_date}
      />
    );
  });

  return(

    <section className="main-movies">
      {moviesArr}
    </section>
  );
}