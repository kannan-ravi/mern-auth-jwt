// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "auth-mern-jwt.firebaseapp.com",
  projectId: "auth-mern-jwt",
  storageBucket: "auth-mern-jwt.appspot.com",
  messagingSenderId: "441416714859",
  appId: "1:441416714859:web:2e18676aa00dd25485bf2e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
