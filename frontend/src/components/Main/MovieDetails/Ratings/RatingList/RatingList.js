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
    <>
      <h2>Rating</h2>
      <span className="ratingSpan">No ratings yet</span>
    </>
    :
    <>
      <h2>Rating</h2>
      <span className="ratingSpan">{avgRate}</span>
    </>
 );
}