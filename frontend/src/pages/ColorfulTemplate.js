import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ColorfulTemplate.css';

function ColorfulTemplate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  if (!formData) {
    return (
      <div className="error-message">
        <h2>No poster data found</h2>
        <button onClick={() => navigate('/report-pet')} className="btn btn-primary">
          Create New Poster
        </button>
      </div>
    );
  }

  return (
    <div className="colorful-poster">
      <div className="animated-background">
        
      </div>

      <div className="vibrant-header">
        <h1 className="alert-text">LOST PET</h1>
        <div className="pet-name-container">
          <h2 className="pet-name">{formData.petName}</h2>
        </div>
      </div>

      {/* Colorful image section with border */}
      <div className="image-section">
        {formData.petImage ? (
          <img 
            src={URL.createObjectURL(formData.petImage)} 
            alt={formData.petName} 
            className="pet-image" 
          />
        ) : (
          <div className="no-image">
            <span>No Image Available</span>
          </div>
        )}
      </div>

      {/* Pet details in colorful cards */}
      <div className="pet-details-grid">
        <div className="detail-card type-card">
          <div className="card-label">Type</div>
          <div className="card-value">{formData.petType}</div>
        </div>
        <div className="detail-card breed-card">
          <div className="card-label">Breed</div>
          <div className="card-value">{formData.breed}</div>
        </div>
        <div className="detail-card color-card">
          <div className="card-label">Color</div>
          <div className="card-value">{formData.color}</div>
        </div>
        <div className="detail-card sex-card">
          <div className="card-label">Sex</div>
          <div className="card-value">{formData.sex}</div>
        </div>
        <div className="detail-card weight-card">
          <div className="card-label">Weight</div>
          <div className="card-value">{formData.weight} lbs</div>
        </div>
        <div className="detail-card location-card">
          <div className="card-label">Last Seen</div>
          <div className="card-value">{formData.lastSeenLocation}</div>
        </div>
      </div>

      {/* Description section with highlight */}
      <div className="description-container">
        <h3 className="description-title">Description</h3>
        <div className="description-content">
          <p>{formData.additionalDetails}</p>
        </div>
      </div>

      {/* Attention-grabbing contact section */}
      <div className="contact-container">
        <div className="contact-highlight">
          <h3 className="contact-title">REWARD FOR SAFE RETURN!</h3>
          <div className="contact-details">
            <p>If Found, Please Contact:</p>
            <p className="contact-info">{formData.contactInfo || '[Your Contact Information]'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ColorfulTemplate;