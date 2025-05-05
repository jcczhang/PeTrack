import React, { useState } from 'react';
import '../styles/LostAndFound.css';
import { lostPets, foundPets } from '../data/petsData';

function LostAndFound() {
  const [activeTab, setActiveTab] = useState('lost');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(''); // 'contact' or 'details'

  const calculateTimeDifference = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 30) {
      return `${diffDays} ${diffDays === 1 ? 'day' : 'days'} ago`;
    } else if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return `${months} ${months === 1 ? 'month' : 'months'} ago`;
    } else {
      const years = Math.floor(diffDays / 365);
      return `${years} ${years === 1 ? 'year' : 'years'} ago`;
    }
  };

  const filteredPets = (activeTab === 'lost' ? lostPets : foundPets).filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleContactClick = (pet) => {
    setSelectedPet(pet);
    setModalType('contact');
    setShowModal(true);
  };

  const handleViewDetailsClick = (pet) => {
    setSelectedPet(pet);
    setModalType('details');
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedPet(null);
    setModalType('');
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
                <div className="pet-header">
                  <span className={`status-badge ${activeTab}`}>
                    {activeTab === 'lost' ? 'Lost' : 'Found'}
                  </span>
                  <span className="pet-type">{pet.type}</span>
                  <span className="pet-location">{pet.location}</span>
                  <span className="pet-time">
                    {calculateTimeDifference(activeTab === 'lost' ? pet.lastSeen : pet.foundDate)}
                  </span>
                </div>
                <h3>{pet.name}</h3>
                <div className="pet-actions">
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleContactClick(pet)}
                  >
                    Contact
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleViewDetailsClick(pet)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && selectedPet && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>×</button>
            {modalType === 'contact' ? (
              <>
                <h2>Contact Information</h2>
                <div className="contact-info">
                  <p><strong>Pet Name:</strong> {selectedPet.name}</p>
                  <p><strong>Contact Name:</strong> {selectedPet.ownerName || 'Unknown'}</p>
                  <p><strong>Phone:</strong> {selectedPet.ownerPhone || 'N/A'}</p>
                  <p><strong>Email:</strong> {selectedPet.ownerEmail || 'N/A'}</p>
                  <p><strong>Additional Notes:</strong> {selectedPet.notes || 'No additional notes'}</p>
                </div>
              </>
            ) : (
              <>
                <h2>Pet Details</h2>
                <div className="pet-details">
                  <div className="pet-detail-image">
                    <img src={selectedPet.image} alt={selectedPet.name} />
                  </div>
                  <div className="pet-detail-info">
                    <h3>{selectedPet.name}</h3>
                    <p><strong>Type:</strong> {selectedPet.type}</p>
                    <p><strong>Breed:</strong> {selectedPet.breed}</p>
                    <p><strong>Location:</strong> {selectedPet.location}</p>
                    <p><strong>{activeTab === 'lost' ? 'Last Seen:' : 'Found Date:'}</strong> {activeTab === 'lost' ? selectedPet.lastSeen : selectedPet.foundDate}</p>
                    <p><strong>Description:</strong> {selectedPet.description}</p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LostAndFound; 