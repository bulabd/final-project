// Database connections
require("dotenv").config();
const { Pool } = require('pg');

const {REACT_APP_DB_HOST, REACT_APP_DB_USER, REACT_APP_DB_PASSWORD, REACT_APP_DB_DATABASE, REACT_APP_DB_PORT} = process.env;

const pool = new Pool({
  user: REACT_APP_DB_USER,
  host: REACT_APP_DB_HOST,
  password: REACT_APP_DB_PASSWORD,
  port: REACT_APP_DB_PORT,
  database: REACT_APP_DB_DATABASE,
});

pool.connect().then(() => {
  console.log("Database connection established.");
}).catch(e => {
  throw new Error(e);
});

module.exports = pool;