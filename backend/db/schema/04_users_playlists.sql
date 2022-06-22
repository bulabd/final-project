-- schema/04_create_playlists.sql
DROP TABLE IF EXISTS playlists CASCADE;
-- CREATE PLAYLLISTS
CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(500),
  movie_api_id INTEGER [] DEFAULT array[]::integer[],
  playlist_avatar TEXT DEFAULT 'https://ifi.ie/wp-content/uploads/2011/09/Archive-25-low-res-1-e1322841145300.jpg',
  date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);