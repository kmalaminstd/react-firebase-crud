
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import {getDocs, addDoc, onSnapshot, getFirestore, collection, doc} from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

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
const db = getFirestore(app)
export const noteColRef = collection(db, 'notes')
export const storage = getStorage(app)

// getDocs(colRef).then((snapshop)=>{
//   const arr = []
//   snapshop.docs.forEach(doc => {
//     arr.push({
//       ...doc.data(),
//       id: doc.id
//     })
//   })
//   console.log(arr);
// })

// onSnapshot(colRef, (snapshot)=>{
//   const arr = []
//   snapshot.docs.forEach(doc => {
//     arr.push({
//       ...doc.data(),
//       id: doc.id
//     })
//   })
//   console.log(arr);
// })