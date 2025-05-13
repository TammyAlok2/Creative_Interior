import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this for authentication


const firebaseConfig = {
  apiKey: "AIzaSyBQCZlunSOtQOtwplmw5SmFfEnYeSRF0hA",
  authDomain: "creative-interior-c54e6.firebaseapp.com",
  projectId: "creative-interior-c54e6",
  storageBucket: "creative-interior-c54e6.firebasestorage.app",
  messagingSenderId: "496839591542",
  appId: "1:496839591542:web:6e194f8fe2eb534cd68157",
  measurementId: "G-RN1BQ7RGXP"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebase); // Add authentication


export { firebase, auth }; // Export all services


