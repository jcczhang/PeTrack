import React, { useState } from 'react';
import '../styles/LostAndFound.css';
import { lostPets, foundPets } from '../data/petsData';
import { Link } from 'react-router-dom';

function LostAndFound() {
  const [activeTab, setActiveTab] = useState('lost'); // 'lost' or 'found'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPets = (activeTab === 'lost' ? lostPets : foundPets).filter(pet =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.breed.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pet.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

                <Link to={`/pet/${pet.id}`} className="btn btn-primary">
                  Contact Owner
                </Link>

                {/* <button className="btn btn-primary">Contact Owner</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LostAndFound; 