import "./Movie.css"

export default function Movie(props) {
  return (
    <div>
      <img src={`https://image.tmdb.org/t/p/w200${props.poster}`}></img>
      {props.title}
      {props.rating}
    </div>
  );
}