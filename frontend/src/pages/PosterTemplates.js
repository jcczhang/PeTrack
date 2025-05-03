import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PosterTemplates.css';

function PosterTemplates() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  const templates = [
    {
      id: 1,
      name: 'Classic',
      preview: '/templates/classic.png',
      description: 'Clean and professional design with focus on pet photo'
    },
    {
      id: 2,
      name: 'Modern',
      preview: '/templates/modern.png',
      description: 'Contemporary layout with emphasis on key information'
    },
    {
      id: 3,
      name: 'Colorful',
      preview: '/templates/colorful.png',
      description: 'Vibrant design to catch attention'
    },
    {
      id: 4,
      name: 'Minimal',
      preview: '/templates/minimal.png',
      description: 'Simple and elegant layout'
    }
  ];

  const handleTemplateSelect = (templateId) => {
    if (!formData) {
      console.error('No form data available');
      return;
    }
    navigate('/preview-poster', { state: { formData, templateId } });
  };

  if (!formData) {
    return (
      <div className="error-message">
        <h2>No form data found</h2>
        <button onClick={() => navigate('/report-pet')} className="btn btn-primary">
          Create New Report
        </button>
      </div>
    );
  }

  return (
    <div className="templates-container">
      <h1>Choose a Poster Template</h1>
      <div className="templates-grid">
        {templates.map(template => (
          <div
            key={template.id}
            className="template-card"
            onClick={() => handleTemplateSelect(template.id)}
          >
            <div className="template-preview">
              <img src={template.preview} alt={`${template.name} template`} />
            </div>
            <div className="template-info">
              <h3>{template.name}</h3>
              <p>{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="navigation-buttons">
        <button 
          className="btn btn-secondary"
          onClick={() => navigate('/lost-and-found')}
        >
          Back to Lost & Found
        </button>
      </div>
    </div>
  );
}

export default PosterTemplates; 