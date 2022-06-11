var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const PORT = 8000;

const db = require('./configs/db.config');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

console.log(process.env.DB_USER,
	process.env.DB_HOST,
	process.env.DB_PASSWORD,
	process.env.DB_PORT,
	process.env.DB_DATABASE,);

module.exports = app;
