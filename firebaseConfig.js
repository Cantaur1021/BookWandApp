// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD38zvdXz-YdVceZyk5PFNl-_ibYSN_Omk",
  authDomain: "book-wand.firebaseapp.com",
  databaseURL: "https://book-wand-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "book-wand",
  storageBucket: "book-wand.appspot.com",
  messagingSenderId: "489961540454",
  appId: "1:489961540454:web:b447e825a6654ce40956a7",
  measurementId: "G-8N063QBNKS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

