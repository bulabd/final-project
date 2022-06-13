import MovieDetails from "../../MovieDetails/MovieDetails";
import "./Movie.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faStar} from '@fortawesome/free-solid-svg-icons';

export default function Movie(props) {

  return (
    <>
    <div className="movieShow">
      <MovieDetails id={props.id} title={props.title} rating={props.rating} overview={props.overview} poster={props.poster} release_date={props.release_date} >
        <img 
          src={`https://image.tmdb.org/t/p/w200${props.poster}`} 
          alt='Poster for the movie'
          onError={({ currentTarget }) => {
            currentTarget.onerror = null;
            currentTarget.src="http://www.movienewsletters.net/photos/000000H1.jpg";
          }}>
        </img>
        {props.title}
        <div className="rating">
          <FontAwesomeIcon icon={faStar}/>
          {props.rating}
        </div>
      </MovieDetails>
    </div>
  </>
  );
}