-- schema/02_create_reviews.sql
DROP TABLE IF EXISTS reviews CASCADE;
-- CREATE REVIEWS
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_api_id INTEGER,
  content TEXT NOT NULL,
  date DATE NOT NULL
);