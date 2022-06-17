import "./Ratings.css"
import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from 'react-cookie';
import RatingList from "./RatingList/RatingList";


import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function Ratings(props) {
  const [ratings, setRatings] = useState([]);
  const [myRating, setMyRating] = useState(0);
  const [cookies] = useCookies();

  const userID = cookies.idCookie;


  const getRatingsForMovie = (rating) => {
    let filteredRatings = rating.filter(rating => rating.movie_api_id === props.movie_id);

    return filteredRatings;
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/ratings`)
    ]).then((data) => {
      setRatings(getRatingsForMovie(data[0].data));
    });
  }, [])
    
    function rates() {
      let arr = []
      for (const rate of ratings) {
        arr.push(rate.user_id)
      }
      for (const items of arr) {
        if(items === Number(userID)) {
          return true
         }
      }
      return false
    }

    const dropDown = function() {
      if (userID && !rates()) {
        axios.post(`/ratings`, {user_id: userID, movie_api_id: props.movie_id, rating: myRating})
        .then((data) => {
          Promise.all([
            axios.get(`/ratings`)
             ]).then((data) => {
            setRatings(getRatingsForMovie(data[0].data));
          });
        });
      }
    }
    
    const [value, setValue] = useState("Rate the movie");

  // return (
  //   <div className="spaceRating">
  //   <RatingList ratings={ratings} />
  //   <select className="rating2" rating="0" onChange={(e) => setMyRating(e.target.value)}>
  //     <option className="option" value="0">0</option>
  //     <option className="option" value="1">1</option>
  //     <option className="option" value="2">2</option>
  //     <option className="option" value="3">3</option>
  //     <option className="option" value="4">4</option>
  //     <option className="option" value="5">5</option>
  //     <option className="option" value="6">6</option>
  //     <option className="option" value="7">7</option>
  //     <option className="option" value="8">8</option>
  //     <option className="option" value="9">9</option>
  //     <option className="option" value="10">10</option>
  //   </select>
  //   <button className="rating2" onClick={() => dropDown()}>SUBMIT</button>
  //   </div>
  // );

  const handleChange = (event) => {
    setMyRating(event.target.value);
  };

  const menuItemStyle = {
    backgroundColor: 'black',
    color: '#fcc300',
    borderRadius: '5px',
    '&:hover': {
      backgroundColor: '#fcc300',
      color: 'black'
    }
  };

  return (
    <div className="spaceRating">
      <RatingList ratings={ratings} />
      <FormControl sx={{ minWidth: 120, border: '2px #fcc300 solid', borderRadius: '10px' }}>
        <Select
          sx={{ backgroundColor: 'black', color: '#fcc300' }}
          value={myRating}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem sx={menuItemStyle} value={0}>0</MenuItem>
          <MenuItem sx={menuItemStyle} value={1}>1</MenuItem>
          <MenuItem sx={menuItemStyle} value={2}>2</MenuItem>
          <MenuItem sx={menuItemStyle} value={3}>3</MenuItem>
          <MenuItem sx={menuItemStyle} value={4}>4</MenuItem>
          <MenuItem sx={menuItemStyle} value={5}>5</MenuItem>
          <MenuItem sx={menuItemStyle} value={6}>6</MenuItem>
          <MenuItem sx={menuItemStyle} value={7}>7</MenuItem>
          <MenuItem sx={menuItemStyle} value={8}>8</MenuItem>
          <MenuItem sx={menuItemStyle} value={9}>9</MenuItem>
          <MenuItem sx={menuItemStyle} value={10}>10</MenuItem>
        </Select>
        <FormHelperText sx={{ color: '#fcc300', textAlign: 'center' }}>Rate the movie</FormHelperText>
      </FormControl>
      <button className="rating2" onClick={() => dropDown()}>SUBMIT</button>
    </div>
  );
}