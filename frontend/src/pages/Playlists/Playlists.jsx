import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import { getMovieTitle } from "../../utils/helpers";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import "./Playlists.scss";
import "../../CommonStyles.scss"


export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [cookies] = useCookies();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getPlaylists();
  }, []);


  async function getPlaylists() {

    let {data} = await axios.get(`/playlists/`);
    data = data.reverse();

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

  async function handleSubmit(event) {
    event.preventDefault();
    if (title && description) {
      try {
        axios.post('http://localhost:8008/playlists/', {user_id: cookies.idCookie, title: title, description: description, playlist_avatar: avatar}).then((data) => {
          getPlaylists();
          setTitle("");
          setDescription("");
          setAvatar("");
        });
      } catch(ex) {
        console.log("----------post didnt work", ex);
      }
    } else {
      alert("The playlist must have a title and a description!");
    }
  };

  return (

    <main className="playlist-container">
      { cookies.idCookie && 
        <>
          <h2 className="title new-playlist">Create a playlist</h2>
          <div className="form">
            <input className="input" type="text" name="title" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)}></input>
            <input className="input" type="text" name="description" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)}></input>
            <input className="input" type="text" name="avatar" placeholder="Avatar URL (Optional)" value={avatar} onChange={(e) => setAvatar(e.target.value)}></input>
            <button className="submitButton" type="submit" onClick={(e) => handleSubmit(e)}>Submit</button>
          </div>
        </>
      }
        <h2 className="title">Browse User Playlists</h2>
        <div>
          <article className="mainPlaylists">
            {(playlists|| []).map(playlist => (
              <div className="renderObject" key={`${playlist.playlist_id}`}>
                <h4 className="text"><b>Title: </b><i>{playlist.title}</i></h4>
                <img src={playlist.playlist_avatar} alt="Playlist Avatar" height={250} width={250} />
                <Link to={`/view-user/${playlist.user_id}`} style={{ textDecoration: 'none' }}>
                  <p className="text" title="Visit User's Profile"><b>Created by: </b>{playlist.username} <FontAwesomeIcon icon={faLink} /></p>
                </Link>
                <p className="text"><b>Description: </b>{playlist.description}</p>
                {!playlist.movies.length && <p className='text'><b>Movies: </b> No movies Yet</p>}
                <div className='movieList'>
                  {playlist.movies.length !== 0 && 
                    <>
                      <p className='movieSubTitle'><b>Movies: </b></p>
                      <ul>
                        {playlist.movies.map(movie => {
                          return <li className='movieListItem' key={movie.movie_api_id}>{movie.movie_title}</li>
                        })}
                      </ul>
                    </>
                  }
                </div>
              </div>
            ))}
          </article>
    </div>
  </main>   
  )
};