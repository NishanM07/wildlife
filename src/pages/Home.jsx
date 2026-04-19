import React, { useState, useMemo } from 'react';
import { useSanctuary } from '../context/SanctuaryContext';
import AnimalCard from '../components/AnimalCard';
import AddHotspotModal from '../components/AddHotspotModal';
import { Plus, Users, MapPin, Activity, Compass, Search, Filter, BarChart2 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const Home = () => {
  const { animals, hotspots, isAdmin, registeredUsers, deleteUser } = useSanctuary();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortOrder, setSortOrder] = useState('A-Z');

  // Filter users to only count standard users
  const standardUsersCount = registeredUsers.filter(u => u.role === 'user').length;
  // Get recent hotspots added by users
  const userAddedHotspots = hotspots.filter(h => h.addedBy && h.addedBy !== 'system').reverse();

  // Prepare Chart Data (Top 5 animals with most hotspots)
  const chartData = useMemo(() => {
    const counts = {};
    hotspots.forEach(h => {
      counts[h.animalId] = (counts[h.animalId] || 0) + 1;
    });
    return Object.keys(counts)
      .map(id => ({
        name: animals.find(a => a.id === id)?.name || 'Unknown',
        hotspots: counts[id]
      }))
      .sort((a, b) => b.hotspots - a.hotspots)
      .slice(0, 5);
  }, [hotspots, animals]);

  // Extract unique statuses and categories
  const categories = ['All', ...new Set(animals.map(a => a.category))];
  const statuses = ['All', ...new Set(animals.map(a => a.conservationStatus))];

  // Filter and sort animals
  const filteredAnimals = useMemo(() => {
    let result = animals.filter(animal => {
      const matchSearch = animal.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = categoryFilter === 'All' || animal.category === categoryFilter;
      const matchStatus = statusFilter === 'All' || animal.conservationStatus === statusFilter;
      return matchSearch && matchCategory && matchStatus;
    });

    if (sortOrder === 'A-Z') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOrder === 'Z-A') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    }

    return result;
  }, [animals, searchTerm, categoryFilter, statusFilter, sortOrder]);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-background"></div>
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Discover India's Wildlife</h1>
          <p className="hero-subtitle">
            Explore the majestic endangered species and their pristine habitats across the diverse landscapes of India. Connect with nature like never before.
          </p>
        </div>
      </div>

      <div className="container-boxed">
        {isAdmin && (
          <div className="glass-panel" style={{ marginBottom: '4rem', padding: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem', color: 'var(--accent-orange)' }}>
              <Activity size={28} />
              <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Admin Dashboard</h2>
            </div>
            
            <div className="admin-grid">
              <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--surface-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  <Users size={20} />
                  <span style={{ fontSize: '1.1rem' }}>Total Registered Users</span>
                </div>
                <div style={{ fontSize: '3rem', fontWeight: '800', color: 'white' }}>
                  {standardUsersCount}
                </div>
              </div>

              <div className="admin-card-span-2" style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--surface-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  <MapPin size={20} />
                  <span style={{ fontSize: '1.1rem' }}>Recent User Hotspot Additions</span>
                </div>
                
                {userAddedHotspots.length === 0 ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: 'var(--text-secondary)', fontStyle: 'italic', padding: '1rem' }}>
                    <Compass size={24} opacity={0.5} />
                    <p>No hotspots added by users yet.</p>
                  </div>
                ) : (
                  <div style={{ maxHeight: '180px', overflowY: 'auto', paddingRight: '1rem' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                      <thead>
                        <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                          <th style={{ padding: '0.75rem' }}>Hotspot Name</th>
                          <th style={{ padding: '0.75rem' }}>Added By</th>
                          <th style={{ padding: '0.75rem' }}>Subject ID</th>
                        </tr>
                      </thead>
                      <tbody>
                        {userAddedHotspots.map(h => (
                          <tr key={h.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.02)'} onMouseLeave={(e)=>e.currentTarget.style.background='transparent'}>
                            <td style={{ padding: '0.75rem', color: 'white', fontWeight: '500' }}>{h.name}</td>
                            <td style={{ padding: '0.75rem', color: 'var(--primary-light)' }}>@{h.addedBy}</td>
                            <td style={{ padding: '0.75rem', color: 'var(--text-secondary)' }}>{h.animalId}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Manage Users Table */}
            <div style={{ marginTop: '2rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                <Users size={20} />
                <span style={{ fontSize: '1.1rem' }}>Manage Registered Users</span>
              </div>
              <div style={{ maxHeight: '200px', overflowY: 'auto', paddingRight: '1rem' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)', textAlign: 'left' }}>
                      <th style={{ padding: '0.75rem' }}>User ID</th>
                      <th style={{ padding: '0.75rem' }}>Role</th>
                      <th style={{ padding: '0.75rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registeredUsers.map(u => (
                      <tr key={u.uid} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }} onMouseEnter={(e)=>e.currentTarget.style.background='rgba(255,255,255,0.02)'} onMouseLeave={(e)=>e.currentTarget.style.background='transparent'}>
                        <td style={{ padding: '0.75rem', color: 'white', fontWeight: '500' }}>@{u.uid}</td>
                        <td style={{ padding: '0.75rem', color: u.role === 'admin' ? 'var(--accent-orange)' : 'var(--text-secondary)' }}>{u.role}</td>
                        <td style={{ padding: '0.75rem', textAlign: 'right' }}>
                          {u.uid !== 'nishan' && (
                            <button
                              onClick={() => {
                                if (window.confirm(`Are you sure you want to delete user @${u.uid}?`)) {
                                  deleteUser(u.uid);
                                }
                              }}
                              style={{ background: 'var(--danger-color)', color: 'white', border: 'none', padding: '0.4rem 1rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: '600' }}
                            >
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Analytics Chart */}
            <div style={{ marginTop: '2rem', background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                <BarChart2 size={20} />
                <span style={{ fontSize: '1.1rem' }}>Top 5 Subjects by Hotspot Count</span>
              </div>
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <XAxis dataKey="name" stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} />
                    <YAxis stroke="var(--text-secondary)" tick={{ fill: 'var(--text-secondary)' }} allowDecimals={false} />
                    <Tooltip 
                      contentStyle={{ background: 'var(--surface-color)', border: '1px solid var(--surface-border)', borderRadius: '8px', color: 'white' }}
                      itemStyle={{ color: 'var(--primary-light)' }}
                    />
                    <Bar dataKey="hotspots" fill="var(--primary-light)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

        <div className="page-header" style={{ borderBottom: 'none', paddingBottom: 0 }}>
          <div>
            <h1 className="page-title">Conservation Subjects</h1>
            <p className="page-subtitle">Select a species to view their documented habitats and safe zones</p>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="glass-panel" style={{ 
          marginBottom: '3rem', 
          padding: '1.5rem', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '1.5rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div className="search-bar-container">
            <Search size={20} color="var(--text-secondary)" style={{ marginRight: '0.75rem' }} />
            <input 
              type="text" 
              placeholder="Search by name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ background: 'transparent', border: 'none', color: 'white', fontSize: '1rem', width: '100%', outline: 'none' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Filter size={18} color="var(--text-secondary)" />
              <select 
                value={categoryFilter} 
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="custom-select"
              >
                {categories.map(c => <option key={c} value={c}>{c === 'All' ? 'All Categories' : c}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="custom-select"
              >
                {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Statuses' : s}</option>)}
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <select 
                value={sortOrder} 
                onChange={(e) => setSortOrder(e.target.value)}
                className="custom-select"
              >
                <option value="A-Z">Sort A-Z</option>
                <option value="Z-A">Sort Z-A</option>
              </select>
            </div>
          </div>
        </div>

        <div className="animal-grid">
          {filteredAnimals.length > 0 ? (
            filteredAnimals.map(animal => {
              const count = hotspots.filter(h => h.animalId === animal.id).length;
              return (
                <AnimalCard key={animal.id} animal={animal} hotspotCount={count} />
              );
            })
          ) : (
             <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
                <Compass size={48} opacity={0.5} style={{ marginBottom: '1rem' }} />
                <h2>No subjects found matching your criteria</h2>
                <p>Try adjusting your search or filters.</p>
             </div>
          )}
        </div>
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
