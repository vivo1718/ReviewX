import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetail = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjc1ZWU2ZmM2ZGE2YjhhYzllYjFjOTM5MTU2MDRjZiIsIm5iZiI6MTczNTQzOTEzMi44ODk5OTk5LCJzdWIiOiI2NzcwYjMxYzZjYzRjYWY4ZmI5MmE2ZjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rM0XmTtNe3tTPPmxUjlH4as80N0niqmOMRw8VDaZSdo',
          },
        });
        setMovie(res.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="container mt-5 p-3"> 
      <div className="row mt-5 p-2" style={{backgroundColor:'#1f1f1f'}} >
        <div className="col-md-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}

            className="img-fluid h-100 "
          />
        </div>
        <div className="col-md-8 pt-2">
  <div className="card shadow-lg bg-dark text-light" style={{ borderRadius: '0px', borderColor: 'blue', }}>   
    <div className="card-body">
      <h2
        className="card-title"
        style={{
          color: '#ffc',
          fontFamily: 'Poppins',
        }}
      >
        {movie.title}
      </h2>
      <p
        className="card-text"
        style={{
          fontFamily: 'Poppins',
        }}
      >
        <strong>Release Date:</strong> {movie.release_date}
      </p>
      <strong>Overview:</strong>
      <p
        className="card-text"
        style={{
          fontFamily: 'Poppins',
          fontSize:'small'
        }}
      >
         {movie.overview}
      </p>
      <strong
        className="card-subtitle mb-2"
        style={{
          fontFamily: 'Poppins',
        }}
      >
        Genres:
      </strong>
      <ul
        className="list-unstyled"
        style={{
          fontFamily: 'Poppins',
        }}
      >
        {movie.genres.map((genre) => (
          <li key={genre.id} className="mb-1">
            <span className="badge bg-secondary">{genre.name}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default MovieDetail;
