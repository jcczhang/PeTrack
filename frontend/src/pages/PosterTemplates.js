import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/PosterTemplates.css';

function PosterTemplates() {
  const location = useLocation();
  const navigate = useNavigate();
  const formData = location.state?.formData;

  useEffect(() => {
    console.log('Location state:', location.state);
    console.log('Form data received:', formData);
  }, [location.state, formData]);

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
    console.error('No form data found in location state');
    return (
      <div className="error-message">
        <h2>No form data found</h2>
        <p>Please go back and fill out the form first.</p>
        <div className="navigation-buttons">
          <button onClick={() => navigate('/generate-poster')} className="btn btn-primary">
            Back to Form
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="templates-container">
      <h1>Choose a Poster Template</h1>
      <p className="subtitle">Select a template to preview your poster</p>
      
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
          onClick={() => navigate('/generate-poster')}
        >
          Back to Form
        </button>
      </div>
    </div>
  );
}

export default PosterTemplates; 