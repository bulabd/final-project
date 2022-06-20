-- schema/02_create_reviews.sql
DROP TABLE IF EXISTS reviews CASCADE;
-- CREATE REVIEWS
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  movie_api_id INTEGER,
  movie_title TEXT NOT NULL,
  content TEXT NOT NULL,
  date DATE DEFAULT NOW()
);