import Review from "./Review/Review";
import "./ReviewList.css";

export default function ReviewList(props) {
  const reviews = props.reviews.map((review) => {

    return (
      <Review key={review.id} creator={review.name} content={review.content} date={review.date} />
    );
  });

  return (

    <>
      <span>{reviews}</span>
    </>
  );
}