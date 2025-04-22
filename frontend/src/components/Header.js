import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import logo from '../PeTrack.png';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
            <img src={logo} alt="Find my Pet" className="logo-image" />
        </Link>
        <button className="mobile-menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>
        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
            <li><Link to="/missing-pet" onClick={() => setMenuOpen(false)}>Report Missing</Link></li>
            <li><Link to="/map-search" onClick={() => setMenuOpen(false)}>Map Search</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;