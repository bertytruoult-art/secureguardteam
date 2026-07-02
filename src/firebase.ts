import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// Firebase configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyCCVvmWyJz7zm_359bgI_-o9VcAP07Fs20",
  authDomain: "fir-d3820.firebaseapp.com",
  projectId: "fir-d3820",
  storageBucket: "fir-d3820.firebasestorage.app",
  messagingSenderId: "403465550807",
  appId: "1:403465550807:web:98e6dc7681c41113cd6992",
  measurementId: "G-XEBJ26GHPX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Export Auth Providers
export const googleProvider = new GoogleAuthProvider();

export {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut
};
