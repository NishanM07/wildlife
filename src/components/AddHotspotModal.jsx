import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import { X, MapPin, Navigation } from 'lucide-react';

const AddHotspotModal = ({ isOpen, onClose }) => {
  const { animals, addHotspot } = useSanctuary();
  const [formData, setFormData] = useState({
    animalId: animals[0]?.id || '',
    name: '',
    description: '',
    latitude: '',
    longitude: '',
    bestTimeToVisit: ''
  });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setIsLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData(prev => ({
          ...prev,
          latitude: position.coords.latitude.toFixed(6),
          longitude: position.coords.longitude.toFixed(6)
        }));
        setIsLoadingLocation(false);
      },
      (error) => {
        alert('Unable to retrieve your location');
        setIsLoadingLocation(false);
      }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addHotspot({
      ...formData,
      latitude: parseFloat(formData.latitude),
      longitude: parseFloat(formData.longitude)
    });
    onClose();
    // Reset form
    setFormData({
      animalId: animals[0]?.id || '',
      name: '',
      description: '',
      latitude: '',
      longitude: '',
      bestTimeToVisit: ''
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content glass-panel" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div style={{ marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <MapPin color="var(--primary-light)" size={28} />
          <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Add New Hotspot</h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Select Subject</label>
            <select 
              name="animalId" 
              className="form-input" 
              value={formData.animalId}
              onChange={handleChange}
              required
              style={{ appearance: 'none', backgroundColor: 'rgba(255,255,255,0.05)' }}
            >
              {animals.map(a => (
                <option key={a.id} value={a.id} style={{ color: 'black' }}>
                  {a.name} ({a.category})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Location Name</label>
            <input 
              type="text" 
              name="name"
              className="form-input" 
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Bandhavgarh National Park"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea 
              name="description"
              className="form-input" 
              value={formData.description}
              onChange={handleChange}
              rows="2"
              placeholder="Short description of this hotspot..."
              required
            />
          </div>

          <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label" style={{ marginBottom: 0 }}>Coordinates</label>
            <button 
              type="button" 
              className="btn btn-outline" 
              onClick={handleGetCurrentLocation}
              disabled={isLoadingLocation}
              style={{ padding: '0.25rem 0.75rem', fontSize: '0.85rem' }}
            >
              <Navigation size={14} style={{ marginRight: '0.25rem' }} /> 
              {isLoadingLocation ? 'Locating...' : 'Take Current Location'}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <input 
                type="number" 
                step="any"
                name="latitude"
                className="form-input" 
                value={formData.latitude}
                onChange={handleChange}
                placeholder="Latitude (e.g. 23.69)"
                required
              />
            </div>
            <div className="form-group">
              <input 
                type="number" 
                step="any"
                name="longitude"
                className="form-input" 
                value={formData.longitude}
                onChange={handleChange}
                placeholder="Longitude (e.g. 81.02)"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Best Time to Visit</label>
            <input 
              type="text" 
              name="bestTimeToVisit"
              className="form-input" 
              value={formData.bestTimeToVisit}
              onChange={handleChange}
              placeholder="e.g. October to March"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '0.5rem' }}>
            Save Hotspot
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHotspotModal;
