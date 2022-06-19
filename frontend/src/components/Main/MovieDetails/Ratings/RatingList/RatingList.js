import "./RatingList.css";
import { useEffect, useState } from "react";


export default function ReviewList(props) {
  const [avgRate, setAvgRate] = useState(0)

  useEffect(() => {
    let arrRate = []
    props.ratings.map(rating => 
      arrRate.push(rating.rating)
    )
    let average = 0
    for (const rates of arrRate) {
      average += rates
    }
    setAvgRate(parseFloat(average / arrRate.length).toFixed(1)) 

}, [props.ratings])
  return ( avgRate <= 0 ? 
    <div className="projectRating">
      <h4>Everyone's a Critic Rating:</h4>
      <span className="ratingSpan">{0}</span>
    </div>
    :
    <div className="projectRating">
      <h4>Everyone's a Critic Rating: {avgRate}</h4>
    </div>
 );
}