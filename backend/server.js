const express = require('express');
const cors = require('cors');
const pool = require('./db');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// GET - Read all movies
app.get('/api/movies', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM movies ORDER BY movie_id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// GET - Read single movie
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM movies WHERE movie_id = $1', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST - Create a movie
app.post('/api/movies', async (req, res) => {
  try {
    const { title, genre, rating } = req.body;
    
    // Validation
    if (!title || !genre || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const result = await pool.query(
      'INSERT INTO movies (title, genre, rating) VALUES ($1, $2, $3) RETURNING *',
      [title, genre, rating]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT - Update a movie
app.put('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, genre, rating } = req.body;
    
    // Validation
    if (!title || !genre || !rating) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5' });
    }
    
    const result = await pool.query(
      'UPDATE movies SET title = $1, genre = $2, rating = $3 WHERE movie_id = $4 RETURNING *',
      [title, genre, rating, id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE - Delete a movie
app.delete('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM movies WHERE movie_id = $1 RETURNING *', [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    
    res.json({ message: 'Movie deleted successfully', movie: result.rows[0] });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});