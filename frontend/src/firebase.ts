import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this for authentication//
// update packages  // updaet

const firebaseConfig = {
  apiKey: "AIzaSyAi5_R3mdUXTTpen8MddCAfM1suYjsX6SY",
  authDomain: "creative-interior-c2ade.firebaseapp.com",
  projectId: "creative-interior-c2ade",
  storageBucket: "creative-interior-c2ade.firebasestorage.app",
  messagingSenderId: "1094735596413",
  appId: "1:1094735596413:web:c245a33d114cb5255d9a14",
  measurementId: "G-V5KV67CRSE"
};

// Initialize Firebase  
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebase); // Add authentication

export { firebase, auth }; // Export all services
