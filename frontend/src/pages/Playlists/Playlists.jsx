import "./Playlists.scss"
import axios from "axios";
import { useEffect, useState } from "react";
import {getMovieTitle} from "../../utils/helpers";

export default function Playlists(props) {

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    getPlaylists();
  }, []);

  console.log(playlists);

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
  }

  return (
    <>
    <main className="movie-container">
        <h1 className="title">Browse User Playlists</h1>
        <div>
          <article className="mainPlaylists">
            {(playlists|| []).map(playlist => (
                  <div className="renderObject" key={`${playlist.id}${playlist.movie_api_id.join('')}`}>
                    {/* <p><b>playlist title: </b>{playlist.title}</p> */}
                    <img src={playlist.avatar} alt="Playlist Avatar" height={250} width={250} />
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