import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, onSnapshot, doc, setDoc, deleteDoc, getDocs, writeBatch } from 'firebase/firestore';
import { db } from '../firebase';
import { initialAnimals, initialHotspots } from '../data/mockData';

const SanctuaryContext = createContext();

export const useSanctuary = () => useContext(SanctuaryContext);

export const SanctuaryProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [hotspots, setHotspots] = useState([]);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('wildlife_currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  // Keep sessionStorage in sync for current logged in user
  useEffect(() => {
    if (user) {
      sessionStorage.setItem('wildlife_currentUser', JSON.stringify(user));
    } else {
      sessionStorage.removeItem('wildlife_currentUser');
    }
  }, [user]);

  // Seed initial data if database is empty
  const seedDatabase = async () => {
    try {
      const batch = writeBatch(db);
      
      // Seed Animals
      for (const animal of initialAnimals) {
        batch.set(doc(db, 'animals', animal.id.toString()), animal);
      }
      
      // Seed Hotspots
      for (const hotspot of initialHotspots) {
        batch.set(doc(db, 'hotspots', hotspot.id.toString()), hotspot);
      }
      
      // Seed initial admin user
      batch.set(doc(db, 'users', 'nishan'), { uid: 'nishan', password: '3625', role: 'admin' });
      
      await batch.commit();
      console.log('Database seeded successfully');
    } catch (error) {
      console.error('Error seeding database:', error);
    }
  };

  useEffect(() => {
    // Check if we need to seed the database
    const checkAndSeed = async () => {
      const usersSnap = await getDocs(collection(db, 'users'));
      if (usersSnap.empty) {
        await seedDatabase();
      }
    };
    
    checkAndSeed();

    // Listen to Users
    const unsubscribeUsers = onSnapshot(collection(db, 'users'), (snapshot) => {
      const usersData = [];
      snapshot.forEach((doc) => usersData.push({ id: doc.id, ...doc.data() }));
      setRegisteredUsers(usersData);
    });

    // Listen to Animals
    const unsubscribeAnimals = onSnapshot(collection(db, 'animals'), (snapshot) => {
      const animalsData = [];
      snapshot.forEach((doc) => animalsData.push({ id: doc.id, ...doc.data() }));
      setAnimals(animalsData);
    });

    // Listen to Hotspots
    const unsubscribeHotspots = onSnapshot(collection(db, 'hotspots'), (snapshot) => {
      const hotspotsData = [];
      snapshot.forEach((doc) => hotspotsData.push({ id: doc.id, ...doc.data() }));
      setHotspots(hotspotsData);
      setLoading(false);
    });

    return () => {
      unsubscribeUsers();
      unsubscribeAnimals();
      unsubscribeHotspots();
    };
  }, []);

  const registerUser = async (uid, password) => {
    if (registeredUsers.some(u => u.uid === uid)) {
      throw new Error("User ID already exists");
    }
    const newUser = { uid, password, role: 'user' };
    await setDoc(doc(db, 'users', uid), newUser);
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

  const addHotspot = async (newHotspot) => {
    const newId = `h${Date.now()}`;
    const hotspotToAdd = {
      ...newHotspot,
      id: newId,
      addedBy: user?.uid || 'system'
    };
    await setDoc(doc(db, 'hotspots', newId), hotspotToAdd);
  };

  const deleteHotspot = async (hotspotId) => {
    if (user?.role === 'admin') {
      await deleteDoc(doc(db, 'hotspots', hotspotId.toString()));
    }
  };

  const deleteAnimal = async (animalId) => {
    if (user?.role === 'admin') {
      await deleteDoc(doc(db, 'animals', animalId.toString()));
      // Delete associated hotspots
      const hotspotsToDelete = hotspots.filter(h => h.animalId === animalId);
      const batch = writeBatch(db);
      hotspotsToDelete.forEach(h => {
        batch.delete(doc(db, 'hotspots', h.id.toString()));
      });
      await batch.commit();
    }
  };

  const deleteUser = async (uid) => {
    if (user?.role === 'admin' && uid !== 'nishan') {
      await deleteDoc(doc(db, 'users', uid));
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
    registerUser,
    loading
  };

  return (
    <SanctuaryContext.Provider value={value}>
      {!loading ? children : <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'white', backgroundColor: '#040F0A'}}>Loading Sanctuary Data...</div>}
    </SanctuaryContext.Provider>
  );
};
