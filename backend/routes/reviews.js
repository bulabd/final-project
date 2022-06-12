// -- routes/catRoutes.js
const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here
  router.get('/', (req, res) => {
    const command = "SELECT reviews.id, reviews.movie_api_id, reviews.content, reviews.date, users.name, users.avatar FROM reviews JOIN users ON users.id = user_id";
    db.query(command).then(data => {
      res.json(data.rows);
    });
  });

  return router;
};