import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieForm from './components/MovieForm';

function App() {
  const [movies, setMovies] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data);
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Add a new movie
  const addMovie = async (movieData) => {
    try {
      const response = await fetch('/api/movies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        fetchMovies();
        setShowForm(false);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (err) {
      console.error('Error adding movie:', err);
    }
  };

  // Update a movie
  const updateMovie = async (id, movieData) => {
    try {
      const response = await fetch(`/api/movies/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movieData),
      });

      if (response.ok) {
        fetchMovies();
        setEditingMovie(null);
      } else {
        const error = await response.json();
        alert(error.error);
      }
    } catch (err) {
      console.error('Error updating movie:', err);
    }
  };

  // Delete a movie
  const deleteMovie = async (id) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        const response = await fetch(`/api/movies/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchMovies();
        }
      } catch (err) {
        console.error('Error deleting movie:', err);
      }
    }
  };

  // Handle edit click
  const handleEdit = (movie) => {
    setEditingMovie(movie);
    setShowForm(false);
  };

  // Handle cancel
  const handleCancel = () => {
    setEditingMovie(null);
    setShowForm(false);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>My Favorite Movies</h1>
        <p>Keep track of all your favorite films!</p>
      </header>

      <main className="app-main">
        <div className="action-buttons">
          <button 
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditingMovie(null);
            }}
          >
            {showForm ? 'Cancel' : '+ Add New Movie'}
          </button>
        </div>

        {(showForm || editingMovie) && (
          <MovieForm
            movie={editingMovie}
            onSubmit={editingMovie ? 
              (data) => updateMovie(editingMovie.movie_id, data) : 
              addMovie
            }
            onCancel={handleCancel}
          />
        )}

        <MovieList
          movies={movies}
          onEdit={handleEdit}
          onDelete={deleteMovie}
        />
      </main>
    </div>
  );
}

export default App;