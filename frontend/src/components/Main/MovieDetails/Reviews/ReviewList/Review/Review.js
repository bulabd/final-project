import "./Review.css";

export default function Review(props) {
  return (
    <p className="review"><b>{props.creator}:</b> {props.content}  {props.date.slice(0, 10)}</p>
  );
}