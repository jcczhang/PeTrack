import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AISearch.css';
import { Link } from 'react-router-dom';



function AISearch() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleSearch = async () => {
    if (!selectedImage) {
      alert('Please select an image first.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      setLoading(true);
      const response = await axios.post('http://127.0.0.1:5000/api/search-feature', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setMatches(response.data.matches);
    } catch (error) {
      console.error('Error searching:', error);
      alert('Failed to search. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-search">
      <div className="container">
        <h1>AI Search</h1>
        <p>Use our AI-powered search to find potential matches based on pet photos.</p>

        <div className="search-container">
          <input type="file" accept="image/*" onChange={handleImageChange} />
          <button onClick={handleSearch} disabled={loading}>
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>

        {matches.length > 0 && (
          <div className="lost-and-found">
            <h1>Matches Found</h1>
            <div className="pets-grid">
              {matches.length > 0 ? (
                matches.map((match, index) => (
                  <div key={index} className="pet-card">
                    <div className="pet-image">
                      {/* image need to update path */}
                      <img src={match.image || '/assets/images/placeholder.jpg'} alt={match.name} />
                    </div>
                    <div className="pet-info">
                      <h3>{match.name}</h3>
                      <p>{match.type} - {match.breed}</p>
                      <p>Similarity: {(match.similarity * 100).toFixed(1)}%</p>
                      <Link to={`/lost-pets/${match.id}`} className="btn btn-primary" style={{ marginTop: '10px' }}>
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <p style={{ textAlign: 'center', color: '#666' }}>No matches found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div >
  );
}

export default AISearch;
