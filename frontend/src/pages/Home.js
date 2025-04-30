import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (   
    <div className="home">
      <div className="container">
        <section className="hero">
          <h1>Help Find Lost Pets</h1>
          <p>Our community helps reunite lost pets with their owners.</p>
          <div className="hero-buttons">
            <Link to="/report-pet" className="btn btn-primary">Report Missing Pet</Link>
            <Link to="/lost-and-found" className="btn btn-secondary">Search Found Pets</Link>
            <Link to="/generate-poster" className="btn btn-tertiary">Generate Lost Pet Poster</Link>
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