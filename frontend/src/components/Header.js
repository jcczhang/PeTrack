import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronDown } from 'react-icons/fa';
import './Header.css';
import logo from '../PeTrack.png';

import HomeBlackIcon from '../icons/home-black.svg';
import HomeWhiteIcon from '../icons/home-white.svg';
import SearchWhiteIcon from '../icons/search-white.svg';
import SearchBlackIcon from '../icons/search-black.svg';
import FlyerBlackIcon from '../icons/flyer-black.svg';
import FlyerWhiteIcon from '../icons/flyer-white.svg';
import MapBlackIcon from '../icons/map-black.svg';
import MapWhiteIcon from '../icons/map-white.svg';
import FindWhiteIcon from '../icons/find-white.svg';
import FindBlackIcon from '../icons/find-black.svg';
import AISearchWhiteIcon from '../icons/find-white.svg';
import AISearchBlackIcon from '../icons/find-black.svg';

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSearchDropdown = () => {
    setSearchDropdownOpen(!searchDropdownOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img src={logo} alt="Find my Pet" className="logo-image" />
        </Link>
        <button className={`mobile-menu-toggle ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <span className="menu-icon"></span>
        </button>
        <nav className={`nav-menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <img
                  src={location.pathname === "/" ? HomeBlackIcon : HomeWhiteIcon}
                  alt="Home"
                  style={{ top: '-3px'}}
                />
                Home
              </Link>
            </li>
            <li>
              <Link to="/report-pet" onClick={() => setMenuOpen(false)}>
                <img
                  src={location.pathname === "/report-pet" ? FindBlackIcon : FindWhiteIcon}
                  alt="report-pet"
                  style={{ top: '-1px'}}
                />
                Report Pet
              </Link>
            </li>
            <li className="search-dropdown" onMouseEnter={() => setSearchDropdownOpen(true)} onMouseLeave={() => setSearchDropdownOpen(false)}>
              <div className="search-trigger" onClick={toggleSearchDropdown}>
                <img
                  src={location.pathname === "/lost-and-found" || location.pathname === "/map-search" ? SearchBlackIcon : SearchWhiteIcon}
                  alt="search"
                />
                Search
                <FaChevronDown className={`dropdown-arrow ${searchDropdownOpen ? 'open' : ''}`} />
              </div>
              <ul className={`dropdown-menu ${searchDropdownOpen ? 'open' : ''}`}>
                <li>
                  <Link to="/lost-and-found" onClick={() => setMenuOpen(false)}>
                    <img
                      src={location.pathname === "/lost-and-found" ? SearchBlackIcon : SearchWhiteIcon}
                      alt="lost-and-found"
                      className="dropdown-icon"
                    />
                    Lost & Found
                  </Link>
                </li>
                <li>
                  <Link to="/map-search" onClick={() => setMenuOpen(false)}>
                    <img
                      src={location.pathname === "/map-search" ? MapBlackIcon : MapWhiteIcon}
                      alt="map-search"
                      className="dropdown-icon"
                    />
                    Map Search
                  </Link>
                </li>
                <li>
                  <Link to="/ai-search" onClick={() => setMenuOpen(false)}>
                    <img
                      src={location.pathname === "/ai-search" ? AISearchBlackIcon : AISearchWhiteIcon}
                      alt="ai-search"
                      className="dropdown-icon"
                    />
                    AI Search
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/generate-poster" onClick={() => setMenuOpen(false)}>
                <img
                  src={location.pathname === "/generate-poster" ? FlyerBlackIcon : FlyerWhiteIcon}
                  alt="generate-poster"
                />
                Generate Poster
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;