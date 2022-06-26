import ReviewList from "./ReviewList/ReviewList";
import "./Reviews.scss"

export default function Reviews(props) {

  return (
    
    <ReviewList reviews={props.reviews} />
  );
};