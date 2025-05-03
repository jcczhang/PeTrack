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
        <button onClick={() => navigate('/report-pet')} className="btn btn-primary">
          Create New Poster
        </button>
      </div>
    );
  }

  return (
    <div className="poster-preview">
      <div className="poster-header">
        <h1>LOST PET</h1>
        <h2>{formData.petName}</h2>
      </div>
      
      <div className="poster-content">
        <div className="poster-image">
          {formData.petImage ? (
            <img src={URL.createObjectURL(formData.petImage)} alt={formData.petName} />
          ) : (
            <div className="no-image">No Image Available</div>
          )}
        </div>
        
        <div className="poster-details">
          <div className="detail-row">
            <span className="label">Type:</span>
            <span className="value">{formData.petType}</span>
          </div>
          <div className="detail-row">
            <span className="label">Breed:</span>
            <span className="value">{formData.breed}</span>
          </div>
          <div className="detail-row">
            <span className="label">Color:</span>
            <span className="value">{formData.color}</span>
          </div>
          <div className="detail-row">
            <span className="label">Sex:</span>
            <span className="value">{formData.sex}</span>
          </div>
          <div className="detail-row">
            <span className="label">Weight:</span>
            <span className="value">{formData.weight} lbs</span>
          </div>
          <div className="detail-row">
            <span className="label">Last Seen:</span>
            <span className="value">{formData.lastSeenLocation}</span>
          </div>
          <div className="detail-row description">
            <span className="label">Description:</span>
            <span className="value">{formData.additionalDetails}</span>
          </div>
        </div>

        <div className="contact-block">
          <p>If found, please contact:</p>
          <p className="contact-info">{formData.contactInfo || '[Your Contact Information]'}</p>
        </div>
      </div>

      {/* <div className="poster-footer">
        <p>If found, please contact:</p>
        <p className="contact-info">{formData.contactInfo || '[Your Contact Information]'}</p>
      </div> */}
    </div>
  );
}

export default ClassicTemplate; 