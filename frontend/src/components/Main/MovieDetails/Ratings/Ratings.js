import "./Ratings.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import RatingList from "./RatingList/RatingList";

export default function Ratings(props) {
  const [ratings, setRatings] = useState([]);
  const [myRating, setMyRating] = useState(0)
  const [cookies] = useCookies();

  const userID = cookies.idCookie;


  const getRatingsForMovie = (rating) => {
    let filteredRatings = rating.filter(rating => rating.movie_api_id === props.movie_id);

    return filteredRatings;
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/ratings`)
    ]).then((data) => {
      setRatings(getRatingsForMovie(data[0].data));
    });
  }, [])
    
    function rates() {
      let arr = []
      for (const rate of ratings) {
        arr.push(rate.user_id)
      }
      for (const items of arr) {
        if(items === Number(userID)) {
          return true
         }
      }
      return false
    }

    const dropDown = function() {
      if (userID && !rates()) {
        axios.post(`/ratings`, {user_id: userID, movie_api_id: props.movie_id, rating: myRating})
        .then((data) => {
          Promise.all([
            axios.get(`/ratings`)
             ]).then((data) => {
            setRatings(getRatingsForMovie(data[0].data));
          });
        });
      }
    }
    

  return (
    <div className="spaceRating">
    <RatingList ratings={ratings} />
    <select className="rating" rating="0" onChange={(e) => setMyRating(e.target.value)}>
      <option value="0">0</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
      <option value="5">5</option>
      <option value="6">6</option>
      <option value="7">7</option>
      <option value="8">8</option>
      <option value="9">9</option>
      <option value="10">10</option>
    </select>
    <button className="rating" onClick={() => dropDown()}>SUBMIT</button>
    </div>
  );
}