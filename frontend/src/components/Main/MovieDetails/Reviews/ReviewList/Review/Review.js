import "./Review.css";

export default function Review(props) {
  return (
    <p className="reviewText">{props.creator}: {props.content}  {props.date.slice(0, 10)}</p>
  );
}