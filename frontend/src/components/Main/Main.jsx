import "./Main.scss"
import axios from "axios";
import { useEffect, useState } from "react";

import Search from "./Search/Search";
import Movies from "./Movies/Movies";
import Dropdown from "./Dropdown/Dropdown";
import SortByDropdown from "./Dropdown/SortByDropdown";
import MyPagination from "./Pagination/MyPagination";
// import {getMovieTitle} from "../../utils/helpers";

export default function Main(props) {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState(28);
  const [genreName, setGenreName] = useState('Action');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [sortedBy, setSortedBy] = useState('popularity.desc');
  // const [playlists, setPlaylists] = useState([]);

  const [search, setSearch] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);

  const onChangeOfSearch = (text) => {
    setPage(1);
    setSearch(text);
    setGenre(28);
    if (search.length !== 0) {
      Promise.all([
        axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
      ]).then((data) => {
        let movies = data[0].data.results;
        setSearchMovies(movies);
      });
      setSearchMovies([]);
    }
  }
  
  

  const onChangeOfDropdownGenre = (genre) => {
    setPage(1);
    setGenre(genre);
  }

  const onChangeOfDropdownSort = (sort) => {
    setPage(1);
    setSortedBy(sort);
  }

  const getGenreName = (genres) => {
    for (let genreType of genres) {
      if (genreType.id === genre) {
        return genreType.name;
      }
    }
  }

  const changePage = (page) => {
    setPage(Number(page));
    window.scroll(0, 0);
  }

  const sortingName = (sorting) => {
    if (sorting === 'popularity.desc') {
      return 'popularity';
    } else if (sorting === 'release_date.desc') {
      return 'release date';
    } else if (sorting === 'vote_average.desc') {
      return 'rating';
    }
  }

  useEffect(() => {
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&sort_by=${sortedBy}&include_adult=false&include_video=false&page=${page}&with_genres=${genre}&with_watch_monetization_types=flatrate`),
      axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`)
    ]).then((data) => {
      let movies = data[0].data.results;
      let gnr = data[1].data.genres;
      let total_pages = data[0].data.total_pages;
      if (total_pages > 500) {
        setTotalPages(500);
      } else {
        setTotalPages(total_pages);
      }
      setMovies(movies);
      setGenreName(getGenreName(gnr));
    });
  }, [genre, page, sortedBy]);

  // useEffect(() => {
  //   getPlaylists();
  // }, []);

  // console.log(playlists)

  // async function getPlaylists() {

  //   const {data} = await axios.get(`/playlist/`);

  //   for(let i = 0; i < data.length; i++) {
  //     const playlistMovieLength = data[i].movie_api_id.length;
  //     const movies = [];
  
  //     for(let movieIndex = 0; movieIndex < playlistMovieLength; movieIndex ++){
  //       const movieId = data[i].movie_api_id[movieIndex];
  //       const movieTitle = await getMovieTitle(movieId);
  //       movies.push({movie_api_id: movieId, movie_title: movieTitle});

  //     }

  //     data[i].movies = movies;
  //   }

  //   setPlaylists(data);
  // }

  return(
    <>
      <div className="movie-container">
        <div className="searchBar">
          <Search onChange={onChangeOfSearch} />
        </div>

        {search.length === 0 && <>
          <div className="dropdownsWithSummary">
            <div className="dropDowns">
              <Dropdown onChange={onChangeOfDropdownGenre}/>
              <SortByDropdown onChange={onChangeOfDropdownSort}/>
            </div>
            <h3>{genreName} movies sorted by {sortingName(sortedBy)}</h3>
          </div>
          <Movies movies={movies} />
          <div className="pagination">
            <MyPagination  numOfPages={totalPages} onChange={changePage} pageState={page} />
          </div>

        </>}

        {search.length !== 0 && <Movies movies={searchMovies} /> }

          {/* <div className="mainPlaylists">
            <h3>Browse User Playlists</h3>
        <article>
        {(playlists|| []).map(playlist => (
              <div className="renderObject" key={`${playlist.id}${playlist.movie_api_id.join('')}`}>
                <p><b>playlist title: </b>{playlist.title}</p> 
                <img src={playlist.avatar} alt="Playlist Avatar" height={250} width={250} />
                <p><b>description: </b>{playlist.description}</p>
                <p><b>movies: </b>{(playlist.movies.map(movie => movie.movie_title)|| []).join(', ')}</p>
                <p><b>date: </b>{new Date(playlist.date).toLocaleString()}</p>
              </div>
            ))}
          </article>
        </div>       */}
      </div>
    </>
  );
}