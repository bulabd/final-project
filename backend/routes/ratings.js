// -- routes/catRoutes.js
const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here
  router.get('/', (req, res) => {
    const command = "SELECT * FROM ratings GROUP BY ratings.id";
    db.query(command).then(data => {
      res.json(data.rows);
    });
  });

  router.post('/', (req, res) => {
    const body = req.body;
    const {user_id, movie_api_id, rating} = body;

    const command2 = "INSERT INTO ratings (user_id, movie_api_id, rating) VALUES ($1, $2, $3) RETURNING * ";
    db.query(command2, [user_id, movie_api_id, rating]).then(data => {
      res.status(201).json({user_id: data.rows[0].user_id, movie_api_id: data.rows[0].movie_api_id});
    });
  });

  return router;
};