import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this for authentication//
// update packages  // updaet

const firebaseConfig = {
  apiKey: "AIzaSyClG9EbU9n_3tyAOiV2MJADnp9YV5gUh2Q",
  authDomain: "bombooworld-ba410.firebaseapp.com",
  projectId: "bombooworld-ba410",
  storageBucket: "bombooworld-ba410.firebasestorage.app",
  messagingSenderId: "1055253396005",
  appId: "1:1055253396005:web:b629f6b117a15ce437ddcc",
  measurementId: "G-1342KP4ZW0"
};

// Initialize Firebase  
const firebase = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(firebase); // Add authentication

export { firebase, auth }; // Export all services
