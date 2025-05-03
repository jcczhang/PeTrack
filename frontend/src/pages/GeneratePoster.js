import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/GeneratePoster.css';

function GeneratePoster() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    petName: '',
    petType: '',
    breed: '',
    sex: '',
    weight: '',
    color: '',
    contactInfo: '',
    lastSeenLocation: '',
    additionalDetails: '',
    petImage: null
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'petImage') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleAIAnalysis = async () => {
    if (!formData.petImage) {
      alert('Please upload a photo first');
      return;
    }

    setIsAnalyzing(true);
    try {
      // Here you would typically call your AI service
      // For now, we'll simulate the AI analysis with a timeout
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulated AI results
      const aiResults = {
        petType: 'Dog',
        breed: 'Golden Retriever',
        color: 'Golden',
        sex: 'male',
        weight: '65'
      };

      setFormData(prev => ({
        ...prev,
        ...aiResults
      }));

      alert('AI analysis complete! Form has been filled with detected information.');
    } catch (error) {
      alert('Error analyzing image. Please try again or fill in the form manually.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/poster-templates', { state: { formData } });
  };

  return (
    <div className="generate-poster">
      <div className="container">
        <h1>Generate Lost Pet Poster</h1>
        <form onSubmit={handleSubmit} className="poster-form">
          <div className="photo-upload-section">
            <div className="form-group">
              <label htmlFor="petImage">Pet Photo</label>
              <input
                type="file"
                id="petImage"
                name="petImage"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>
            <button 
              type="button" 
              className="btn btn-ai"
              onClick={handleAIAnalysis}
              disabled={isAnalyzing || !formData.petImage}
            >
              {isAnalyzing ? (
                <span>Analyzing...</span>
              ) : (
                <>
                  <i className="fas fa-robot"></i>
                  <span>AI Analysis</span>
                </>
              )}
            </button>
          </div>

          <div className="form-group">
            <label htmlFor="petName">Pet's Name</label>
            <input
              type="text"
              id="petName"
              name="petName"
              value={formData.petName}
              onChange={handleChange}
              required
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
            <label htmlFor="weight">Weight (lbs)</label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              required
            />
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
            <label htmlFor="lastSeenLocation">Last Seen Location</label>
            <input
              type="text"
              id="lastSeenLocation"
              name="lastSeenLocation"
              value={formData.lastSeenLocation}
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
            <label htmlFor="additionalDetails">Additional Details</label>
            <textarea
              id="additionalDetails"
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Any distinguishing features or other important information"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/')}>Cancel</button>
            <button type="submit" className="btn btn-primary">Generate Poster</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default GeneratePoster; 