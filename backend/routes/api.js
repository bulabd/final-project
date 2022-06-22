let express = require('express');
let router = express.Router();
let axios = require('axios');


async function getMovieDetails(movieId) {
  return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}`);
};

module.exports = () => {
  router.get('/:movie_id',function(req, res) {
    getMovieDetails(req.params.movie_id).then(({data}) => {
      res.json(data);
    }).catch((err) => {
      console.log(err);
      res.send("The request failed");
    });
  
  });
  return router;
};
