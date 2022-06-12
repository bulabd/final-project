import "./ReviewList.css";

import Review from "./Review/Review";

export default function ReviewList(props) {
  const reviews = props.reviews.map((review) => {
    return (
      <Review key={review.id} creator={review.name} content={review.content} date={review.date} />
    );
  });

  return (
    <>
      <h2>Reviews</h2>
      <span>{reviews}</span>
    </>
  );
}