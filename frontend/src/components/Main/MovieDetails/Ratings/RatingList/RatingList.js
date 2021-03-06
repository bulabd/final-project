import { useEffect, useState } from "react";
import "./RatingList.scss";


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

  return (
    
    <div className="projectRating">
      <h4 className="ratingResult1">EAC Rating: {Number(avgRate) || "No Ratings yet"}</h4>
    </div>
 );
};