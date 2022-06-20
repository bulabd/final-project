/* eslint-disable camelcase */
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
// const url = require('url');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

require("dotenv").config();

const PORT = process.env.REACT_APP_BACKEND_PORT;

const db = require('./configs/db.config');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let reviewsRouter = require('./routes/reviews');
let ratingsRouter = require('./routes/ratings');


const app = express();

app.disable('etag');

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

app.get('/review/:id', (req, res) => {
  const userId = req.params.id;
  const command = `SELECT * FROM reviews WHERE user_id = $1`;
  db.query(command, [userId]).then((data) => {
    if (data.rows.length > 0) {
      res.status(200).json(data.rows);
    }
  }).catch((ex) => {
    res
      .status(500)
      .json({ error: ex.message });
  });
});

app.get('/rating/:id', (req, res) => {
  const userId = req.params.id;
  const command = `SELECT * FROM ratings WHERE user_id = $1`;
  db.query(command, [userId]).then((data) => {
    if (data.rows.length > 0) {
      res.status(200).json(data.rows);
    }
  }).catch((ex) => {
    res
      .status(500)
      .json({ error: ex.message });
  });
});

app.get('/playlists/:id', (req, res) => {
  const userId = req.params.id;
  const command = `SELECT * FROM playlists WHERE user_id = $1`;
  db.query(command, [userId]).then((data) => {
    if (data.rows.length > 0) {
      res.status(200).json(data.rows);
    }
  }).catch((ex) => {
    res
      .status(500)
      .json({ error: ex.message });
  });
});

// app.post('/playlist/', (req, res) => {
//   const {userId, title, description, avatar} = req.body;
//   const command = `INSERT INTO playlists (user_id, title, description, playlist_avatar) VALUES ($1, $2, $3, $4) RETURNING user_id, title, description, playlist_avatar;`;
//   db.query(command, [userId, title, description, avatar]).then((data) => {
//     if (data.rows.length > 0) {
//       res.status(200).json(data.rows);
//     }
//   }).catch((ex) => {
//     res
//       .status(500)
//       .json({ error: ex.message });
//   });
// });

app.get('/playlists/', (req, res) => {
  const command = `SELECT playlists.id as playlist_id, *, "users".name as userName FROM playlists JOIN users ON users.id = playlists.user_id`;
  // const command = `SELECT "playlists".*, "users".name as userName FROM playlists JOIN users ON users.id = playlists.user_id`;
  db.query(command).then((data) => {
    if (data.rows.length > 0) {
      res.status(200).json(data.rows);
    }
  }).catch((ex) => {
    console.log(ex);
    res
      .status(500)
      .json({ error: ex.message });
  });
});

app.post('/playlists/', (req, res) => {
  const body = req.body;
  const { user_id, title, description, playlist_avatar } = body;
  if (!playlist_avatar) {
    const command = `INSERT INTO playlists (user_id, title, description) VALUES ($1, $2, $3) RETURNING user_id, title, description`;
    db.query(command, [user_id, title, description]).then((data) => {
      console.log("----this is what has been entered in the form", data.rows[0]);
      console.log('it passed');
      res.status(200).send("OK");
    }).catch(err => {
      console.log('an error happend-------');
      res.json({ error: err.message });
    });
  } else {
    const command = `INSERT INTO playlists (user_id, title, description, playlist_avatar) VALUES ($1, $2, $3, $4) RETURNING user_id, title, description, playlist_avatar`;
    db.query(command, [user_id, title, description, playlist_avatar]).then((data) => {
      console.log("----this is what has been entered in the form", data.rows[0]);
      console.log('it passed');
      res.status(200).send("OK");
    }).catch(err => {
      console.log('an error happend-------');
      res.json({ error: err.message });
    });
  }
});

app.post('/playlists/addMovie', (req, res) => {
  const body = req.body;
  const { playlist_id, movie_id } = body;
  console.log("BODY----", body);
  const command = `UPDATE playlists SET movie_api_id = array_append(movie_api_id, $1) WHERE id = $2`;
  db.query(command, [movie_id, playlist_id]).then(() => {
    console.log('movie added to playlist');
    res.status(200).send("OK");
  }).catch(err => {
    console.log('an error happend-------');
    res.json({ error: err.message });
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

app.put('/profile/:id', (req, res) => {
  const userId = req.params.id;
  const body = req.body;
  const { name, bio, avatar } = body;

  // UPDATE NOT INSERT
  const command = `UPDATE users SET name=$1, bio=$2, avatar=$3 WHERE id=$4;`;

  db.query(command, [name, bio, avatar, userId]).then(() => {
    // if there's a match => redirect? send user? set a cookie
    res.status(200).json({message: "Update successful!"});
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