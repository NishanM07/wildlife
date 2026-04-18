import React, { useState } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import AnimalCard from '../components/AnimalCard';
import AddHotspotModal from '../components/AddHotspotModal';
import { Plus, Users, MapPin, Activity } from 'lucide-react';

const Home = () => {
  const { animals, hotspots, isAdmin, registeredUsers } = useSanctuary();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter users to only count standard users
  const standardUsersCount = registeredUsers.filter(u => u.role === 'user').length;
  // Get recent hotspots added by users
  const userAddedHotspots = hotspots.filter(h => h.addedBy && h.addedBy !== 'system').reverse();

  return (
    <div>
      {isAdmin && (
        <div className="glass-panel" style={{ marginBottom: '3rem', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: 'var(--accent-orange)' }}>
            <Activity size={24} />
            <h2 style={{ fontSize: '1.5rem', margin: 0 }}>Admin Dashboard</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                <Users size={18} />
                <span>Total Registered Users</span>
              </div>
              <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white' }}>
                {standardUsersCount}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--surface-border)', gridColumn: 'span 2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <MapPin size={18} />
                <span>Recent User Hotspot Additions</span>
              </div>
              
              {userAddedHotspots.length === 0 ? (
                <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>No hotspots added by users yet.</p>
              ) : (
                <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid var(--surface-border)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                        <th style={{ padding: '0.5rem' }}>Hotspot Name</th>
                        <th style={{ padding: '0.5rem' }}>Added By</th>
                        <th style={{ padding: '0.5rem' }}>Subject ID</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userAddedHotspots.map(h => (
                        <tr key={h.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '0.5rem', color: 'white' }}>{h.name}</td>
                          <td style={{ padding: '0.5rem', color: 'var(--primary-light)' }}>@{h.addedBy}</td>
                          <td style={{ padding: '0.5rem', color: 'var(--text-secondary)' }}>{h.animalId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="page-header">
        <div>
          <h1 className="page-title">Wildlife Sanctuaries</h1>
          <p className="page-subtitle">Explore endangered species and their habitats</p>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '2rem',
        paddingBottom: '4rem'
      }}>
        {animals.map(animal => {
          const count = hotspots.filter(h => h.animalId === animal.id).length;
          return (
            <AnimalCard key={animal.id} animal={animal} hotspotCount={count} />
          );
        })}
      </div>

      {/* Floating Action Button for adding hotspots */}
      <div 
        className="fab" 
        onClick={() => setIsModalOpen(true)}
        title="Add new hotspot"
      >
        <Plus />
      </div>

      <AddHotspotModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Home;
