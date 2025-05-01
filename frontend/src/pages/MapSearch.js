import React, { useState, useEffect, useRef } from 'react';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Link } from 'react-router-dom';

import '../styles/MapSearch.css';

import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { reportMarkers } from '../data/mapMarkers';

L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LocationMarker = () => {
  const [position, setPosition] = useState(null);
  const map = useMap();

  useEffect(() => {
    map.locate().on('locationfound', function (e) {
      setPosition(e.latlng);
      map.setView(e.latlng, 15);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position}>
      <Popup>You are here</Popup>
    </Marker>
  );
};


function MapSearch() {
  const markerRefs = useRef({}); 

  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  const [searchedAddress, setSearchedAddress] = useState('');
  const [mapCenter, setMapCenter] = useState([37.8715, -122.2730]);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  const [address, setAddress] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mapRef = useRef(null);


  const handleSearch = async () => {
    if (!address) return;
    setIsLoading(true);
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        setMapCenter([parseFloat(lat), parseFloat(lon)]);
        setSearchedAddress(address);
        if (mapRef.current) {
          mapRef.current.flyTo([parseFloat(lat), parseFloat(lon)], 15, {
            animate: true,
            duration: 1.5
          });
        }
  
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=[out:json];(node[amenity~\"veterinary|animal_shelter\"](around:1500,${lat},${lon}););out;`;
        const res = await fetch(overpassUrl);
        const json = await res.json();
        const places = json.elements.map(el => ({
          id: el.id,
          name: el.tags.name || 'Unnamed Location',
          lat: el.lat,
          lng: el.lon,
          type: el.tags.amenity || 'unknown'
        }));
        const placesWithReasons = await Promise.all(
          places.map(async (place) => ({
            ...place,
            reason: await generateReason(place.name, place.type)
          }))
        );
        placesWithReasons.forEach(place => {
          markerRefs.current[place.id] = React.createRef();
        });
        
        setNearbyPlaces(placesWithReasons);
      }
    } catch (err) {
      console.error('Error fetching geolocation or places:', err);
    } finally {
      setIsLoading(false);
    }
  };

  async function generateReason(placeName, type) {
    try {
      const addressText = `${placeName} (${type})`;
      const response = await fetch(
        'https://noggin.rea.gent/misty-bison-8251',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_3urloa8ck3b1o0p4twv53xwy3lhnqskms6ad_ngk',
          },
          body: JSON.stringify({
            address: addressText,
          }),
        }
      );
  
      const text = await response.text();
      return text || 'This location may help find your lost pet.';
    } catch (error) {
      console.error('Error generating reason:', error);
      return 'This location may help find your lost pet.';
    }
  }
  
  

  return (
    <div className="map-search">
      <div className="header">
        <h1>Map search</h1>
        <p>Utilize geolocation services to access shelters near you and high potential areas to search for your missing pet.</p>
      </div>

      <div className="search-section" style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <input
          type="text"
          placeholder="Enter last seen address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ padding: '10px', flex: 1 }}
        />
        <button 
          onClick={handleSearch} 
          style={{ padding: '10px 20px' }}
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search Nearby Places'}
        </button>
      </div>

      {isLoading && (
        <div style={{ 
          textAlign: 'center', 
          margin: '20px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div className="loading-spinner"></div>
          <p>Searching for nearby places...</p>
        </div>
      )}

      <div className="map-container-wrapper">

        <MapContainer 
          center={mapCenter} 
          zoom={14} 
          style={{ height: '700px', width: '900px' }}
          whenCreated={(mapInstance) => { mapRef.current = mapInstance; }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />
          <LocationMarker />
          {reportMarkers.map(marker => (
            <Marker key={marker.id} position={[marker.lat, marker.lng]}>
              <Popup>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {/*left */}
                  <img
                    src={marker.petImageUrl}
                    alt={marker.petName}
                    style={{ width: '60px', height: '60px', marginRight: '10px', borderRadius: '50%' }}
                  />

                  {/* right description */}
                  <div>
                    <strong>{marker.petName}</strong>
                    <br />
                    <span>{marker.petDescription}</span>
                    <br />
                    <Link to={`/lost-and-found#pet-${marker.petId}`}>View Lost Pet Info</Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

{nearbyPlaces.map(place => (
  <Marker
    key={place.id}
    position={[place.lat, place.lng]}
    ref={markerRefs.current[place.id]}
  >
    <Popup
      autoClose={false}
      closeOnClick={false}
    >
      <div>
        <strong>{place.name}</strong><br />
        Reason: {place.reason}
      </div>
    </Popup>
  </Marker>
))}


        </MapContainer>

        {searchedAddress && nearbyPlaces.length > 0 && (
  <div className="search-results" style={{ marginTop: '20px' }}>
    <h2>According to your search area "{searchedAddress}"，we find out: </h2>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {nearbyPlaces.map((place) => (
        <div
          key={place.id}
          onClick={() => {
            const markerRef = markerRefs.current[place.id];
            let markerLatLng = null; 
          
            if (markerRef && markerRef.current) {
              markerLatLng = markerRef.current.getLatLng();
            }
          
            if (mapRef.current && markerLatLng) { 
              mapRef.current.panTo(markerLatLng, {
                animate: true,
                duration: 1.0
              });
            }
          
            if (markerRef && markerRef.current) {
              markerRef.current.openPopup();
            }
          
            setSelectedPlaceId(place.id);
          }}
          
          style={{
            padding: '10px',
            border: '1px solid #ccc',
            borderRadius: '10px',
            backgroundColor: '#f9f9f9',
            cursor: 'pointer',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#e6f7ff'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f9f9f9'}
        >
          <strong>{place.name}</strong><br />
          Reason: {place.reason}
        </div>
      ))}
    </div>
  </div>
)}






      </div>

    </div>
  );
}

export default MapSearch; 