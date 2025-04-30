import React, { useState } from 'react';
import './LostAndFound.css';

function LostAndFound() {
  const [activeTab, setActiveTab] = useState('lost'); // 'lost' or 'found'
  const [searchTerm, setSearchTerm] = useState('');

  // Sample data - replace with actual data from your backend
  const lostPets = [
    {
      id: 1,
      name: 'Max',
      type: 'Dog',
      breed: 'Golden Retriever',
      lastSeen: '2023-05-15',
      location: 'Berkeley, CA',
      image: '/sample-pets/dog1.jpg',
      description: 'Friendly golden retriever with red collar'
    },
    {
      id: 2,
      name: 'Luna',
      type: 'Cat',
      breed: 'Siamese',
      lastSeen: '2023-05-10',
      location: 'Oakland, CA',
      image: '/sample-pets/cat1.jpg',
      description: 'Blue-eyed siamese with distinctive markings'
    }
  ];

  const foundPets = [
    {
      id: 3,
      name: 'Unknown',
      type: 'Dog',
      breed: 'Labrador',
      foundDate: '2023-05-12',
      location: 'San Francisco, CA',
      image: '/sample-pets/dog2.jpg',
      description: 'Friendly black lab found near Golden Gate Park'
    },
    {
      id: 4,
      name: 'Unknown',
      type: 'Cat',
      breed: 'Tabby',
      foundDate: '2023-05-14',
      location: 'Berkeley, CA',
      image: '/sample-pets/cat2.jpg',
      description: 'Orange tabby with white paws'
    }
  ];

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
            <div key={pet.id} className="pet-card">
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
                <button className="btn btn-primary">Contact Owner</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LostAndFound; 