// -- routes/catRoutes.js
const router = require('express').Router();

module.exports = (db) => {
  // all routes will go here
  router.get('/', (req, res) => {
    const command = "SELECT * FROM users";
    db.query(command).then(data => {
      res.json(data.rows);
    });
  });

  router.post('/createuser', (req, res) => {
    // const command = "SELECT * FROM users";
    // db.query(command).then(data => {
    //   res.json(data.rows);
    // });
    res.send("Wooot");
  });

  return router;
};
