import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Reviews from './Reviews/Reviews';
import ReactStars from 'react-stars';
import Ratings from './Ratings/Ratings';

import TextField from "@material-ui/core/TextField";
import { createTheme, ThemeProvider } from '@material-ui/core';
import { useCookies } from 'react-cookie';

import "./MovieDetails.css";
import axios from 'axios';
// import { makeStyles } from '@mui/styles';

const style = {
  color: 'white',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'black',
  border: '2px solid #ffc300',
  borderRadius: 10,
  boxShadow: 24,
  p: 4
};

const style1 = {
  color: 'white',
  padding: '10px',
  borderRadius: 2,
  width: '220px',
  display: 'flex',
  flexDirection: 'column',
  '&:hover': {
    backgroundColor: 'rgba(0,0,0,0.3)',
    boxShadow: '0px 5px 5px 5px rgba(252,195,0,0.3)',
    transform: 'scale(1.2)'
  }
}

const style2 = {
  color: '#ffc300',
  border: '2px solid #ffc300',
  marginLeft: '2em',
  marginTop: '0.4em',
  '&:hover': {
    backgroundColor: '#ffc300',
    color: 'black'
  }
}

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: "#ffc300"
    },
    secondary: {
      main: "#ffc300"
    }
  }
});

// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center"
//   }
// }));

export default function MovieDetails({ children, id, title, rating, overview, poster, release_date }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [reviewsForMovie, setReviewsForMovie] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [cookies] = useCookies();
  const textInput = React.useRef(null);
  // const classes = useStyles();


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

  async function handleSubmit(event) {
    event.preventDefault();
    if (cookies.idCookie) {
      try {
        //returns OK
        await axios.post('http://localhost:8000/reviews', {user_id: cookies.idCookie, movie_api_id: id, content: content})
        const  { data } = await axios.get(`http://localhost:8000/reviews`)
        setReviewsForMovie(getReviewsForMovie(data));
      } catch(ex) {
        console.log(ex);
      }
    } else {
      alert("You are not logged in!");
    }
  };

  React.useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8000/reviews`)
    ]).then((data) => {
      console.log(data);
      setReviewsForMovie(getReviewsForMovie(data[0].data));
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
            <div className='movieDetails'>
              <img 
                src={`https://image.tmdb.org/t/p/w200${poster}`} 
                alt='Poster for the movie'
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src="http://www.movienewsletters.net/photos/000000H1.jpg";
                }}>
              </img>
              <div className='movieTitleAndDescription'>
                <Typography id="transition-modal-title" variant="h6" component="h2">
                  {title} {verifyReleaseDate(release_date)}
                </Typography>
                <h4>Rating: {rating}</h4>
                <ReactStars
                  edit={false}
                  cursor={true}
                  count={10}
                  value={rating}
                  size={24}
                  color2={'#ffc300'}
                />
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {overview}
                </Typography>
              </div>
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
            <Ratings movie_id={id} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}