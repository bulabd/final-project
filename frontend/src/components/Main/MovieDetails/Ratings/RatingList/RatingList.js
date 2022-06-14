import "./RatingList.css";


export default function ReviewList(props) {
  let arrRate = []
  const rate = props.ratings.map(rating => 
  arrRate.push(rating.rating)
  )
  let average = 0
  for (const rates of arrRate) {
    average += rates
  }
  if (average <= 0) {
    return (
      <>
        <h2>Rating</h2>
        <span>No ratings yet</span>
      </>
    );
  }
  return (
    <>
      <h2>Rating</h2>
      <span>{parseFloat(average / arrRate.length).toFixed(1)}</span>
    </>
  );
}