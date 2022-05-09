import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// Optionally import the services that you want to use
// import {auth} from "firebase/auth";
//import {...} from "firebase/database";
// import {firestore} from "firebase/firestore";
//import {...} from "firebase/functions";
// import {storage} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBef-vinGqaxxKYxStyqnSE_JsGaBgekGc",
  authDomain: "digital-learning-center-saya.firebaseapp.com",
  projectId: "digital-learning-center-saya",
  storageBucket: "digital-learning-center-saya.appspot.com",
  messagingSenderId: "598763712577",
  appId: "1:598763712577:web:4443cc7b51fb527221d6c0",
  measurementId: "G-23HJ7M2LKB",
};

// if (firebase.getApps().length === 0) {
//  const app =  firebase.initializeApp(firebaseConfig);
// } else {
//   const app = firebase.getApp();
// }

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
