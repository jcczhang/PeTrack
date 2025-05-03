import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ClassicTemplate from './ClassicTemplate';
import ModernTemplate from './ModernTemplate';
import '../styles/PreviewPoster.css';

function PreviewPoster() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, templateId } = location.state || {};

  const handlePrint = () => {
    window.print();
  };

  const handleBackToTemplates = () => {
    navigate('/poster-templates', { state: { formData } });
  };

  if (!formData) {
    return (
      <div className="error-message">
        <h2>No poster data found</h2>
        <button onClick={() => navigate('/generate-poster')} className="btn btn-primary">
          Create New Poster
        </button>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (templateId) {
      case 1:
        return <ClassicTemplate formData={formData} />;
      case 2:
        return <ModernTemplate formData={formData} />;
      default:
        return <ClassicTemplate formData={formData} />;
    }
  };

  return (
    <div className="preview-container">
      <div className="preview-content">
        {renderTemplate()}
      </div>

      <div className="preview-controls">
        <button onClick={handleBackToTemplates} className="btn btn-secondary">
          Back to Templates
        </button>
        <button onClick={handlePrint} className="btn btn-primary">
          Print Poster
        </button>
      </div>
    </div>
  );
}

export default PreviewPoster;