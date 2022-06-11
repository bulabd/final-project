import "./Movie.css"
import ReactStars from 'react-stars'

export default function Movie(props) {

  return (
    <div className="movieShow">
      <img 
        src={`https://image.tmdb.org/t/p/w200${props.poster}`} 
        onError={({ currentTarget }) => {
          currentTarget.onerror = null;
          currentTarget.src="http://www.movienewsletters.net/photos/000000H1.jpg";
        }}>
      </img>
      <div className="movieInfo">
        <span><b>{props.title}</b></span>
        <span><b>Rating: {props.rating}</b></span>
        <ReactStars
          edit={false}
          cursor={true}
          count={10}
          value={props.rating}
          size={24}
          color2={'#ffc300'} />
      </div>
    </div>
  );
}