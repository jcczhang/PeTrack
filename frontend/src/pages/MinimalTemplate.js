import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/MinimalTemplate.css';

function MinimalTemplate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  if (!formData) {
    return (
      <div className="minimal-error-message">
        <h2>No poster data found</h2>
        <button onClick={() => navigate('/generate-poster')} className="btn minimal-btn-primary">
          Create New Poster
        </button>
      </div>
    );
  }

  return (
    <div className="minimal-poster">
      <div className="minimal-header">
        <h1 className="minimal-title">LOST PET</h1>
        <h2 className="minimal-subtitle">{formData.petName}</h2>
      </div>

      <div className="minimal-main-section">
        <div className="minimal-header-image">
          {formData.petImage ? (
            <img src={URL.createObjectURL(formData.petImage)} alt={formData.petName} />
          ) : (
            <div className="minimal-no-image">No Image Available</div>
          )}
        </div>

        <div className="minimal-pet-info">
          <div className="minimal-detail-grid">
            <div className="minimal-detail-item">
              <span className="minimal-detail-label">Type</span>
              <span className="minimal-detail-value">{formData.petType}</span>
            </div>
            <div className="minimal-detail-item">
              <span className="minimal-detail-label">Breed</span>
              <span className="minimal-detail-value">{formData.breed}</span>
            </div>
            <div className="minimal-detail-item">
              <span className="minimal-detail-label">Color</span>
              <span className="minimal-detail-value">{formData.color}</span>
            </div>
            <div className="minimal-detail-item">
              <span className="minimal-detail-label">Sex</span>
              <span className="minimal-detail-value">{formData.sex}</span>
            </div>
            <div className="minimal-detail-item">
              <span className="minimal-detail-label">Weight</span>
              <span className="minimal-detail-value">{formData.weight} lbs</span>
            </div>
            <div className="minimal-detail-item">
              <span className="minimal-detail-label">Last Seen</span>
              <span className="minimal-detail-value">{formData.lastSeenLocation}</span>
            </div>
          </div>

          <div className="minimal-description-section">
            <h3>Description</h3>
            <p>{formData.additionalDetails}</p>
          </div>
        </div>
      </div>

      <div className="minimal-contact-section">
        <p className="minimal-contact-info">
          <strong>If Found, Please Contact:</strong><br />
          {formData.contactInfo || '[Your Contact Information]'}
        </p>
      </div>
    </div>
  );
}

export default MinimalTemplate;
