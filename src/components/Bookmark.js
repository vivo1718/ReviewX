import { faTrash } from '@fortawesome/free-solid-svg-icons/faTrash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ProgressBar } from 'react-bootstrap';
import { Toaster,toast } from 'sonner';
import React, { useEffect, useState } from 'react';
const Bookmark = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

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
    setLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => (prev < 95 ? prev + 5 : prev));
    }, 100);

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
  const handleRemoveFromFavorites = async (movieId) => {
    const url = "https://api.themoviedb.org/3/account/${movieId}/favorite";
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjc1ZWU2ZmM2ZGE2YjhhYzllYjFjOTM5MTU2MDRjZiIsIm5iZiI6MTczNTQzOTEzMi44ODk5OTk5LCJzdWIiOiI2NzcwYjMxYzZjYzRjYWY4ZmI5MmE2ZjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rM0XmTtNe3tTPPmxUjlH4as80N0niqmOMRw8VDaZSdo",
      },
      data: {
        media_type: "movie",
        media_id: movieId,
        favorite: false,
      },
    };
    try {
      const response = await fetch(url, options);
      const result = await response.json();

      if (response.ok) {
        // Update favorites list by filtering out the deleted list
        setFavorites((prevFavorites) =>
          prevFavorites.filter((movie) => movie.id !== movieId)
        );
        console.log(`List with ID ${movieId} was deleted successfully.`);
        toast.success('List deleted successfully',{
          className:'toast-can d-flex rounded'
        });
      } else {
        console.error('Failed to delete the list:', result.status_message);
        toast.error('Failed to delete the list');

      }
    } catch (err) {
      console.error('Error deleting the list:', err);
      toast.warning('Error deleting the list');
    }
  };
  

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return <div className='d-flex flex-column justify-content-center align-items-center mt-3' ><p>Loading favorites...</p>
    <ProgressBar
          animated
          now={progress}
          label={`${progress}%`}          
          style={{ width: '25%' }}
        />
    </div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className='d-flex flex-column ms-3 me-3 mt-5 ps-3 ' style={{fontFamily:'Poppins', }}  >
      <Toaster richColors   position='top-right' className='d-flex rounded' expand={false}  ></Toaster>
      <h3 className=' ms-5 mb-3' style={{
        textDecoration:'underline'
      }} >Favorites </h3>
      {favorites.length > 0 ? (
        
        <ul className="list-unstyled">
        <div className="container"   >
          <div className="row">
            {favorites.map((movie) => (
              <div className="col-md-6 mb-4" key={movie.id}>
                <div
                  className="d-flex flex-row align-items-center p-3"
                  style={{
                    backgroundColor: '#ffd',
                    border: '2px solid black',
                    borderRadius: '8px',
                  }}
                >
                  {/* Movie Poster */}
                  <div className="me-3">
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                      loading="lazy"
                      style={{ height: '10rem' }}
                    />
                  </div>
      
                  {/* Movie Details */}
                  <div className="flex-grow-1">
                    <h6 className="mb-2">{movie.title}</h6>
                    <p className="mb-2"  style={{
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          fontSize:'smaller',
                          WebkitLineClamp: 3,
                        }} >
                        <strong>{movie.id}</strong>
                      <strong>Overview:</strong> {movie.overview}
                    </p>
                    
                  </div>
      
                  {/* Remove from Favourites Icon */}
                  <div className='ms-3'>
                    <button
                      className="btn-danger"

                       onClick={() => handleRemoveFromFavorites(movie.id)}
                    >
                      <FontAwesomeIcon   style={{color:'red'}} icon={faTrash}></FontAwesomeIcon>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ul>
        
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
};

export default Bookmark;
