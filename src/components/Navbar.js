import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import reviewX from '../assets/reviewX.png';
import { useNavigate } from 'react-router-dom';
const Navbar = ({ favorites = [] }) => {
  const navigate = useNavigate();
  const handlebookmark = () => { 
    navigate('/bookmark');
   };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            style={{
              height: '50px',
              width: '100px',
            }}
            src={reviewX}
            alt="ReviewX Logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/bookmark" onClick={handlebookmark} >
                Bookmark
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/genres">
                Genres
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
