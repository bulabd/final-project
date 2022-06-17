INSERT INTO playlists (user_id, title, description, movie_api_id, avatar) VALUES (1, 'Crooked Cops', 'Protect and swerve', '{2142, 10775, 11699}', 'https://ifi.ie/wp-content/uploads/2011/09/Archive-25-low-res-1-e1322841145300.jpg');
INSERT INTO playlists (user_id, title, description, movie_api_id, avatar) VALUES (2, 'The Giants of Hong Kong Action Films', 'Some of my favourite HK action films from when I was a kid 🥺', '{13127, 11471}', 'https://ifi.ie/wp-content/uploads/2011/09/Archive-25-low-res-1-e1322841145300.jpg');
INSERT INTO playlists (user_id, title, description, movie_api_id, avatar) VALUES (2, 'HK/Taiwan New Wave', 'A more subtle approach', '{57564, 26005, 11220, 78450}', 'https://ifi.ie/wp-content/uploads/2011/09/Archive-25-low-res-1-e1322841145300.jpg');
INSERT INTO playlists (user_id, title, description, movie_api_id, avatar) VALUES (2, 'Folk Horror', 'No leaf left unturned', '{74725, 10212, 310131, 31965, 530385}', 'https://ifi.ie/wp-content/uploads/2011/09/Archive-25-low-res-1-e1322841145300.jpg');
INSERT INTO playlists (user_id, title, description, movie_api_id, avatar) VALUES (3, 'Dystopian Sci-fi movies', 'End of days', '{254302, 447332, 819876, 12101, 861, 1103}', 'https://ifi.ie/wp-content/uploads/2011/09/Archive-25-low-res-1-e1322841145300.jpg');

  -- user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  -- title VARCHAR(255) NOT NULL,
  -- description VARCHAR(500),
  -- movie_api_id INTEGER[],