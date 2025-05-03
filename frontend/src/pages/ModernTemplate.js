import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ModernTemplate.css';

function ModernTemplate() {
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
    <div className="modern-poster">
      <div className="modern-header">
        <div className="header-content">
          <h1>LOST PET</h1>
          <h2>{formData.petName}</h2>
        </div>
        <div className="header-image">
          {formData.petImage ? (
            <img src={URL.createObjectURL(formData.petImage)} alt={formData.petName} />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>
      </div>

      <div className="modern-content">
        <div className="pet-details">
          <div className="detail-grid">
            <div className="detail-item">
              <span className="detail-label">Type</span>
              <span className="detail-value">{formData.petType}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Breed</span>
              <span className="detail-value">{formData.breed}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Color</span>
              <span className="detail-value">{formData.color}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Sex</span>
              <span className="detail-value">{formData.sex}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Weight</span>
              <span className="detail-value">{formData.weight} lbs</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Last Seen</span>
              <span className="detail-value">{formData.lastSeenLocation}</span>
            </div>
          </div>

          <div className="description-section">
            <h3>Description</h3>
            <p>{formData.additionalDetails}</p>
          </div>
        </div>

        <div className="contact-section">
          <div className="contact-card">
            <h3>If Found, Please Contact</h3>
            <p className="contact-info">{formData.contactInfo || '[Your Contact Information]'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModernTemplate; 