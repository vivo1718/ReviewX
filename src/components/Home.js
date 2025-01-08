import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import {  faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import "slick-carousel/slick/slick.css";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import "slick-carousel/slick/slick-theme.css";
import movie from "../assets/movie.avif";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [ratedMovies, setRatedMovies] = useState([]);
  const [openCardIdMovies, setOpenCardIdMovies] = useState(null); // For Top Movies
  const [openCardIdRated, setOpenCardIdRated] = useState(null); // For TV Series
  const [watchProviders, setWatchProviders] = useState({});
  const[loading2,setLoading2] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc",
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjc1ZWU2ZmM2ZGE2YjhhYzllYjFjOTM5MTU2MDRjZiIsIm5iZiI6MTczNTQzOTEzMi44ODk5OTk5LCJzdWIiOiI2NzcwYjMxYzZjYzRjYWY4ZmI5MmE2ZjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rM0XmTtNe3tTPPmxUjlH4as80N0niqmOMRw8VDaZSdo",
            },
          }
        );
        setMovies(res.data.results);
        setLoading2(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);
  //fetch watch provider
  const fetchWatchProviders = async (movieId) => {
    try {
      const res = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/watch/providers`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjc1ZWU2ZmM2ZGE2YjhhYzllYjFjOTM5MTU2MDRjZiIsIm5iZiI6MTczNTQzOTEzMi44ODk5OTk5LCJzdWIiOiI2NzcwYjMxYzZjYzRjYWY4ZmI5MmE2ZjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rM0XmTtNe3tTPPmxUjlH4as80N0niqmOMRw8VDaZSdo",
          },
        }
      );
      const providers = res.data.results;
      setWatchProviders((prev) => ({ ...prev, [movieId]: providers }));
    } catch (error) {
      console.error("Failed to fetch watch providers:", error);
    }
  };
  const uniqueProviders = (providers) => {
    const seen = new Set();
    return providers.filter((provider) => {
      if (seen.has(provider.provider_id)) {
        return false;
      }
      seen.add(provider.provider_id);
      return true;
    });
  };

  
  useEffect(() => {
    const fetchRatedMovies = async () => {
      try {
        const res = await axios.get(
          "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc",
          {
            headers: {
              accept: "application/json",
              Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNjc1ZWU2ZmM2ZGE2YjhhYzllYjFjOTM5MTU2MDRjZiIsIm5iZiI6MTczNTQzOTEzMi44ODk5OTk5LCJzdWIiOiI2NzcwYjMxYzZjYzRjYWY4ZmI5MmE2ZjUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.rM0XmTtNe3tTPPmxUjlH4as80N0niqmOMRw8VDaZSdo",
            },
          }
        );
        setRatedMovies(res.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRatedMovies();
  }, []);

  // const toggleDetailsMovies = (id) => {
  //   setOpenCardIdMovies(openCardIdMovies === id ? null : id);
  // };
  const [favorites, setFavorites] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = (id) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        // Remove the movie from favorites
        return prevFavorites.filter((movieId) => movieId !== id);
      } else {
        // Add the movie to favorites
        toast.success("Movie added to favorites!");

        handleAddToFavorites(id);
        return [...prevFavorites, id];
        
      }
    });
  };
  const handleAddToFavorites = async (movieId) => {
    const url = "https://api.themoviedb.org/3/account/21715835/favorite";
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
        favorite: true,
      },
    };

    try {
      const response = await axios.post(url, options.data, {
        headers: options.headers,
      });
      if (response.status === 200) {
        setFavorites((prev) => [...prev, movie]); 
        // Add movie to favorites
      }
    } catch (error) {
      console.error("Failed to add to favorites:", error);

    }
  };

  const toggleDetailsMovies = (id) => {
    if (openCardIdMovies !== id) {
      fetchWatchProviders(id); // Fetch watch providers when expanding
    }
    setOpenCardIdMovies(openCardIdMovies === id ? null : id);
  };
  const toggleDetailsRated = (id) => {
    if (openCardIdRated !== id) {
      fetchWatchProviders(id); // Fetch watch providers when expanding
    }
    setOpenCardIdRated(openCardIdRated === id ? null : id);
  };
  

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: <FontAwesomeIcon icon={faChevronRight} size="2x" />,
    prevArrow: <FontAwesomeIcon icon={faChevronLeft} size="2x" />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div style={{ backgroundColor: "#ffe" }}>
      <ToastContainer />

      <div className="video-section">
        <img
          className="video-bg"
          //  src="https://image.tmdb.org/t/p/w500/sGxcMvC6mfCzEir0c1tldsPhZEF.jpg"
          src={movie}    
        ></img>
        <div className="overlay"></div>
        <div className="video-content">
          <h1>Welcome to Movie World</h1>
          <p>Discover the most popular and trending movies of the year.</p>
        </div>
      </div>
      {!loading2?(<><div className="container mt-4  ">
        {/* Top Movies Section */}
        <div className="d-flex flex-row">
          <div className="title_bar"></div>
          <h3
            className="text-center mb-4"
            style={{
              fontFamily: 'Poppins',
            }}
          >
            Top Movies
          </h3>
        </div>
        <Slider {...settings}>
          {movies.map((movie) => (
            <div key={movie.id} className="px-2">
              <div className="card movie-card shadow-sm  rounded">
              <div className="img_top d-flex justify-content-center align-items-center " style={{
                  width:'50px',
                  backgroundColor:'#1f1f1f',
                  borderRadius:'25%',
                  height:'50px',
                }} >
                  <FontAwesomeIcon size="1x"  onClick={() => toggleBookmark(movie.id)} icon={
                      favorites.includes(movie.id) ? solidBookmark : regularBookmark
                    } style={{ color: "red" }} />
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img-top rounded-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{movie.original_title}</h5>
                  <p style={{color:'#ffc',fontFamily:'Poppins',fontSize:'smaller'}} >ReleaseDate: {movie.release_date}</p>
                  
    
                  <button
                    className="btn  w-100"
                    onClick={() => toggleDetailsMovies(movie.id)}
                  >
                    View Details
                  </button>
                </div>

                {/* Bottom Sheet for Top Movies */}
                <div className={`bottom-sheet ${openCardIdMovies === movie.id ? "open" : ""}`}>
                  <div className="sheet-content d-flex flex-column justify-content-center align-item-center" onClick={() => toggleDetailsMovies(movie.id)}>
                  <div  style={{
                    height:'5px',
                    width:'60px',
                    borderRadius:'25px',
                    marginBottom:'5px',
                    backgroundColor:'#1f1f1f',
                  }} ></div>
                  <p style={{
                      fontFamily: 'Poppins',
                      fontSize:'smaller',
                      fontWeight:'bold'
                    }}>{movie.overview}</p>
                    <div className="watch-providers  ">
      {watchProviders[movie.id]?.US?.flatrate ? (
        uniqueProviders(watchProviders[movie.id].US.flatrate).map((provider) => (
          <div key={provider.provider_id} className="provider">
            <p>Streaming on:</p>
            <img src={`https://image.tmdb.org/t/p/w500/${provider.logo_path}`}  style={{ width: '40px', height: '40px', borderRadius: '50%' }} />
          </div>
        ))
      ) : (
        <p>No providers available</p>
      )}
    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>

        {/* TV Series Section */}
        <div className="d-flex flex-row mt-5 ">
          <div className="title_bar"></div>
          <h3
            className="text-center mb-4"
            style={{
              fontFamily: 'Poppins',
            }}
          >
            Top TV Series
          </h3>
        </div>
        <Slider {...settings}>
          {ratedMovies.map((rmovie) => (
            <div key={rmovie.id} className="px-2">
              <div className="card movie-card shadow-sm rounded">
                <div className="img_top d-flex justify-content-center align-items-center " style={{
                  width:'50px',
                  backgroundColor:'#1f1f1f',
                  borderRadius:'25%',
                  height:'50px',
                }} >
<FontAwesomeIcon size="1x"  onClick={() => toggleBookmark(rmovie.id)} icon={
                      favorites.includes(rmovie.id) ? solidBookmark : regularBookmark
                    } style={{ color: "red" }} />                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${rmovie.poster_path}`}
                  alt={rmovie.name}
                  className="card-img-top rounded-top"
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{rmovie.name}</h5>
                  <p style={{color:'#ffc',fontFamily:'Poppins',fontSize:'smaller'}} >First Air: {rmovie.first_air_date}</p>

                  <button
                    className="btn  w-100"
                    onClick={() => toggleDetailsRated(rmovie.id)}
                  >
                    View Details
                  </button>
                </div>

                {/* Bottom Sheet for TV Series */}
                <div className={`bottom-sheet ${openCardIdRated === rmovie.id ? "open" : ""}`}>
                  <div className="sheet-content" onClick={() => toggleDetailsRated(rmovie.id)}>
                  
                    
                    <p style={{
                      fontFamily: 'Poppins',
                      fontSize:'smaller',
                      fontWeight:'bold'
                    }}>{rmovie.overview}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div></>):(<div className="d-flex justify-content-center align-items-center mt-4">Loading Please wait...</div>)}
    </div>
  );
};

export default Home;
