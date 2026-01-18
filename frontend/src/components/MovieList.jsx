import React from 'react';
import MovieItem from './MovieItem';

function MovieList({ movies, onEdit, onDelete }) {
  if (movies.length === 0) {
    return (
      <div className="empty-state">
        <h3>No movies yet!</h3>
        <p>Start by adding your first favorite movie.</p>
      </div>
    );
  }

  return (
    <div className="movie-list">
      <h2>All Movies ({movies.length})</h2>
      <div className="movies-grid">
        {movies.map((movie) => (
          <MovieItem
            key={movie.movie_id}
            movie={movie}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieList;