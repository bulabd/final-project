import "./Reviews.css"
import axios from "axios";
import { useEffect, useState } from "react";

import ReviewList from "./ReviewList/ReviewList";

export default function Reviews(props) {
  const [reviewsForMovie, setReviewsForMovie] = useState([]);

  const getReviewsForMovie = (reviews) => {
    let filteredReviews = reviews.filter(review => review.movie_api_id === props.movie_id);
    return filteredReviews;
  };

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8080/reviews`)
    ]).then((data) => {
      setReviewsForMovie(getReviewsForMovie(data[0].data));
    });
  }, [])


  return (
    <ReviewList reviews={reviewsForMovie} />
  );
}