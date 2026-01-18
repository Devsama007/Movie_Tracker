require('dotenv').config();
const { Pool } = require('pg');

// Database configuration
const pool = new Pool({
  user: process.env.DB_USER,
  host: 'localhost',
  database: 'movie_tracker',
  password: process.env.DB_PASSWORD, 
  port: 5432,
});

// Create movies table if it doesn't exist
const createTableQuery = `
  CREATE TABLE IF NOT EXISTS movies (
    movie_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    genre VARCHAR(100) NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5)
  );
`;

pool.query(createTableQuery)
  .then(() => console.log('Movies table ready'))
  .catch(err => console.error('Error creating table:', err));

module.exports = pool;