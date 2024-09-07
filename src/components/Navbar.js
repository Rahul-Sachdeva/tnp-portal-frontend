import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css'; // Import the custom CSS file
import Logout from './Auth/Logout';
import { useContext } from 'react';
import { AuthContext } from '../hooks/AuthContext';


const Navbar = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const loginUser = localStorage.getItem('user');
  const { logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">MyWebsite</Link>
      </div>
      
      {!isMobile && (
        <ul className="navbar-links">
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/posts">Posts</Link></li>
          <li><Link to="/create-post">Create Post</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li>

          
            {loginUser? <button onClick={()=>logout(loginUser)} className="logout-btn">Logout</button>
                : <Link to="/login">login</Link>
            }
          </li>
        </ul>
      )}
      
      {isMobile && (
        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      )}

      {isMobile && isMenuOpen && (
        <ul className={`navbar-links ${isMenuOpen ? 'show' : ''}`}>
          <li><Link to="/home" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/posts" onClick={toggleMenu}>Posts</Link></li>
          <li><Link to="/create-post" onClick={toggleMenu}>Create Post</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About Us</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
          <li>
            {loginUser? <button onClick={() => {toggleMenu(); }} className="logout-btn"><Logout/></button>
                : <Link to="/login">login</Link>
            }
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
