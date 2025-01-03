import React, { useState } from 'react';

const MovieReview = ({ movieId }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Review for movie ID ${movieId}: ${review}`);
    setReview('');
  };

  return (
    <div className="container mt-5">
      <h4>Write a Review</h4>
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          rows="5"
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
        />
        <button type="submit" className="btn btn-success mt-3">Submit Review</button>
      </form>
    </div>
  );
};

export default MovieReview;
