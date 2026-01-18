import React, { useState, useEffect } from 'react';

function MovieForm({ movie, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    genre: '',
    rating: 3,
  });

  useEffect(() => {
    if (movie) {
      setFormData({
        title: movie.title,
        genre: movie.genre,
        rating: movie.rating,
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'rating' ? parseInt(value) : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.genre.trim()) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit(formData);
    
    if (!movie) {
      setFormData({ title: '', genre: '', rating: 3 });
    }
  };

  return (
    <div className="movie-form-container">
      <h2>{movie ? 'Edit Movie' : 'Add New Movie'}</h2>
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-group">
          <label htmlFor="title">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter movie title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="genre">Genre *</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="e.g., Action, Comedy, Drama"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating (1-5) *</label>
          <select
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            required
          >
            <option value="1">1 - Poor</option>
            <option value="2">2 - Fair</option>
            <option value="3">3 - Good</option>
            <option value="4">4 - Very Good</option>
            <option value="5">5 - Excellent</option>
          </select>
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-success">
            {movie ? 'Update Movie' : 'Add Movie'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;