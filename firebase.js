// firebase.js - Compat version untuk HTML biasa
const firebaseConfig = {
  apiKey: "AIzaSyAyHSaALeuwibcF22VNL_6WDlcZepcDB3A",
  authDomain: "rhf-gamestore.firebaseapp.com",
  databaseURL: "https://rhf-gamestore-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "rhf-gamestore",
  storageBucket: "rhf-gamestore.firebasestorage.app",
  messagingSenderId: "52065906934",
  appId: "1:52065906934:web:c15f0eff91cc937f787cd7",
  measurementId: "G-RYFR9D5R5H"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
