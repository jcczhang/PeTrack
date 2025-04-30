import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ReportPet.css';
import { addLostPet, addFoundPet } from '../data/petsData';

function ReportPet() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Status and Location
    status: 'lost', // 'lost' or 'found'
    location: '',
    date: '',
    
    // Step 2: Pet Description
    petName: '',
    petType: '',
    breed: '',
    sex: '',
    color: '',
    weight: '',
    description: '',
    
    // Step 3: Photos
    photos: []
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photos') {
      setFormData(prev => ({ ...prev, photos: Array.from(files) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create a new pet object
    const newPet = {
      name: formData.petName,
      type: formData.petType,
      breed: formData.breed,
      location: formData.location,
      description: formData.description,
      image: formData.photos[0] ? URL.createObjectURL(formData.photos[0]) : '/sample-pets/default.jpg',
      ...(formData.status === 'lost' 
        ? { lastSeen: formData.date }
        : { foundDate: formData.date }
      )
    };

    // Add the pet to the appropriate list
    if (formData.status === 'lost') {
      addLostPet(newPet);
      // For lost pets, navigate to poster templates with the form data
      navigate('/poster-templates', { 
        state: { 
          formData: {
            petName: formData.petName,
            petType: formData.petType,
            breed: formData.breed,
            sex: formData.sex,
            color: formData.color,
            weight: formData.weight,
            lastSeenLocation: formData.location,
            additionalDetails: formData.description,
            petImage: formData.photos[0]
          }
        }
      });
    } else {
      addFoundPet(newPet);
      // For found pets, just go to lost and found page
      navigate('/lost-and-found');
    }
  };

  const nextStep = () => {
    setStep(prev => prev + 1);
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Step 1: Status and Location</h2>
            <div className="form-group">
              <label>Status</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="lost"
                    checked={formData.status === 'lost'}
                    onChange={handleChange}
                  />
                  Lost Pet
                </label>
                <label>
                  <input
                    type="radio"
                    name="status"
                    value="found"
                    checked={formData.status === 'found'}
                    onChange={handleChange}
                  />
                  Found Pet
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Where was the pet last seen/found?"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2>Step 2: Pet Description</h2>
            <div className="form-group">
              <label htmlFor="petName">Pet's Name</label>
              <input
                type="text"
                id="petName"
                name="petName"
                value={formData.petName}
                onChange={handleChange}
                placeholder="If known"
              />
            </div>

            <div className="form-group">
              <label htmlFor="petType">Type of Pet</label>
              <input
                type="text"
                id="petType"
                name="petType"
                value={formData.petType}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="breed">Breed</label>
              <input
                type="text"
                id="breed"
                name="breed"
                value={formData.breed}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="sex">Sex</label>
              <select
                id="sex"
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight (lbs)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Additional Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Any distinguishing features, behavior, or other important information"
                rows="4"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h2>Step 3: Upload Photos</h2>
            <div className="form-group">
              <label htmlFor="photos">Pet Photos</label>
              <input
                type="file"
                id="photos"
                name="photos"
                onChange={handleChange}
                multiple
                accept="image/*"
                required
              />
              <p className="help-text">Upload multiple photos from different angles</p>
            </div>

            {formData.photos.length > 0 && (
              <div className="photo-preview">
                {formData.photos.map((photo, index) => (
                  <div key={index} className="preview-item">
                    <img src={URL.createObjectURL(photo)} alt={`Preview ${index + 1}`} />
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="report-pet">
      <div className="container">
        <h1>Report {formData.status === 'lost' ? 'Lost' : 'Found'} Pet</h1>
        
        <div className="progress-bar">
          <div className="progress-step" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <form onSubmit={handleSubmit} className="report-form">
          {renderStep()}

          <div className="form-actions">
            {step > 1 && (
              <button type="button" className="btn btn-secondary" onClick={prevStep}>
                Previous
              </button>
            )}
            {step < 3 ? (
              <button type="button" className="btn btn-primary" onClick={nextStep}>
                Next
              </button>
            ) : (
              <button type="submit" className="btn btn-primary">
                Submit Report
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReportPet; 