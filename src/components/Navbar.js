import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { useState } from 'react';
import reviewX from '../assets/reviewX.png';
import { useNavigate } from 'react-router-dom';
import { Toaster,toast } from 'sonner';
import { Button, OverlayTrigger, Tooltip, Modal, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUser, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import img3 from '../assets/new_user.png';
import img4 from '../assets/sign_in.png'
const Navbar = ({ favorites = [] }) => {
  const navigate = useNavigate();
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [showSigninModal, setShowSigninModal] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5008/signup", formData);
      setIsAuthenticated(true);  // Set user as authenticated after successful sign-up

      toast.success('User Registered Successfuly')
    } catch (error) {
      toast.error('Error signing up')

    }
  };

  const [formDataSign, setFormDataSign] = useState({
    email: "",
    password: "",
  });
  const handleChangeSign = (e) => {
    const { name, value } = e.target;
    setFormDataSign({ ...formDataSign, [name]: value });
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Tracks authentication state


  const handleSubmitSign = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5008/signin", formDataSign);
      setIsAuthenticated(true);  // Set user as authenticated after successful sign-up
      toast.success('User Loggedin Successfuly')

      localStorage.setItem("token", response.data.token); // Store JWT token
    } catch (error) {
      toast.error('Error in logging in')
    }
  };
  const handleSignupClose = () => setShowSignupModal(false);
  const handleSignupShow = () => setShowSignupModal(true);
  const handleSigninClose = () => setShowSigninModal(false);
  const handleSigninShow = () => setShowSigninModal(true);
  const handlebookmark = () => { 
    navigate('/bookmark');
   };

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          {/* <img
            style={{
              height: '50px',
              width: '100px',
            }}
            src={reviewX}
            alt="ReviewX Logo" 
          />*/}
          <div className='d-flex justify-content-center align-items-center h-100 '  >ReviewX</div>
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
          <Button className='d-flex btn-log justify-content-center align-items-center' style={{ borderRadius: '0px' }} onClick={handleSigninShow}
 >Login</Button>
  
        </div>
      </div>
    </nav>
    <Toaster richColors expand={false}></Toaster>

    <Modal   show={showSignupModal} 
      
    dialogClassName='custom-modal'
    centered
    onHide={handleSignupClose}>
    <Modal.Header closeButton>
      <Modal.Title style={{fontSize:'16px'}} >Signup</Modal.Title>
    </Modal.Header>
    <Modal.Body >
      <div className='d-flex justify-content-center align-items-center mb-2 ' style={{height:'40px'}}> 
        <img src={img3}></img>
      </div>
      <Form  onSubmit={handleSubmit} >
        <Form.Group className="mb-3 " controlId="formName" style={{height:'50px',}}>
          <Form.Control type="text" 
          style={{height:'50px',borderRadius:'10px'}}
          name='username'
          className='form_cont'
          value={formData.username}
          onChange={handleChange}
          placeholder="Enter your name" />
        </Form.Group>
        <Form.Group className="mb-3 " 
        controlId="formEmail">
          <Form.Control type="email"
          name='email'
          className='form_cont'
          style={{height:'50px',borderRadius:'10px'}} 
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Control type="password"
          style={{height:'50px', borderRadius:'10px'}} 
          name='password'
          className='form_cont'
          value={formData.password}
          onChange={handleChange}
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
  <Modal   show={showSigninModal} 
      
    dialogClassName='custom-modal'
    centered
    onHide={handleSigninClose}>
    <Modal.Header closeButton>
      <Modal.Title style={{
        fontSize:'16px'
      }} >Signin</Modal.Title>
    </Modal.Header>
    <Modal.Body >
      <div className='d-flex justify-content-center align-items-center mb-2' style={{height:'40px'}}> 
      <img src={img4}></img>
      </div>
      <Form  onSubmit={handleSubmitSign} >
        
        <Form.Group className="mb-3 " 
        controlId="formEmail">
          <Form.Control type="email"
          name='email'
          className='form_cont'
          style={{height:'50px',borderRadius:'10px'}} 
          value={formDataSign.email}
          onChange={handleChangeSign}
          placeholder="Enter your email" />
        </Form.Group>
        <Form.Group className=" mb-3" controlId="formPassword">
          <Form.Control type="password"
          style={{height:'50px', borderRadius:'10px'}} 
          name='password'
          className='form_cont'
          value={formDataSign.password}
          onChange={handleChangeSign}
          placeholder="Enter your password" />
        </Form.Group>
        <div style={{height:'50px',marginBottom:'30px'}}>
        <Button   variant="primary w-100 h-100  " type="submit"  >
          Signin
        </Button>
        </div>
      </Form>
    </Modal.Body>
  </Modal>
  </>
  );
};

export default Navbar;
