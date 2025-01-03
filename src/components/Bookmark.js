import React, { useEffect, useState } from 'react';

const Bookmark = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFavorites = async () => {
    const url =
      'https://api.themoviedb.org/3/account/21715835/favorite/movies?language=en-US&page=1&sort_by=created_at.asc';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjc1ZWU2ZmM2ZGE2YjhhYzllYjFjOTM5MTU2MDRjZiIsIm5iZiI6MTczNTQzOTEzMi44ODk5OTk5LCJzdWIiOiI2NzcwYjMxYzZjYzRjYWY4ZmI5MmE2ZjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rM0XmTtNe3tTPPmxUjlH4as80N0niqmOMRw8VDaZSdo',
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (data && data.results) {
        setFavorites(data.results);
      }
    } catch (err) {
      console.error('Error fetching favorites:', err);
      setError('Failed to fetch favorites. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <p>Loading favorites...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h3>Your Favorite Movies</h3>
      {favorites.length > 0 ? (
        <ul>
          {favorites.map((movie) => (
            <li key={movie.id}>
              <div className='d-flex flex-row mb-2 ' >
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default Bookmark;
