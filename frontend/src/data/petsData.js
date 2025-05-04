import borderImage from '../assets/images/pets/border.jpg';
import calicoImage from '../assets/images/pets/calico.jpg';
import goldenRetrieverImage from '../assets/images/pets/max.jpg';
import ragdollImage from '../assets/images/pets/ragdoll.jpg';

export const lostPets = [
  {
    id: 1,
    name: 'Max',
    type: 'Dog',
    breed: 'Golden Retriever',
    lastSeen: '2023-05-15',
    location: 'Berkeley, CA',
    image: goldenRetrieverImage,
    description: 'Friendly golden retriever with red collar',
    coordinates: { lat: 37.8719, lng: -122.2585 },
    ownerName: 'Alice Johnson',
    ownerPhone: '(555) 234-5678',
    ownerEmail: 'alice.johnson@example.com',
    notes: 'Available all day'
  },
  {
    id: 2,
    name: 'Luna',
    type: 'Cat',
    breed: 'Ragdoll',
    lastSeen: '2023-05-10',
    location: 'Oakland, CA',
    image: ragdollImage,
    description: 'Blue-eyed siamese with distinctive markings',
    coordinates: { lat: 37.8044, lng: -122.2711 },
    ownerName: 'Bob Smith',
    ownerPhone: '(555) 987-6543',
    ownerEmail: 'bob.smith@example.com',
    notes: 'Best time to call: evenings'
  }
];

export const foundPets = [
  {
    id: 3,
    name: 'Unknown',
    type: 'Dog',
    breed: 'Border Collie',
    foundDate: '2023-05-12',
    location: 'San Francisco, CA',
    image: borderImage,
    description: 'Friendly black lab found near Golden Gate Park',
    coordinates: { lat: 37.7749, lng: -122.4194 }
  },
  {
    id: 4,
    name: 'Unknown',
    type: 'Cat',
    breed: 'Calico',
    foundDate: '2023-05-14',
    location: 'Berkeley, CA',
    image: calicoImage,
    description: 'Orange tabby with white paws',
    coordinates: { lat: 37.8719, lng: -122.2585 }
  }
];

export const petTypes = [
  'Dog',
  'Cat',
  'Bird',
  'Rabbit',
  'Hamster',
  'Guinea Pig',
  'Turtle',
  'Other'
];

export const commonBreeds = {
  Dog: [
    'Labrador Retriever',
    'German Shepherd',
    'Golden Retriever',
    'Bulldog',
    'Beagle',
    'Poodle',
    'Husky',
    'Other'
  ],
  Cat: [
    'Siamese',
    'Persian',
    'Maine Coon',
    'Ragdoll',
    'Bengal',
    'Sphynx',
    'Tabby',
    'Other'
  ]
};

// Function to add a new lost pet
export const addLostPet = (newPet) => {
  const newId = Math.max(...lostPets.map(pet => pet.id)) + 1;
  const petWithId = {
    ...newPet,
    id: newId,
    coordinates: { lat: 37.7749, lng: -122.4194 } // Default to SF coordinates, can be updated later
  };
  lostPets.push(petWithId);
  return petWithId;
};

// Function to add a new found pet
export const addFoundPet = (newPet) => {
  const newId = Math.max(...foundPets.map(pet => pet.id)) + 1;
  const petWithId = {
    ...newPet,
    id: newId,
    coordinates: { lat: 37.7749, lng: -122.4194 } // Default to SF coordinates, can be updated later
  };
  foundPets.push(petWithId);
  return petWithId;
}; 