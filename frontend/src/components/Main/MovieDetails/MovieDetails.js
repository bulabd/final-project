import * as React from 'react';
import axios from 'axios';
import Reviews from './Reviews/Reviews';
import ReactStars from 'react-stars';
import Ratings from './Ratings/Ratings';

import TextField from "@material-ui/core/TextField";
import { Backdrop, Box, Modal, Fade, Button, Typography } from '@mui/material/';
import { ThemeProvider } from '@material-ui/core';
import { useCookies } from 'react-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { style, style1, style2, theme } from '../../../utils/helpers.js';
import AddToPlaylist from './AddToPlaylist/AddToPlaylist';

import "./MovieDetails.scss";

export default function MovieDetails({ children, id, title, rating, overview, poster, release_date }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [reviewsForMovie, setReviewsForMovie] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [cookies] = useCookies();
  const textInput = React.useRef(null);

  const [youtubeURL, setYoutubeURL] = React.useState("");

  const verifyReleaseDate = (date) => {
    if (date === undefined) {
      return undefined;
    }
    return `(${date.slice(0, 4)})`;
  }

  const getReviewsForMovie = (reviews) => {
    let filteredReviews = reviews.filter(review => review.movie_api_id === id);
    return filteredReviews;
  };

  const verifyIfUserPostedReview = (filteredReviews) => {
    let ids = filteredReviews.map((review) => {return review.user_id.toString()});
    if (ids.includes(cookies.idCookie)) {
      return false;
    }
    return true;
  }

  const filterTrailers = (movieArr) => {
    return movieArr.filter(movie => movie.type === 'Trailer')[0].key;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    if (cookies.idCookie) {
      if (verifyIfUserPostedReview(reviewsForMovie)) {
        try {
          // returns OK
          await axios.post('/reviews', {user_id: cookies.idCookie, movie_api_id: id, movie_title: title, content: content})
          const  { data } = await axios.get(`/reviews`)
          setReviewsForMovie(getReviewsForMovie(data));
        } catch(ex) {
          console.log(ex);
        }
      } else {
        alert("You cannot review a movie twice!");
      }
    } else {
      alert("You are not logged in!");
    }
  };

  React.useEffect(() => {
    Promise.all([
      axios.get(`/reviews`),
      axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
    ]).then((data) => {
      setReviewsForMovie(getReviewsForMovie(data[0].data, id));
      // setYoutubeURL(data[1].data.results[0].key);
      setYoutubeURL(filterTrailers(data[1].data.results));
    });
  }, [])

  return (
    
    <div>
      <Button onClick={handleOpen} sx={style1} >{children}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div className='modal'>
            <div className='movieDetails'>
              <div className='poster-trailer'>
                <img 
                  src={`https://image.tmdb.org/t/p/w200${poster}`} 
                  alt='Poster for the movie'
                  onError={({ currentTarget }) => {
                    currentTarget.onerror = null;
                    currentTarget.src="http://www.movienewsletters.net/photos/000000H1.jpg";
                  }}>
                </img>
                <a className='trailer' href={`https://www.youtube.com/watch?v=${youtubeURL}`} target="_blank" rel="noreferrer"><FontAwesomeIcon icon={faPlay} /> Trailer</a>
              </div>
              <div className='movieTitleAndDescription'>
                <div className='titleWithPlaylists'>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {title} {verifyReleaseDate(release_date)}
                </Typography>
                <Typography variant="h6" component="h2">
                  <AddToPlaylist movie_id={id} />
                </Typography>
                </div>

                <div className='ratings'>
                  <div className='tmdb-rating'>
                    <h4>TMDB Rating: {rating}</h4>
                    <ReactStars
                      edit={false}
                      cursor={true}
                      count={10}
                      value={rating}
                      size={24}
                      color2={'#ffc300'}
                    />
                  </div>
                  <Ratings movie_id={id} title={title} />
                </div>

                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {overview}
                </Typography>
              </div>
            </div>

            <div className='iframe'>
            <iframe className="iframeplayer" width="560" height="315" src={`https://www.youtube.com/embed/${youtubeURL}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            </div>
            
            <h2>Reviews</h2>
              <ThemeProvider theme={theme}>
                <TextField
                  style={{ 
                    flex: 1
                  }}
                  className="searchBox"
                  label="Leave a review:"
                  inputRef={textInput}
                  variant="outlined"
                  onChange={(e) => setContent(e.target.value)}
                  color="primary"
                  focused
                />
              </ThemeProvider>
              <Button type="submit" value="Submit" onClick={(e) => {
                textInput.current.value = "";
                handleSubmit(e);
              }} 
                sx={style2}>Submit
              </Button>
            <Reviews reviews={reviewsForMovie} />
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};