import React, { createContext, useState, useContext } from 'react';
import { initialAnimals, initialHotspots } from '../data/mockData';

const SanctuaryContext = createContext();

export const useSanctuary = () => {
  return useContext(SanctuaryContext);
};

export const SanctuaryProvider = ({ children }) => {
  const [animals] = useState(initialAnimals);
  const [hotspots, setHotspots] = useState(initialHotspots);
  
  // Strict Users Database
  const [registeredUsers, setRegisteredUsers] = useState([
    { uid: 'nishan', password: '3625', role: 'admin' }
  ]);
  
  const [user, setUser] = useState(null); // { uid, role }

  const registerUser = (uid, password) => {
    if (registeredUsers.some(u => u.uid === uid)) {
      throw new Error("User ID already exists");
    }
    const newUser = { uid, password, role: 'user' };
    setRegisteredUsers(prev => [...prev, newUser]);
    setUser({ uid: newUser.uid, role: newUser.role });
  };

  const login = (uid, password) => {
    const existingUser = registeredUsers.find(u => u.uid === uid);
    if (!existingUser) {
      throw new Error("User ID not found");
    }
    if (existingUser.password !== password) {
      throw new Error("Incorrect password");
    }
    setUser({ uid: existingUser.uid, role: existingUser.role });
  };

  const logout = () => setUser(null);

  const addHotspot = (newHotspot) => {
    setHotspots(prev => [...prev, {
      ...newHotspot,
      id: `h${Date.now()}`,
      addedBy: user?.uid || 'system'
    }]);
  };

  const deleteHotspot = (hotspotId) => {
    if (user?.role === 'admin') {
      setHotspots(prev => prev.filter(h => h.id !== hotspotId));
    }
  };

  const isAuthenticated = user !== null;
  const isAdmin = user?.role === 'admin';

  const value = {
    animals,
    hotspots,
    registeredUsers,
    addHotspot,
    deleteHotspot,
    isAuthenticated,
    isAdmin,
    user,
    login,
    logout,
    registerUser
  };

  return (
    <SanctuaryContext.Provider value={value}>
      {children}
    </SanctuaryContext.Provider>
  );
};
