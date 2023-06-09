// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCCgUZj89vda-6s63FwmkrwdrCG9lgnWqc",
  authDomain: "queuing-system-3b7d7.firebaseapp.com",
  projectId: "queuing-system-3b7d7",
  storageBucket: "queuing-system-3b7d7.appspot.com",
  messagingSenderId: "860894568331",
  appId: "1:860894568331:web:26936d97ea96c8f92bd98e",
  measurementId: "G-HT77RJTH3H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
