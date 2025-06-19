// Firebase v9+ modular SDK
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCtys1ubEjM0r7laszgtGu_s-26pxeRRPk",
  authDomain: "smart-brightly-ocotpus.firebaseapp.com",
  databaseURL: "https://smart-brightly-ocotpus-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smart-brightly-ocotpus",
  storageBucket: "smart-brightly-ocotpus.firebasestorage.app",
  messagingSenderId: "83898516169",
  appId: "1:83898516169:web:ea5396777d5b4999740318",
  measurementId: "G-WTGXPY55GP"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);