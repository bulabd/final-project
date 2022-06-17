import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import './UserDashboard.scss';

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [cookies] = useCookies();

  useEffect(() => {
    getUserData();
    getUserReviews();
    getUserRatings();
    getUserPlaylists();
  }, []);

  async function getMovieTitle(movieId) {
    const {data} = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);

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

    setReviews(data);
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

    setRatings(data);
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

  if(!ratings || !user || !reviews ) {
    <h1>loading...🤨</h1>
  }

  console.log(playlists);
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
              <div className="renderObject" key={`${playlist.id}${playlist.movie_api_id.join('')}`}>
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
            {(reviews|| []).map(review => (
              <div className="renderObject" key={`${review.movie_api_id}${review.id}`}>
                <p><b>movie title: </b>{review.movie_title}</p>
                <p><b>review: </b>{review.content}</p>
                <p><b>date: </b>{new Date(review.date).toLocaleString()}</p>
              </div>
            ))}
        </article> 
        </div>
      <div className="user-movie-content">
        <h5>{user?.name}'s Movie Ratings</h5>
        <article>
        {(ratings).map(rating => {       
          return (
              <div className="renderObject" key={`${rating.movie_api_id}${rating.id}`}>
                <p><b>movie title: </b>{rating.movie_title}</p>
                <p><b>rating: </b>{rating.rating}</p>
              </div>
            )})}
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