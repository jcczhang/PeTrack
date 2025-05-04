import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/ClassicTemplate.css';

function ClassicTemplate() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};

  if (!formData) {
    return (
      <div className="error-message">
        <h2>No poster data found</h2>
        <button onClick={() => navigate('/generate-poster')} className="btn classic-btn-primary">
          Create New Poster
        </button>
      </div>
    );
  }

  return (
    <div className="classic-poster">
      <div className="classic-header">
        <div className="classic-header-content">
          <h1>LOST PET</h1>
          <h2>{formData.petName}</h2>
        </div>
        <div className="classic-header-image">
          {formData.petImage ? (
            <img src={URL.createObjectURL(formData.petImage)} alt={formData.petName} />
          ) : (
            <div className="classic-no-image">No Image Available</div>
          )}
        </div>
      </div>

      <div className="classic-content">
        <div className="classic-pet-details">
          <div className="classic-detail-grid">
            <div className="classic-detail-item">
              <span className="classic-detail-label">Type</span>
              <span className="classic-detail-value">{formData.petType}</span>
            </div>
            <div className="classic-detail-item">
              <span className="classic-detail-label">Breed</span>
              <span className="classic-detail-value">{formData.breed}</span>
            </div>
            <div className="classic-detail-item">
              <span className="classic-detail-label">Color</span>
              <span className="classic-detail-value">{formData.color}</span>
            </div>
            <div className="classic-detail-item">
              <span className="classic-detail-label">Sex</span>
              <span className="classic-detail-value">{formData.sex}</span>
            </div>
            <div className="classic-detail-item">
              <span className="classic-detail-label">Weight</span>
              <span className="classic-detail-value">{formData.weight} lbs</span>
            </div>
            <div className="classic-detail-item">
              <span className="classic-detail-label">Last Seen</span>
              <span className="classic-detail-value">{formData.lastSeenLocation}</span>
            </div>
          </div>

          <div className="classic-description-section">
            <h3>Description</h3>
            <p>{formData.additionalDetails}</p>
          </div>
        </div>

        <div className="classic-contact-section">
          <div className="classic-contact-card">
            <h3>If Found, Please Contact</h3>
            <p className="classic-contact-info">{formData.contactInfo || '[Your Contact Information]'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ClassicTemplate;
