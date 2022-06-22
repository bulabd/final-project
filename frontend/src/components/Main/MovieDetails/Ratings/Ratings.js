import * as React from 'react';
import { useEffect, useState } from "react";
import axios from "axios";
import { useCookies } from 'react-cookie';
import RatingList from "./RatingList/RatingList";
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import "./Ratings.css"

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

    const verifyIfUserPostedRating = (ratings) => {
      let ids = ratings.map((rating) => rating.user_id.toString());
      if (ids.includes(userID)) {
        return true;
      }
      return false;
    };

    const dropDown = function() {
      if (userID && !rates()) {
        axios.post(`/ratings`, {user_id: userID, movie_api_id: props.movie_id, movie_title: props.title, rating: myRating})
        .then((data) => {
          Promise.all([
            axios.get(`/ratings`)
             ]).then((data) => {
            setRatings(getRatingsForMovie(data[0].data));
          });
        });
      } else {
        if (!userID) {
          alert("You need to login first!");
        } else if (verifyIfUserPostedRating(ratings)) {
          alert("You already rated this movie!");
        }
      }
    }

  const handleChange = (event) => {
    setMyRating(event.target.value);
  };

  const menuItemStyle = {
    backgroundColor: 'black',
    color: '#fcc300',
    borderRadius: '5px',
    transition: '150ms ease-in-out',
    '&:hover': {
      backgroundColor: '#fcc300',
      color: 'black'
    }
  };

  return (

    <div className="spaceRating">
      <RatingList ratings={ratings} />
      <div className="ratingForm">
        <FormControl sx={{ minWidth: 120, border: '2px #fcc300 solid', borderRadius: '10px' }}>
          <Select
            sx={{ backgroundColor: 'black', color: '#fcc300', marginTop: '5px' }}
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
    </div>
  );
}