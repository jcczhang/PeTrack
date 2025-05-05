import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPaw, FaSearch } from 'react-icons/fa';
import '../styles/ReportPet.css';
import { addLostPet, addFoundPet } from '../data/petsData';

function ReportPet() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Status and Location
    status: 'lost', // 'lost' or 'found'
    location: '',
    date: '',
    
    // Step 2: Pet Description and Photos
    petName: '',
    petType: '',
    breed: '',
    sex: '',
    color: '',
    weight: '',
    description: '',
    photos: [],
    
    // Step 3: Contact Information
    ownerName: '',
    contactInfo: '',
    contactNotes: ''
  });

  const [aiAnalysis, setAiAnalysis] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photos') {
      // Keep existing photos and add new ones
      setFormData(prev => ({ 
        ...prev, 
        photos: [...prev.photos, ...Array.from(files)] 
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const removePhoto = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleAiAnalysis = async () => {
    if (formData.photos.length === 0) return;
    
    // Show loading state
    setAiAnalysis('analyzing');
    
    try {
      // Convert image file to base64
      const reader = new FileReader();
      const base64Promise = new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
      reader.readAsDataURL(formData.photos[0]); // Using the first photo
      const base64Image = await base64Promise;

      const response = await fetch(
        'https://noggin.rea.gent/abundant-ox-1661',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${process.env.REACT_APP_NOGGIN_AI}`,
          },
          body: JSON.stringify({
            picture: base64Image,
          }),
        }
      ).then(response => response.json());
      
      const aiResults = response;
      
      // Auto-fill form fields based on AI analysis
      setFormData(prev => ({
        ...prev,
        petType: aiResults.petType || prev.petType,
        breed: aiResults.breed || prev.breed,
        color: aiResults.color || prev.color,
        description: aiResults.additionalDetails || prev.description
      }));
      
      setAiAnalysis('complete');
      alert('AI analysis complete! Form has been filled with detected information.');
    } catch (error) {
      setAiAnalysis('error');
      console.error('AI analysis failed:', error);
      alert('Failed to analyze image. Please try again.');
    }
  };

  const nextStep = (e) => {
    e.preventDefault();
    const form = e.target.closest('form');
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    // Set default value for petName if empty
    if (step === 2 && !formData.petName.trim()) {
      setFormData(prev => ({
        ...prev,
        petName: 'UNKNOWN'
      }));
    }

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.reportValidity();
        isValid = false;
      }
    });

    if (isValid) {
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.reportValidity();
        isValid = false;
      }
    });

    if (isValid) {
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
      } else {
        addFoundPet(newPet);
      }
      
      setShowSuccess(true);
    }
  };

  const handleGeneratePoster = () => {
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
          petImage: formData.photos[0],
          contactInfo: formData.contactInfo
        }
      }
    });
  };

  const handleReturnToList = () => {
    navigate('/lost-and-found');
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Step 1: Status and Location</h2>
            <div className="form-group">
              <label>Status</label>
              <div className="status-options">
                <label className={`status-option ${formData.status === 'lost' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="lost"
                    checked={formData.status === 'lost'}
                    onChange={handleChange}
                    className="visually-hidden"
                  />
                  <div className="status-content">
                    <FaPaw className="status-icon" />
                    <span>Lost Pet</span>
                    <p>Report a pet that has gone missing</p>
                  </div>
                </label>
                <label className={`status-option ${formData.status === 'found' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="status"
                    value="found"
                    checked={formData.status === 'found'}
                    onChange={handleChange}
                    className="visually-hidden"
                  />
                  <div className="status-content">
                    <FaSearch className="status-icon" />
                    <span>Found Pet</span>
                    <p>Report a pet you have found</p>
                  </div>
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
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2>Step 2: Pet Description</h2>
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
              <>
                <div className="photo-preview">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="preview-item">
                      <img src={URL.createObjectURL(photo)} alt={`Preview ${index + 1}`} />
                      <button 
                        className="remove-photo" 
                        onClick={() => removePhoto(index)}
                        aria-label="Remove photo"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="ai-analysis-section">
                  <button 
                    className="btn btn-ai" 
                    onClick={handleAiAnalysis}
                    disabled={aiAnalysis === 'analyzing'}
                  >
                    {aiAnalysis === 'analyzing' ? 'Analyzing...' : 'Analyze Photos with AI'}
                  </button>

                  {aiAnalysis === 'error' && (
                    <div className="ai-error">
                      Failed to analyze photos. Please try again.
                    </div>
                  )}
                </div>
              </>
            )}

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
            <h2>Step 3: Contact Information</h2>
            <div className="form-group">
              <label htmlFor="ownerName">Your Name</label>
              <input
                type="text"
                id="ownerName"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactInfo">Contact Information</label>
              <input
                type="text"
                id="contactInfo"
                name="contactInfo"
                value={formData.contactInfo}
                onChange={handleChange}
                required
                placeholder="Phone number or email"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contactNotes">Additional Contact Notes</label>
              <textarea
                id="contactNotes"
                name="contactNotes"
                value={formData.contactNotes}
                onChange={handleChange}
                placeholder="Best time to contact, preferred contact method, etc."
                rows="4"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (showSuccess) {
    return (
      <div className="report-pet">
        <div className="container">
          <div className="success-message">
            <h2>Report Successfully Listed!</h2>
            <p>Your {formData.status === 'lost' ? 'lost' : 'found'} pet report has been successfully listed.</p>
            
            <div className="success-actions">
              <button 
                className="btn btn-primary" 
                onClick={handleGeneratePoster}
              >
                Generate Poster
              </button>
              <button 
                className="btn btn-secondary" 
                onClick={handleReturnToList}
              >
                Return to List
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="report-pet">
      <div className="container">
        <h1>Report {formData.status === 'lost' ? 'Lost' : 'Found'} Pet</h1>
        
        <div className="progress-bar">
          <div className="progress-step" style={{ width: `${(step / 3) * 100}%` }}></div>
        </div>

        <form onSubmit={handleSubmit} className="report-form" noValidate>
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