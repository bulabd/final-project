let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

require("dotenv").config();

const PORT = 8080;

const db = require('./configs/db.config');
let indexRouter = require('./routes/index');
// let usersRouter = require('./routes/users');

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
  let currentuserinfo = 
// app.use('/users', usersRouter(db));

app.post('/login', (req, res) => {
  // get req body (i.e email and password)
  const body = req.body;
  const { email, password } = body;

  console.log({email, password});
  // check email and psw against db
  const command = `SELECT * FROM users WHERE email = $1 AND password = $2`;
  db.query(command, [email, password]).then(data => {
    // if there's a match => redirect? send user? set a cookie
    if (data.rows.length > 0) {
      res.json({id: data.rows[0].id});
    } else {
      // if not a match => send 404 error to front-end
      res.status(404).json({ error: 'Error: Wrong email/password' });
    }

  }).catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });

});

app.post('/sign-up', (req, res) => {
  const body = req.body;
  const { name, email, password } = body;
  //UPDATE with hash & salt
  console.log({name, email, password});
  //Change query to include hashed password instead
  const command = `INSERT INTO users (name, email, password) VALUES ($1, $2, $3)`;

  db.query(command, [name, email, password]).then(data => {
    // if there's a match => redirect? send user? set a cookie
    res
      .status(200)
      .json({ message: "User registration successful" });

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