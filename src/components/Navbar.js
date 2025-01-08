import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';
import reviewX from '../assets/reviewX.png';
import { useNavigate } from 'react-router-dom';
import { Button, OverlayTrigger, Tooltip, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
const Navbar = ({ favorites = [] }) => {
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);

  const handleSignupClose = () => setShowSignupModal(false);
  const handleSignupShow = () => setShowSignupModal(true);
  const handlebookmark = () => { 
    navigate('/bookmark');
   };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
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
        <Button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{
            height:'50px',
            width:'50px',
          }}
        >
          <span className="navbar-toggler-icon"></span>
        </Button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link active" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/favourites" onClick={handlebookmark} >
                Favourites
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to="/genres">
                Genres
              </Link>
            </li>
          </ul>
          
            <Button
              className="d-flex btn-sign justify-content-center align-items-center"
              style={{ borderRadius: '0px' }}
              onClick={handleSignupShow}
            >
              Signup
            </Button>
          <Button className='d-flex btn-log justify-content-center align-items-center' >Login</Button>
        </div>
      </div>
    </nav>
    <Modal   show={showSignupModal} 
      
    dialogClassName='custom-modal'
    centered
    onHide={handleSignupClose}>
    <Modal.Header closeButton>
      <Modal.Title>Signup</Modal.Title>
    </Modal.Header>
    <Modal.Body >
      <div className='d-flex justify-content-center align-items-center' style={{height:'50px'}}> 
        <FontAwesomeIcon icon={faUserPlus} size="2x" />
      </div>
      <Form>
        <Form.Group className="mb-3 " controlId="formName" style={{height:'50px',}}>
          <Form.Control type="text" 
          style={{height:'50px',borderRadius:'20px'}}
          placeholder="Enter your name" />
        </Form.Group>
        <Form.Group className="mb-3 " 
        controlId="formEmail">
          <Form.Control type="email"
          style={{height:'50px',borderRadius:'20px'}} 
          placeholder="Enter your email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control type="password"
          style={{height:'50px', borderRadius:'20px'}} 
          placeholder="Enter your password" />
        </Form.Group>
        <div style={{height:'50px'}}>
        <Button variant="primary w-100 h-100 " type="submit">
          Signup
        </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
  </>
  );
};

export default Navbar;
