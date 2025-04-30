import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './PosterTemplates.css';

function PosterTemplates() {
  const navigate = useNavigate();
  const location = useLocation();
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
    // Navigate to a preview page with the selected template and form data
    navigate('/preview-poster', { 
      state: { 
        templateId,
        formData 
      }
    });
  };

  return (
    <div className="templates-page">
      <div className="container">
        <h1>Choose a Poster Template</h1>
        <p className="subtitle">Select a design that best suits your needs</p>
        
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
    </div>
  );
}

export default PosterTemplates; 