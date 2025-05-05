import React, { useState } from 'react';
import '../styles/AISearch.css';
import { Link } from 'react-router-dom';
import { lostPets, foundPets } from '../data/petsData';

function AISearch() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSearch = () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    setLoading(true);
    
    // Simulate API delay
    setTimeout(() => {
      // Combine lost and found pets
      const allPets = [...lostPets, ...foundPets];
      
      // Generate random matches with similarity scores
      const randomMatches = allPets
        .sort(() => Math.random() - 0.5) // Randomize order
        .slice(0, 4) // Take first 4 pets
        .map(pet => ({
          ...pet,
          similarity: (Math.random() * 0.3 + 0.7).toFixed(2) // Random similarity between 0.7 and 1.0
        }))
        .sort((a, b) => b.similarity - a.similarity); // Sort by similarity

      setMatches(randomMatches);
      setLoading(false);
    }, 1500); // 1.5 second delay to simulate API call
  };

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
    <div className="ai-search">
      <div className="container">
        <h1>AI Search</h1>
        <p>Use our AI-powered search to find potential matches based on pet photos.</p>

        <div className="search-container">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {matches.length > 0 && (
          <div className="matches-section">
            <h2>Potential Matches</h2>
            <div className="pets-grid">
              {matches.map((match) => (
                <div key={match.id} className="pet-card">
                  <div className="pet-image">
                    <img src={match.image} alt={match.name} />
                  </div>
                  <div className="pet-info">
                    <div className="pet-header">
                      <span className={`status-badge ${match.lastSeen ? 'lost' : 'found'}`}>
                        {match.lastSeen ? 'Lost' : 'Found'}
                      </span>
                      <span className="pet-type">{match.type}</span>
                      <span className="pet-location">{match.location}</span>
                    </div>
                    <h3>{match.name}</h3>
                    <p className="similarity">Match Confidence: {(match.similarity * 100).toFixed(1)}%</p>
                    <div className="pet-actions">
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleContactClick(match)}
                      >
                        Contact
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={() => handleViewDetailsClick(match)}
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

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
                      <p><strong>{selectedPet.lastSeen ? 'Last Seen:' : 'Found Date:'}</strong> {selectedPet.lastSeen || selectedPet.foundDate}</p>
                      <p><strong>Description:</strong> {selectedPet.description}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AISearch;
