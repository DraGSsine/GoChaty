// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: "chat-app-7884d.firebaseapp.com",
  projectId: "chat-app-7884d",
  storageBucket: "chat-app-7884d.appspot.com",
  messagingSenderId: "1016654784535",
  appId: "1:1016654784535:web:78b7549feb9552ccaed452"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)