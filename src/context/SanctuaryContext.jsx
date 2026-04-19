import React, { createContext, useState, useContext, useEffect } from 'react';
import { initialAnimals, initialHotspots } from '../data/mockData';

const SanctuaryContext = createContext();

export const useSanctuary = () => {
  return useContext(SanctuaryContext);
};

export const SanctuaryProvider = ({ children }) => {
  const [animals, setAnimals] = useState(() => {
    const saved = localStorage.getItem('wildlife_animals_v2');
    return saved ? JSON.parse(saved) : initialAnimals;
  });
  
  const [hotspots, setHotspots] = useState(() => {
    const saved = localStorage.getItem('wildlife_hotspots_v2');
    return saved ? JSON.parse(saved) : initialHotspots;
  });
  
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('wildlife_users');
    return saved ? JSON.parse(saved) : [{ uid: 'nishan', password: '3625', role: 'admin' }];
  });
  
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('wildlife_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Save changes to localStorage/sessionStorage
  useEffect(() => {
    localStorage.setItem('wildlife_animals_v2', JSON.stringify(animals));
  }, [animals]);

  useEffect(() => {
    localStorage.setItem('wildlife_hotspots_v2', JSON.stringify(hotspots));
  }, [hotspots]);

  useEffect(() => {
    localStorage.setItem('wildlife_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem('wildlife_currentUser', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('wildlife_currentUser');
    }
  }, [user]);

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

  const deleteAnimal = (animalId) => {
    if (user?.role === 'admin') {
      setAnimals(prev => prev.filter(a => a.id !== animalId));
      // Also delete associated hotspots
      setHotspots(prev => prev.filter(h => h.animalId !== animalId));
    }
  };

  const deleteUser = (uid) => {
    if (user?.role === 'admin' && uid !== 'nishan') { // Prevent deleting main admin
      setRegisteredUsers(prev => prev.filter(u => u.uid !== uid));
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
    deleteAnimal,
    deleteUser,
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
