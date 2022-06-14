import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Reviews from './Reviews/Reviews';
import Ratings from './Ratings/Ratings';

import "./MovieDetails.css";

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

export default function MovieDetails({ children, id, title, rating, overview, poster }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>{children}</Button>
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
                  {title}
                </Typography>
                <h4>Rating: {rating}</h4>
                <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                  {overview}
                </Typography>
              </div>
            </div>
            <Reviews movie_id={id} />
            <Ratings movie_id={id} />
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}