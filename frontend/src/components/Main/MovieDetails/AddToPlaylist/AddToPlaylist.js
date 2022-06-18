import axios from "axios";
import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import PlaylistDropdown from "./PlaylistDropdown/PlaylistDropdown";

export default function AddToPlaylist(props) {
  const [cookies] = useCookies();

  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    Promise.all([
      axios.get(`http://localhost:8008/playlists/`)
    ]).then((data) => {
      let playlistList = data[0].data.filter(playlist => playlist.user_id === Number(cookies.idCookie));
      setPlaylists(playlistList);
    });
  }, []);

  return (
    <span><PlaylistDropdown movie_id={props.movie_id} playlists={playlists} /></span>
  );
}