import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import './Home.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
// Modal.setAppElement("#");
function Home() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  return (   
    <div className="home">
      <div className="container">
        <section className="hero">
          <h1>Help Find Lost Pets</h1>
          <p>Our community helps reunite lost pets with their owners.</p>
          <div className="hero-buttons">
            <button id="modal-btn" className="btn btn-primary" onClick={openModal}>Report Missing Pet</button>
            <Link to="/map-search" className="btn btn-secondary">Search Found Pets</Link>
          </div>
        </section>
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        >
          <h1>What Should I do if I lose my pet</h1>
          <span>Don't worry, we'll help you find it!</span>
          <ol>
            <li>Click on "Map Search" to view shelters near your pet last known location</li>
            <li>Contact the shelter and ask if someone has dropped of your pet</li>
            <li>Post a pet search notice with a photo and description of your pet.</li>
            <li>Post the flyer in the area where the pet was lost and we will provide the best location to post it.</li>
          </ol>
          <button className="btn btn-primary">Continue</button>
        </Modal>
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