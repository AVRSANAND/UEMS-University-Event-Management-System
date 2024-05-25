// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDm_seYhwH2H64wXPDUmvJQawM_gMVYCmU",
  authDomain: "uems-b61cf.firebaseapp.com",
  projectId: "uems-b61cf",
  storageBucket: "uems-b61cf.appspot.com",
  messagingSenderId: "591438254189",
  appId: "1:591438254189:web:45310977b2f85ebda2af64",
  measurementId: "G-M922SBX8PR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const fireDB = getFirestore(app);
const analytics = getAnalytics(app);


export { auth, fireDB };