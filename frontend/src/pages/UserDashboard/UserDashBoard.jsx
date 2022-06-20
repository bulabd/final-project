import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './UserDashboard.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';

export default function UserDashboard(props) {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [cookies] = useCookies();

  const [ratingWithReviewArr, setRatingWithReviewArr] = useState([])
  
  const userID = cookies.idCookies

  useEffect(() => {
    getUserData();
    getUserPlaylists();
    Promise.all([
      getUserReviews(),
      getUserRatings()
    ]).then(([reviews, ratings]) => {
      getRatingsAndReviewsForMovies(reviews, ratings)
      // .then((res) => {
      //   setRatingWithReviewArr(res)
      // }).then((res) => {
      //   console.log("ratingnrev", ratingWithReviewArr)
      // })

    })
  }, []);

  async function getMovieTitle(movieId) {
    const {data} = await axios.get(`/api/movies/${movieId}`);
    return data.title;
  }

  async function getUserData() {
    const userId  = cookies.idCookie;
    if(!userId) {
      return;
    }
    const {data} = await axios.get(`/user/${userId}`);

    setUser(data);
  }

  async function getUserReviews() {
    const userId  = cookies.idCookie;
    if(!userId) {
      return;
    }
    const {data} = await axios.get(`/review/${userId}`);

    for(let i = 0; i < data.length; i++) {
      data[i].movie_title = await getMovieTitle(data[i].movie_api_id);
    }

   return data;
  }

  async function getUserRatings() {
    const userId  = cookies.idCookie;
    if(!userId) {
      return;
    }
    const {data} = await axios.get(`/rating/${userId}`);

    for(let i = 0; i < data.length; i++) {
      data[i].movie_title = await getMovieTitle(data[i].movie_api_id);
    }

    return data;
  }

  async function getUserPlaylists() {
    const userId  = cookies.idCookie;
    if(!userId) {
      return;
    }
    const {data} = await axios.get(`/playlists/${userId}`);

    for(let i = 0; i < data.length; i++) {
      const playlistMovieLength = data[i].movie_api_id.length;
      const movies = [];
  
      for(let movieIndex = 0; movieIndex < playlistMovieLength; movieIndex ++){
        const movieId = data[i].movie_api_id[movieIndex];
        const movieTitle = await getMovieTitle(movieId);
        movies.push({movie_api_id: movieId, movie_title: movieTitle});

      }

      data[i].movies = movies;
    }

    setPlaylists(data);
  }

    const reviewDelete = (id, e) => {
      e.preventDefault()
      axios.delete(`http://localhost:8008/reviews/${id}`)
      .then(() => {
        setReviews(reviews.filter(rev => rev.id !== id))
      })
      .then(() => {
        getRatingsAndReviewsForMovies(reviews, ratings)
      })
    }
    
    const ratingDelete = (id, e) => {
      e.preventDefault()
      axios.delete(`http://localhost:8008/ratings/${id}`)
      .then(() => {
        setRatings(ratings.filter(rev => rev.id !== id))
      })
      .then(() => {
        getRatingsAndReviewsForMovies(reviews, ratings)
      })
    }

    function getRatingsAndReviewsForMovies(reviews, ratings) {
      let result = {};
      console.log("R&R----", reviews, ratings)
      reviews.map( review => {
        if (!result[review.movie_api_id]) {
          result[review.movie_api_id] = {
            movieTitle: review.movie_title
          }
        }  
        result[review.movie_api_id].review_id = review.id
        result[review.movie_api_id].review = review.content
        result[review.movie_api_id].movie_id = review.movie_api_id
        console.log("review----", result[review.movie_api_id].review)
        // return Promise.resolve()
      })

      ratings.map( rating => {
        if (!result[rating.movie_api_id]) {
          result[rating.movie_api_id] = {
            movieTitle: rating.movie_title
          }
        } 
         result[rating.movie_api_id].rating = rating.rating
         result[rating.movie_api_id].rating_id = rating.id
         result[rating.movie_api_id].movie_id = rating.movie_api_id
      })
      // await Promise.all([...reviewPromises], [...ratingPromises])
      console.log("RESULT---", result)
      setRatingWithReviewArr(Object.values(result))
      return Object.values(result)
    }

    const moviesArray = ratingWithReviewArr.map(movie => {
      return(
        <div className='renderReviews' key={movie.movie_id}>
          <p><b>movie title: </b>{movie.movieTitle}</p>
          <p><b>review: </b>{movie.review || "No review"}</p>
          <p><b>rating: </b>{movie.rating || "No rating"}</p>
          <button className='deleteBut' onClick={(e) => reviewDelete(movie.review_id, e)}><FontAwesomeIcon icon={faTrashCan} />Delete Review</button>
          <button className='deleteBut' onClick={(e) => ratingDelete(movie.rating_id, e)}><FontAwesomeIcon icon={faTrashCan} />Delete Rating</button>
        </div>
      )
    })


  if(!ratings || !user || !reviews ) {
    <h1>loading...🤨</h1>
  }

  // console.log(playlists);
  return(

    <main>
    <div className="user-dashboard-wrapper">
      <div className="content-box">
        <h2>User Dashboard</h2>
        <h4>Welcome, back {user?.name}</h4>
      <div>
        {/* Image below can be made into an editable button with a hover */}
        <img src={user?.avatar} alt="User Avatar" height={250} width={250} className="user-avatar"/>
      </div>
      <p className='bio'><b>User Bio:</b> <i>{user?.bio}</i></p>

      <div className="user-movie-content">
        <h5>{user?.name}'s Movie Playlists</h5>
        <article>
        {(playlists|| []).map(playlist => (
              <div className="renderReviews" key={`${playlist.id}${playlist.movie_api_id.join('')}`}>
                <p><b>playlist title: </b>{playlist.title}</p>
                <p><b>description: </b>{playlist.description}</p>
                <p><b>movies: </b>{(playlist.movies.map(movie => movie.movie_title)|| []).join(', ')}</p>
                <p><b>date: </b>{new Date(playlist.date).toLocaleString()}</p>
              </div>
          ))}
        </article>
      </div>
      <div className="user-movie-content">
        <h5>{user?.name}'s Movie Reviews</h5>
        <article>
          {moviesArray}
        </article> 
        </div>
      <div className="user-movie-content">
        <h5>{user?.name}'s Current Favourite Movies</h5>
        <article><>...Favourites</></article> 
      </div>
    </div>
    </div>
    </main>
  );
};