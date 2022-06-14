import "./Ratings.css"
import axios from "axios";
import { useEffect, useState } from "react";

import RatingList from "./RatingList/RatingList";

export default function Ratings(props) {
  const [ratings, setRatings] = useState([]);

  const getRatingsForMovie = (rating) => {
    let filteredRatings = rating.filter(rating => rating.movie_api_id === props.movie_id);

    return filteredRatings;
  };

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8000/ratings`)
    ]).then((data) => {
      setRatings(getRatingsForMovie(data[0].data));
    });
  }, [])


  return (
    <RatingList ratings={ratings} />
  );
}