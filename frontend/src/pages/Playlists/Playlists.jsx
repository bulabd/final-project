import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { Typography, Modal, Box, Button } from '@mui/material';
import { ThemeProvider, TextField } from '@material-ui/core';
import { style, style1, style2, theme } from '../../utils/helpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import { getMovieTitle } from "../../utils/helpers";

import "./Playlists.scss";


export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const [cookies] = useCookies();
  const textInput = React.useRef(null);

  useEffect(() => {
    getPlaylists();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    if (cookies.idCookie) {
      try {
         await axios.post(`/playlist/`, {userId:cookies.idCookie, title, description, avatar});
          getPlaylists();
          handleClose();
      } catch(ex) {
        setError(ex.response.data.error || 'Whoops! Something went wrong 🤪');
      }
    }
  }  

  async function getPlaylists() {
    const {data} = await axios.get(`/playlists/`);

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
  };

  return (
    <>
    <main className="movie-container">
    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <b>Create a new playlist below to share some of your favourite movies with a common thread. After making a list, you'll need to search movies on the homepage to add them to your lists!</b>
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
                  placeholder="Title"
                  className="searchBox"
                  label="Playlist Title"
                  inputRef={textInput}
                  variant="outlined"
                  onChange={(ev) => setTitle(ev.target.value)}
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
                  placeholder="Description"
                  className="searchBox"
                  label="Playlist Description"
                  inputRef={textInput}
                  variant="outlined"
                  onChange={(ev) => setDescription(ev.target.value)}
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
                  placeholder="Avatar URL"
                  className="searchBox"
                  label="Playlist Avatar URL"
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
        <div className="mainPlaylists">
        <h2 className="playlistpagetitle">Browse All User's Playlists</h2>
        <Button onClick={handleOpen}><h4>Create a New Playlist<FontAwesomeIcon icon={faPen} /></h4></Button>
    <article>
    {(playlists|| []).map(playlist => (
          <div className="renderObject" key={`${playlist.id}${playlist.movie_api_id.join('')}`}>
            <div className="titlecreatedby">
            <p><b>Title: </b>{playlist.title}</p>
            <Link to={`/view-user/${playlist.user_id}`}>
              <p><b>Created by: </b>{playlist.username}</p>
            </Link>
            </div>
            <img src={playlist.playlist_avatar} alt="Playlist Avatar" height={250} width={250} />
            <p>{playlist.description}</p>
            <ul>
            <b>Movies: </b>{playlist.movies.map(movie => {
              return <li key={movie.movie_api_id}>{movie.movie_title}</li>
            }) }
            </ul>
          </div>
        ))}
      </article>
    </div>
    </main> 
    </>   
  )

}