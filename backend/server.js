let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const url = require('url');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

require("dotenv").config();

const PORT = 8000;

const db = require('./configs/db.config');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let reviewsRouter = require('./routes/reviews');
let ratingsRouter = require('./routes/ratings');


const app = express();

app.set('port', PORT);
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter(db));
app.use('/reviews', reviewsRouter(db));
app.use('/ratings', ratingsRouter(db));


app.post('/login', (req, res) => {
  // get req body (i.e email and password)
  const body = req.body;
  const { email, password } = body;

  // check email and psw against db
  const command = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  db.query(command, [email, password]).then(data => {
    // if there's a match => redirect? send user? set a cookie
    if (data.rows.length > 0) {
      res.json({id: data.rows[0].id, email: data.rows[0].email});
    } else {
      // if not a match => send 404 error to front-end
      res.status(404).json({ error: 'Error: Wrong email/password combination' });
    }

  }).catch(err => {
    console.log("CATCHING ERRRRRRR");
    res
      .status(500)
      .json({ error: err.message });
  });

});

app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const command = `SELECT * FROM users WHERE id = $1`;
  db.query(command, [userId]).then((data) => {
    if (data.rows.length > 0) {
      res.status(200).json(data.rows[0]);
    }
  }).catch((ex) => {
    res
      .status(500)
      .json({ error: ex.message });
  });
});

app.post('/sign-up', (req, res) => {
  const body = req.body;
  const { name, email, password } = body;
  //UPDATE with hash & salt
  
  //Change query to include hashed password instead
  // bcrypt.hash(body.password, saltRounds, (err, hash) => {
  //   const command = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;


  const command = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, email;`;

  db.query(command, [name, email, password]).then(data => {
    // if there's a match => redirect? send user? set a cookie
    if (data.rows.length > 0) {
      res.status(200).json({id: data.rows[0].id, email: data.rows[0].email});
    }
  }).catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

module.exports = app;