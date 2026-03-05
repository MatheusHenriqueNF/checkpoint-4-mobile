// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyCqnUBzFpHnjh8TlVxTgnO738D_WnN8nfw",
  authDomain: "fir-auth-a7580.firebaseapp.com",
  projectId: "fir-auth-a7580",
  storageBucket: "fir-auth-a7580.firebasestorage.app",
  messagingSenderId: "270977891231",
  appId: "1:270977891231:web:e56044579219bdde871baa",
  measurementId: "G-CC060299YX"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);