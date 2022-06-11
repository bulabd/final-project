let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
require("dotenv").config();
const PORT = 8000;

const db = require('./configs/db.config');

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');

const cors = require('cors');
const app = express();
// const server = require("http").Server(app);
app.use(cors());
app.set('port', PORT);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter(db));


// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`)
// });
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});

console.log(process.env.REACT_APP_DB_USER,
  process.env.REACT_APP_DB_HOST,
  process.env.REACT_APP_DB_PASSWORD,
  process.env.REACT_APP_DB_PORT,
  process.env.REACT_APP_DB_DATABASE,);

module.exports = app;
