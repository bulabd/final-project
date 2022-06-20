-- schema/03_create_ratings.sql
DROP TABLE IF EXISTS ratings CASCADE;
--  CREATE RATINGS --
CREATE TABLE ratings (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_api_id INTEGER,
  movie_title TEXT NOT NULL,
  rating INTEGER NOT NULL
);
