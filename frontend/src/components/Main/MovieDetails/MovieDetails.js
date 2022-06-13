import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Reviews from './Reviews/Reviews';
import ReactStars from 'react-stars';

import "./MovieDetails.css";
import axios from 'axios';

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

export default function MovieDetails({ children, id, title, rating, overview, poster, release_date }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const verifyReleaseDate = (date) => {
    if (date === undefined) {
      return undefined;
    }
    return `(${date.slice(0, 4)})`;
  }

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
            <Reviews movie_id={id} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}