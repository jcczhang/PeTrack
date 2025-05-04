import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../styles/LostAndFound.css';
import { lostPets, foundPets } from '../data/petsData';

function LostAndFound() {
  const [activeTab, setActiveTab] = useState('lost');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const filteredPets = (activeTab === 'lost' ? lostPets : foundPets).filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (pet) => {
    setSelectedPet(pet);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPet(null);
  };

  return (
    <div className="lost-and-found">
      <div className="container">
        <h1>Lost and Found Pets</h1>

        <div className="search-section">
          <input
            type="text"
            placeholder="Search by name, breed, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="tabs">
          <button
            className={`tab ${activeTab === 'lost' ? 'active' : ''}`}
            onClick={() => setActiveTab('lost')}
          >
            Lost Pets
          </button>
          <button
            className={`tab ${activeTab === 'found' ? 'active' : ''}`}
            onClick={() => setActiveTab('found')}
          >
            Found Pets
          </button>
        </div>

        <div className="pets-grid">
          {filteredPets.map(pet => (
            <div key={pet.id} className="pet-card" id={`pet-${pet.id}`}>
              <div className="pet-image">
                <img src={pet.image} alt={pet.name} />
              </div>
              <div className="pet-info">
                <h3>{pet.name}</h3>
                <p><strong>Type:</strong> {pet.type}</p>
                <p><strong>Breed:</strong> {pet.breed}</p>
                <p><strong>Location:</strong> {pet.location}</p>
                <p><strong>{activeTab === 'lost' ? 'Last Seen:' : 'Found Date:'}</strong> {activeTab === 'lost' ? pet.lastSeen : pet.foundDate}</p>
                <p className="description">{pet.description}</p>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleContactClick(pet)}
                >
                  Contact
                </button>

                {/* View Detail button */}
                <Link to={`/lost-pets/${pet.id}`}>
                  <button className="btn btn-secondary">View Details</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedPet && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            <h2>Contact Information</h2>
            <div className="contact-info">
              <p><strong>Pet Name:</strong> {selectedPet.name}</p>
              <p><strong>Contact Name:</strong> {selectedPet.ownerName || 'Unknown'}</p>
              <p><strong>Contact Info:</strong> {selectedPet.contactInfo || 'N/A'}</p>
              <p><strong>Additional Notes:</strong> {selectedPet.contactNotes || 'No additional notes'}</p>

              {/* <p><strong>Phone:</strong> {selectedPet.ownerPhone || 'N/A'}</p>
              <p><strong>Email:</strong> {selectedPet.ownerEmail || 'N/A'}</p>
              <p><strong>Additional Notes:</strong> {selectedPet.notes || 'No additional notes'}</p> */}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LostAndFound; 