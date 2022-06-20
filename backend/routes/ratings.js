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
    const {user_id, movie_api_id, movie_title, rating} = body;

    const command2 = "INSERT INTO ratings (user_id, movie_api_id, movie_title, rating) VALUES ($1, $2, $3, $4) RETURNING * ";
    db.query(command2, [user_id, movie_api_id, movie_title, rating]).then(data => {
      res.status(201).json({user_id: data.rows[0].user_id, movie_api_id: data.rows[0].movie_api_id});
    });
  });

  router.delete("/:id", (req, res) => {
    const { id } = req.params;
    console.log(id)
    const sql = `DELETE FROM ratings WHERE id = ${id}`;
  
    db.query(sql).then(data => {
      console.log(data);
      console.log('it passed');
      res.status(200).send("OK");
    }).catch(err => {
      console.log('an error happend-------');
      res
        .json({ error: err.message });
    });
  })

  return router;
};