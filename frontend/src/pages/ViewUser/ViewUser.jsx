import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useParams } from 'react-router-dom';
import './ViewUser.scss';
import {getRatingsAndReviewsForMovies} from '../../utils/helpers'

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const params = useParams();
  const [cookies] = useCookies();
  const [ratingWithReviewArr, setRatingWithReviewArr] = useState([])



  useEffect(() => {
    getUserData();
    getUserPlaylists();
    Promise.all([
      getUserReviews(),
      getUserRatings()
      ]).then(([reviews, ratings]) => {
        setRatingWithReviewArr(getRatingsAndReviewsForMovies(reviews, ratings))
        setReviews(reviews)
        setRatings(ratings)
      })
  }, []);

  async function getMovieTitle(movieId) {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);

    return data.title;
  }

  async function getUserData() {
    const userId  = params.id
    if(!userId) {
      return;
    }
    const {data} = await axios.get(`/user/${userId}`);

    setUser(data);
  }

  async function getUserReviews() {
    const userId  = params.id;
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
    const userId  = params.id;
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
    const userId  = params.id;
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

  
  const moviesArray = ratingWithReviewArr.map(movie => {
    return(
      <div className='renderReviews' key={movie.movie_id}>
        <p><b>movie title: </b>{movie.movieTitle}</p>
        <p><b>review: </b>{movie.review || "No review"}</p>
        <p><b>rating: </b>{movie.rating || "No rating"}</p>
      </div>
    )
  })

  if(!ratings || !user || !reviews ) {
    <h1>loading...🤨</h1>
  }

  return(

    <main>
    <div className="user-dashboard-wrapper">
        <h2 className="userviewtitle">{user?.name}'s Profile</h2>
      <div className="content-box">
        <h4>{user?.name}'s Contributions</h4>
      <div>
        <img src={user?.avatar} alt="User Avatar" height={250} width={250} className="user-avatar"/>
      </div>
      <p className='bio'><b>Bio:</b> <i>{user?.bio}</i></p>

      <div className="user-movie-content">
        <h5>{user?.name}'s Movie Playlists</h5>
        <article>
        {(playlists|| []).map(playlist => (
              <div className="renderObject" key={`${playlist.id}${playlist.movie_api_id.join('')}`}>
                <p><b>playlist title: </b>{playlist.title}</p>
                <p><b>description: </b>{playlist.description}</p>
                <p><b>movies: </b>{(playlist.movies.map(movie => movie.movie_title)|| []).join(', ')}</p>
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
    </div>
    </div>
    </main>
  );
};