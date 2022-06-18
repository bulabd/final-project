import "./Playlists.scss"
import axios from "axios";
import { useEffect, useState } from "react";
import {getMovieTitle} from "../../utils/helpers";
import { useCookies } from "react-cookie";

export default function Playlists(props) {

  const [playlists, setPlaylists] = useState([]);
  const [cookies] = useCookies();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    getPlaylists();
  }, []);

  console.log(playlists);

  async function getPlaylists() {

    let {data} = await axios.get(`http://localhost:8008/playlists/`);
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
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (title && description) {
      try {
        axios.post('http://localhost:8008/playlists/', {user_id: cookies.idCookie, title: title, description: description, avatar: avatar}).then((data) => {
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
    <>
    <main className="movie-container">
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
                    <img src={playlist.avatar} alt="Playlist Avatar" height={250} width={250} />
                    <p className="text"><b>Title: </b>{playlist.title}</p>
                    <p className="text"><b>Description: </b>{playlist.description}</p>
                    <p className="text"><b>Movies: </b>{(playlist.movies.map(movie => movie.movie_title)|| []).join(', ')}</p>
                    <p className="text"><b>Created: </b>{new Date(playlist.date).toLocaleString()}</p>
                  </div>
            ))}
          </article>
    </div>
    </main> 
    </>   
  )

}