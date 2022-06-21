import "./Review.css";

export default function Review(props) {
  return (
    <p className="review"><b>{props.creator}:</b> <p className="reviewText">{props.content}</p>  <p className="reviewDate">{props.date.slice(0, 10)}</p></p>
  );
}