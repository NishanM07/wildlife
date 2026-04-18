import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';
import { ArrowLeft, MapPin, Calendar, Compass, ExternalLink, Trash2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const RecenterAutomatically = ({ lat, lng }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lng]);
  }, [lat, lng, map]);
  return null;
};

const AnimalHotspots = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { animals, hotspots, isAdmin, deleteHotspot } = useSanctuary();
  
  const animal = animals.find(a => a.id === id);
  const animalHotspots = hotspots.filter(h => h.animalId === id);
  
  const [selectedHotspot, setSelectedHotspot] = useState(
    animalHotspots.length > 0 ? animalHotspots[0] : null
  );

  useEffect(() => {
    // If the selected hotspot was deleted, select the first available or null
    if (selectedHotspot && !animalHotspots.find(h => h.id === selectedHotspot.id)) {
      setSelectedHotspot(animalHotspots.length > 0 ? animalHotspots[0] : null);
    }
  }, [animalHotspots, selectedHotspot]);

  if (!animal) {
    return <div style={{ padding: '2rem', textAlign: 'center' }}>Subject not found.</div>;
  }

  const openGoogleMaps = (lat, lng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
    window.open(url, '_blank');
  };

  const handleDelete = (e, hotspotId) => {
    e.stopPropagation(); // Prevent card selection
    if (window.confirm("Are you sure you want to delete this hotspot?")) {
      deleteHotspot(hotspotId);
      if (selectedHotspot?.id === hotspotId) {
        setSelectedHotspot(null);
      }
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button 
          onClick={() => navigate('/')}
          className="btn btn-outline"
          style={{ padding: '0.5rem 1rem' }}
        >
          <ArrowLeft size={18} /> Back
        </button>
        <div>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>{animal.name} Hotspots</h1>
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Select a location to view on map</p>
        </div>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 2fr', 
        gap: '2rem',
        flex: 1,
        minHeight: '600px'
      }}>
        {/* Sidebar List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {animalHotspots.length === 0 ? (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
              <Compass size={48} color="var(--text-secondary)" style={{ margin: '0 auto 1rem' }} />
              <h3>No hotspots found</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Return home to add a new hotspot for this subject.</p>
            </div>
          ) : (
            animalHotspots.map(hotspot => (
              <div 
                key={hotspot.id}
                className="glass-panel"
                onClick={() => setSelectedHotspot(hotspot)}
                style={{
                  padding: '1.5rem',
                  cursor: 'pointer',
                  border: selectedHotspot?.id === hotspot.id ? '1px solid var(--primary-light)' : '1px solid var(--surface-border)',
                  backgroundColor: selectedHotspot?.id === hotspot.id ? 'rgba(64, 145, 108, 0.2)' : 'var(--surface-color)',
                  transition: 'var(--transition-fast)',
                  position: 'relative' // For absolute positioning of delete button
                }}
              >
                {isAdmin && (
                  <button
                    onClick={(e) => handleDelete(e, hotspot.id)}
                    style={{
                      position: 'absolute',
                      top: '1rem',
                      right: '1rem',
                      background: 'none',
                      border: 'none',
                      color: 'var(--danger-color)',
                      cursor: 'pointer',
                      padding: '0.25rem',
                      opacity: 0.8,
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = 0.8}
                    title="Delete Hotspot"
                  >
                    <Trash2 size={20} />
                  </button>
                )}

                <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', paddingRight: isAdmin ? '2rem' : '0' }}>
                  <MapPin size={18} color="var(--primary-light)" />
                  {hotspot.name}
                </h3>
                
                {hotspot.addedBy && hotspot.addedBy !== 'system' && (
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '0.1rem 0.4rem', borderRadius: '4px', color: 'var(--accent-color)', marginBottom: '0.5rem', display: 'inline-block' }}>
                    Added by @{hotspot.addedBy}
                  </span>
                )}

                <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  {hotspot.description}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--accent-color)' }}>
                    <Calendar size={14} /> Best time: {hotspot.bestTimeToVisit}
                  </div>
                </div>
                
                {selectedHotspot?.id === hotspot.id && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      openGoogleMaps(hotspot.latitude, hotspot.longitude);
                    }}
                    className="btn btn-primary"
                    style={{ width: '100%', marginTop: '1rem', padding: '0.5rem', fontSize: '0.9rem' }}
                  >
                    Get Directions <ExternalLink size={16} />
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Map Area */}
        <div className="glass-panel" style={{ position: 'relative', overflow: 'hidden', minHeight: '400px' }}>
          {selectedHotspot ? (
            <MapContainer 
              center={[selectedHotspot.latitude, selectedHotspot.longitude]} 
              zoom={7} 
              style={{ height: '100%', width: '100%', borderRadius: '15px' }}
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <RecenterAutomatically lat={selectedHotspot.latitude} lng={selectedHotspot.longitude} />
              
              {animalHotspots.map(hotspot => (
                <Marker 
                  key={hotspot.id} 
                  position={[hotspot.latitude, hotspot.longitude]}
                  eventHandlers={{
                    click: () => setSelectedHotspot(hotspot),
                  }}
                >
                  <Popup>
                    <strong>{hotspot.name}</strong><br/>
                    {hotspot.description.substring(0, 50)}...
                    <br/><br/>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${hotspot.latitude},${hotspot.longitude}`}
                      target="_blank" 
                      rel="noreferrer"
                      style={{ color: '#2D6A4F', fontWeight: 'bold', textDecoration: 'underline' }}
                    >
                      Open in Google Maps
                    </a>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          ) : (
             <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <p style={{ color: 'var(--text-secondary)' }}>No location data available</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnimalHotspots;
