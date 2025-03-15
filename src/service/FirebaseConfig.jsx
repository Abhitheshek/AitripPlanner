import { getFirestore } from 'firebase/firestore';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDauBfNr-9TC7Fe8B8dd8xBzeeNukQVkQs",
  authDomain: "ai-trip-planner-c95b3.firebaseapp.com",
  projectId: "ai-trip-planner-c95b3",
  storageBucket: "ai-trip-planner-c95b3.firebasestorage.app",
  messagingSenderId: "206990041233",
  appId: "1:206990041233:web:3c8b11542705f185931f30",
  measurementId: "G-HQ1TDD1DK6"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
