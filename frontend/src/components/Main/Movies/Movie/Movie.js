import MovieDetails from "../../MovieDetails/MovieDetails";
import "./Movie.css"
import ReactStars from 'react-stars'

export default function Movie(props) {

  return (
    <>
    <div className="movieShow">
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
      <div className="movieInfo">
        <ReactStars
          edit={false}
          cursor={true}
          count={10}
          value={props.rating}
          size={24}
          color2={'#ffc300'} />
      </div>
    </div>
  </>
  );
}