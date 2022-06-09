-- schema/01_create_users.sql
DROP TABLE IF EXISTS users CASCADE;
-- CREATE USERS
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  avatar TEXT DEFAULT 'https://share.america.gov/wp-content/uploads/2020/02/AP_20041239336571-1068x782.jpg',
  bio VARCHAR(255) DEFAULT 'This is my bio'
);