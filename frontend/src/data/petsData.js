import borderImage from '../assets/images/pets/border.jpg';
import calicoImage from '../assets/images/pets/calico.jpg';
import goldenRetrieverImage from '../assets/images/pets/max.jpg';
import ragdollImage from '../assets/images/pets/ragdoll.jpg';
import cockatielImage from '../assets/images/pets/cockatiel.jpg';
import germanShepherdImage from '../assets/images/pets/german.webp';
import persianImage from '../assets/images/pets/persian.jpg';
import rabbitImage from '../assets/images/pets/holland.webp';


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
  },
  {
    id: 5,
    name: 'Rocky',
    type: 'Dog',
    breed: 'German Shepherd',
    lastSeen: '2024-03-15',
    location: 'San Francisco, CA',
    image: germanShepherdImage,
    description: 'Large German Shepherd with black and tan coat, wearing a blue collar',
    coordinates: { lat: 37.7749, lng: -122.4194 },
    ownerName: 'Michael Chen',
    ownerPhone: '(555) 123-4567',
    ownerEmail: 'michael.chen@example.com',
    notes: 'Very friendly but may be scared of loud noises'
  },
  {
    id: 6,
    name: 'Milo',
    type: 'Cat',
    breed: 'Persian',
    lastSeen: '2024-03-18',
    location: 'San Jose, CA',
    image: persianImage,
    description: 'Long-haired Persian cat with white fur and blue eyes',
    coordinates: { lat: 37.3382, lng: -121.8863 },
    ownerName: 'Sarah Williams',
    ownerPhone: '(555) 456-7890',
    ownerEmail: 'sarah.williams@example.com',
    notes: 'Indoor cat, may be hiding nearby'
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
  },
  {
    id: 7,
    name: 'Unknown',
    type: 'Bird',
    breed: 'Cockatiel',
    foundDate: '2024-03-17',
    location: 'Oakland, CA',
    image: cockatielImage, // Using existing image as placeholder
    description: 'Yellow and white cockatiel with orange cheeks, found in a backyard',
    coordinates: { lat: 37.8044, lng: -122.2711 }
  },
  {
    id: 8,
    name: 'Unknown',
    type: 'Rabbit',
    breed: 'Holland Lop',
    foundDate: '2024-03-19',
    location: 'San Francisco, CA',
    image: rabbitImage, 
    description: 'Small brown and white rabbit with floppy ears, found in a garden',
    coordinates: { lat: 37.7749, lng: -122.4194 }
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