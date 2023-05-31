
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBN5yw4COhfUPoOrqJQ_2l8jQ_x5PP1gks",
  authDomain: "react-firebase-af1e5.firebaseapp.com",
  projectId: "react-firebase-af1e5",
  storageBucket: "react-firebase-af1e5.appspot.com",
  messagingSenderId: "820394635065",
  appId: "1:820394635065:web:8c9702340b394dbd5c02e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)