import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { lostPets, foundPets } from '../data/petsData';


function LostPetDetail() {
  const { id } = useParams();
  const petId = parseInt(id, 10);

  const pet = lostPets.concat(foundPets).find(p => p.id === petId);

  if (!pet) {
    return (
      <div className="container">
        <h2>Pet Not Found</h2>
        <Link to="/lost-and-found">← Back to Lost and Found</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{pet.name}</h1>
      <img src={pet.image} alt={pet.name} style={{ maxWidth: '400px', borderRadius: '10px' }} />
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Location:</strong> {pet.location}</p>
      <p><strong>Description:</strong> {pet.description}</p>
      <p><strong>Last Seen / Found Date:</strong> {pet.lastSeen || pet.foundDate}</p>

      <Link to="/lost-and-found">
        <button className="btn btn-primary">← Back to Lost and Found</button>
      </Link>
    </div>
  );
}

export default LostPetDetail;
