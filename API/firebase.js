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

};

// if (firebase.getApps().length === 0) {
//  const app =  firebase.initializeApp(firebaseConfig);
// } else {
//   const app = firebase.getApp();
// }

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { app, db };
