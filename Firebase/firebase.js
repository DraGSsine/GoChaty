// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from 'firebase/firestore'
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
const firebaseConfig = {
  apiKey: "AIzaSyCq1x-cq2RI-ypRLQJq1FvC8_-_ILwQzHU",
  authDomain: "chat-app-7884d.firebaseapp.com",
  databaseURL: "https://chat-app-7884d-default-rtdb.firebaseio.com",
  projectId: "chat-app-7884d",
  storageBucket: "chat-app-7884d.appspot.com",
  messagingSenderId: "1016654784535",
  appId: "1:1016654784535:web:78b7549feb9552ccaed452"
}
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app);
export const rdb = getDatabase(app);