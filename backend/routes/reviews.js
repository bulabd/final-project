/* eslint-disable camelcase */
// -- routes/catRoutes.js
const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here
  router.get('/', (req, res) => {
    const command = "SELECT reviews.id, reviews.movie_api_id, reviews.movie_title, reviews.content, reviews.date, users.id as user_id, users.name, users.avatar FROM reviews JOIN users ON users.id = user_id ORDER BY date DESC";
    db.query(command).then(data => {
      res.json(data.rows);
    });
  });

  router.post('/', (req, res) => {
    const body = req.body;
    const { user_id, movie_api_id, movie_title, content } = body;
  
    const command = `INSERT INTO reviews (user_id, movie_api_id, movie_title, content) VALUES ($1, $2, $3, $4) RETURNING id, user_id, movie_api_id, movie_title, date`;
    console.log("---------reviews post--------");
    console.log(body);
  
    db.query(command, [user_id, movie_api_id, movie_title, content]).then(data => {
      console.log(data.rows[0]);
      console.log('it passed');
      res.status(200).send("OK");
    }).catch(err => {
      console.log('an error happend-------');
      res
        .json({ error: err.message });
    });
  })

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    const sql = `DELETE FROM reviews WHERE id = ${id}`;
  
    db.query(sql).then(data => {
      console.log(data);
      console.log('it passed');
      res.status(200).send("OK");
    }).catch(err => {
      console.log('an error happend-------');
      res
        .json({ error: err.message });
    });
  });

  return router;
};