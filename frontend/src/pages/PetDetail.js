import React from 'react';
import { useParams } from 'react-router-dom';
import { lostPets, foundPets } from '../data/petsData';

function PetDetail() {
  const { id } = useParams(); 
  const pet = [...lostPets, ...foundPets].find(pet => pet.id === parseInt(id));

  if (!pet) {
    return <div>Pet not found!</div>;
  }

  return (
    <div className="pet-detail">
      <h1>{pet.name}</h1>
      <img src={pet.image} alt={pet.name} />
      <p><strong>Type:</strong> {pet.type}</p>
      <p><strong>Breed:</strong> {pet.breed}</p>
      <p><strong>Location:</strong> {pet.location}</p>
      <p><strong>{pet.lastSeen ? 'Last Seen:' : 'Found Date:'}</strong> {pet.lastSeen || pet.foundDate}</p>
      <p>{pet.description}</p>
      <button className="btn btn-primary">Contact Owner</button>
    </div>
  );
}

export default PetDetail;
