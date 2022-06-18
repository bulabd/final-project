import "./PlaylistDropdown.css";
import axios from "axios";

export default function PlaylistDropdown(props) {

  async function addToPlaylist(playlist_id, movie_id) {
    try {
      await axios.post('http://localhost:8008/playlists/addMovie', { playlist_id: playlist_id, movie_id: movie_id }).then(data => {
        console.log("Axios went through", playlist_id, movie_id);
        alert("Movie added to playlist!");
      });
    } catch(ex) {
      console.log(ex);
    }
  }

  const playlistArr = props.playlists.map(playlist => {
    const playlist_id = playlist.playlist_id;
    return (
      <span key={playlist_id} onClick={() => addToPlaylist(playlist_id, props.movie_id)} >{playlist.title}</span>
    );
  });

  return (
    <div className="span">
      <span className="playlistButton">Add to playlist +</span>
      <div className="dropdown-Content">
        {playlistArr}
      </div>
    </div>
  );
}