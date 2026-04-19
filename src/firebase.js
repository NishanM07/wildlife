import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB_8ZrpQaHKltGv58XuQYcaE5QkIUVwh8w",
  authDomain: "wildlife-sanctuary-93fc5.firebaseapp.com",
  projectId: "wildlife-sanctuary-93fc5",
  storageBucket: "wildlife-sanctuary-93fc5.firebasestorage.app",
  messagingSenderId: "86634876360",
  appId: "1:86634876360:web:96891fac33f83c3d7604fd",
  measurementId: "G-FGGFE76034"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
