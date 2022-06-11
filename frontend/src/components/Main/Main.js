import "./Main.css"
import axios from "axios";
import { useEffect, useState } from "react";

import Search from "./Search/Search";
import Movies from "./Movies/Movies";
import Dropdown from "./Dropdown/Dropdown";
import SortByDropdown from "./Dropdown/SortByDropdown";
import MyPagination from "./Pagination/MyPagination";

export default function Main(props) {
  const [state, setState] = useState([]);
  const [genre, setGenre] = useState(28);
  const [genreName, setGenreName] = useState('Action');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [sortedBy, setSortedBy] = useState('popularity.desc');



  const [search, setSearch] = useState("");
  const [searchMovies, setSearchMovies] = useState([]);

  const onChangeOfSearch = (text) => {
    setPage(1);
    setSearch(text);
    setGenre(28);
    Promise.all([
      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&query=${search}&page=1&include_adult=false`)
    ]).then((data) => {
      let movies = data[0].data.results;
      setSearchMovies(movies);
    });
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
      setState(movies);
      setGenreName(getGenreName(gnr));
    });
  }, [genre, page, sortedBy]);

  return(
    <>
      <div className="movie-container">

        {!search && <>

        <Dropdown onChange={onChangeOfDropdownGenre} />
        <h2>{genreName} movies:</h2>
        <SortByDropdown onChange={onChangeOfDropdownSort} />
        <h2>Sorting by: {sortedBy}</h2>
        <Movies movies={state} />
        <MyPagination numOfPages={totalPages} onChange={changePage} pageState={page} />

        </>}

        <Search onChange={onChangeOfSearch} />
        <Movies movies={searchMovies} />

      </div>
    </>
  );
}