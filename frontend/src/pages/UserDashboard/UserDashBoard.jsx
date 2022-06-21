import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { Typography, Modal, Box, Button } from '@mui/material';
import { ThemeProvider, TextField } from '@material-ui/core';

import { style, style2, theme } from '../../utils/helpers';
import './UserDashboard.scss';
import {faTrashCan} from '@fortawesome/free-solid-svg-icons';

// export default function UserDashboard(props) {
export default function UserDashboard(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [name, setName] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [bio, setBio] = useState(null);
  const [error, setError] = useState(null)
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [cookies] = useCookies();
  const textInput = React.useRef(null);



  // ---------MODAL STUFF:-------------

  // const getReviewsForMovie = (reviews, id) => {
  //   let filteredReviews = reviews.filter(review => review.movie_api_id === id);
  //   return filteredReviews;
  // };


  async function handleSubmit(event) {
    event.preventDefault();
    if (cookies.idCookie) {
      try {
         await axios.put(`/profile/${cookies.idCookie}`, {name: name, bio, avatar});

          getUserData();
          handleClose();
      } catch(ex) {
        setError(ex.response.data.error || 'Whoops! Something went wrong 🤪');
      }
    }
  }  
  
  // ----------MODAL STUFF ^^----------

  const [ratingWithReviewArr, setRatingWithReviewArr] = useState([])
  
  const userID = cookies.idCookies
  //^^^CHECK THIS OVER

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
    setName(data.name);
    setBio(data.bio);
    setAvatar(data.avatar);
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
        const newReviews = reviews.filter(rev => rev.id !== id)
        setReviews(newReviews)
        setRatingWithReviewArr(getRatingsAndReviewsForMovies(newReviews, ratings))
      })
    }
    
    const ratingDelete = (id, e) => {
      e.preventDefault()
      axios.delete(`http://localhost:8008/ratings/${id}`)
      .then(() => {
        const newRatings = ratings.filter(rat => rat.id !== id)
        setRatings(newRatings)
        setRatingWithReviewArr(getRatingsAndReviewsForMovies(reviews, newRatings))
      })
    }

    const playlistDelete = (id, e) => {
      e.preventDefault();
      axios.delete(`http://localhost:8008/playlist/${id}`)
      .then(() => {
        const newPlaylists = playlists.filter(playlist => playlist.id !== id);
        setPlaylists(newPlaylists);
      })
    }

   function getRatingsAndReviewsForMovies(reviews, ratings) {
      let result = {};
      reviews.map( review => {
        if (!result[review.movie_api_id]) {
          result[review.movie_api_id] = {
            movieTitle: review.movie_title
          }
        }  
        result[review.movie_api_id].review_id = review.id
        result[review.movie_api_id].review = review.content
        result[review.movie_api_id].movie_id = review.movie_api_id
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
      return Object.values(result)
    }

    const moviesArray = ratingWithReviewArr.map(movie => {
      return(
        <div className='renderReviews' key={movie.movie_id}>
          <p><b>movie title: </b>{movie.movieTitle}</p>
          <p><b>review: </b>{movie.review || "No review"}</p>
          <p><b>rating: </b>{movie.rating || "No rating"}</p>
          {movie.review && <button className='deleteBut' onClick={(e) => reviewDelete(movie.review_id, e)}><FontAwesomeIcon icon={faTrashCan} /> Delete Review</button>}
          {movie.rating &&  <button className='deleteBut' onClick={(e) => ratingDelete(movie.rating_id, e)}><FontAwesomeIcon icon={faTrashCan} /> Delete Rating</button>}
        </div>
      )
    })


  if(!ratings || !user || !reviews ) {
    <h1>loading...🤨</h1>
  }

  return(

    <main>
      {/* Declare modal, pass user into modal as a prop */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Update User Profile Information:</b>
          </Typography>
          <br />
          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Update User Name:
          </Typography> */}
          <ThemeProvider theme={theme}>
                <TextField
                  style={{ 
                    flex: 1
                  }}
                  value={name}
                  placeholder="your name here"
                  className="searchBox"
                  label="User Name"
                  inputRef={textInput}
                  variant="outlined"
                  onChange={(ev) => setName(ev.target.value)}
                  color="primary"
                  focused
                />
              </ThemeProvider>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} />
          <ThemeProvider theme={theme}>
                <TextField
                  style={{ 
                    flex: 1
                  }}
                  value={bio}
                  className="searchBox"
                  label="User Bio"
                  inputRef={textInput}
                  variant="outlined"
                  onChange={(ev) => setBio(ev.target.value)}
                  color="primary"
                  focused
                />
              </ThemeProvider>
              <Typography id="modal-modal-description" sx={{ mt: 2 }} />
          <ThemeProvider theme={theme}>
                <TextField
                  style={{ 
                    flex: 1
                  }}
                  value={avatar}
                  className="searchBox"
                  label="User Avatar URL"
                  inputRef={textInput}
                  variant="outlined"
                  onChange={(ev) => setAvatar(ev.target.value)}
                  color="primary"
                  focused
                />
              </ThemeProvider>    
              <Button type="submit" value="Submit" onClick={(ev) => {
                textInput.current.value = "";
                handleSubmit(ev);
              }} 
                sx={style2}>Submit
              </Button>
        </Box>
      </Modal>
    <div className="user-dashboard-wrapper">
        <h2 className="user_page_title">Dashboard</h2>
      <div className="content-box">
        <div className="content-top">
        <div className="left"></div>
        <div className="center">
        <h4>Welcome, back {user?.name}!</h4>
        </div>
        <div className="right">
        <Button onClick={handleOpen}><h4>EDIT<FontAwesomeIcon icon={faPen} /></h4></Button>
        </div>
        </div>
      <div>
        <img src={user?.avatar} alt="User Avatar" height={250} width={250} className="user-avatar"/>
      </div>
      <p className='bio'><b>Bio:</b> <i>{user?.bio}</i></p>

      <div className="user-movie-content">
        <h5>{user?.name}'s Movie Playlists</h5>
        <article>
        {(playlists|| []).map(playlist => (
              <div className="renderReviews" key={`${playlist.id}${playlist.movie_api_id.join('')}`}>
                <p><b>playlist title: </b>{playlist.title}</p>
                <p><b>description: </b>{playlist.description}</p>
                <p><b>movies: </b>{(playlist.movies.map(movie => movie.movie_title)|| []).join(', ')}</p>
                <button className='deleteBut' onClick={(e) => playlistDelete(playlist.id, e)}><FontAwesomeIcon icon={faTrashCan} /> Delete Playlist</button>
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