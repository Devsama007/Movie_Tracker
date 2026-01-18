import React from 'react';

function MovieItem({ movie, onEdit, onDelete }) {
  const isTopPick = movie.rating === 5;

  const renderStars = (rating) => {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  return (
    <div className={`movie-card ${isTopPick ? 'top-pick' : ''}`}>
      {isTopPick && <div className="top-pick-badge">⭐ TOP PICK!</div>}
      
      <div className="movie-header">
        <h3 className="movie-title">
          {movie.title}
        </h3>
        <span className="movie-genre">{movie.genre}</span>
      </div>

      <div className="movie-rating">
        <span className="stars">{renderStars(movie.rating)}</span>
        <span className="rating-number">{movie.rating}/5</span>
      </div>

      <div className="movie-actions">
        <button 
          className="btn btn-edit"
          onClick={() => onEdit(movie)}
        >
          Edit
        </button>
        <button 
          className="btn btn-delete"
          onClick={() => onDelete(movie.movie_id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default MovieItem;