// -- routes/catRoutes.js
const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here
  router.get('/', (req, res) => {
    const command = "SELECT ratings.id, ratings.movie_api_id, ratings.rating FROM ratings GROUP BY ratings.id";
    db.query(command).then(data => {
      res.json(data.rows);
    });
  });

  return router;
};