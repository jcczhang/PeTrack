import React from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaMapMarkedAlt, FaRobot } from 'react-icons/fa';
import '../styles/Home.css';

function Home() {
  return (
    <div className="home">
      <div className="container">
        <section className="hero">
          <h1>Help Find Lost Pets</h1>
          <p>Our community helps reunite lost pets with their owners. Try our selection of search options to find your missing pet or help others find theirs.</p>
          <div className="hero-buttons">
            <Link to="/report-pet" className="btn btn-primary">Report Missing Pet</Link>
            <Link to="/generate-poster" className="btn btn-tertiary">Generate Lost Pet Poster</Link>
          </div>
        </section>
        <section className="search-options">
          <h2>Search Options</h2>
          <div className="search-grid">
            <Link to="/lost-and-found" className="search-option">
              <FaSearch className="search-icon" />
              <h3>Lost & Found</h3>
              <p>Browse through our database of lost and found pets. Search by location, pet type, and date to find matches.</p>
            </Link>
            <Link to="/map-search" className="search-option">
              <FaMapMarkedAlt className="search-icon" />
              <h3>Map Search</h3>
              <p>Search for pets in specific locations using our interactive map. Perfect for checking nearby areas and shelters.</p>
            </Link>
            <Link to="/ai-search" className="search-option">
              <FaRobot className="search-icon" />
              <h3>AI Search</h3>
              <p>Use our AI-powered search to find potential matches based on pet descriptions and photos.</p>
            </Link>
          </div>
        </section>
        <section className="features">
          <div className="feature">
            <div className="feature-icon"></div>
            <h3>Quick Search</h3>
            <p>Find shelters and reported pets in your area.</p>
          </div>
          <div className="feature">
            <div className="feature-icon"></div>
            <h3>Community Support</h3>
            <p>Connect with local pet rescuers and volunteers.</p>
          </div>
          <div className="feature">
            <div className="feature-icon"></div>
            <h3>Easy Reporting</h3>
            <p>Report your missing pet in minutes.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;