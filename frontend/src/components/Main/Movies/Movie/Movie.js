import MovieDetails from "../../MovieDetails/MovieDetails";
import "./Movie.css"

export default function Movie(props) {
  return (
    // <div>
    //   <img 
    //     src={`https://image.tmdb.org/t/p/w200${props.poster}`} 
    //     onError={({ currentTarget }) => {
    //       currentTarget.onerror = null;
    //       currentTarget.src="http://www.movienewsletters.net/photos/000000H1.jpg";
    //     }}>
    //   </img>
    //   {props.title}
    //   {props.rating}
    // </div>
    <MovieDetails id={props.id} title={props.title} rating={props.rating} overview={props.overview} poster={props.poster} >
      <img 
        src={`https://image.tmdb.org/t/p/w200${props.poster}`} 
        alt='Poster for the movie'
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src="http://www.movienewsletters.net/photos/000000H1.jpg";
        }}>
      </img>
      {props.title}
      {props.rating}
    </MovieDetails>
  );
}