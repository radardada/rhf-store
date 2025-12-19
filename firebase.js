// firebase.js - Compat Version (Cocok untuk HTML + GitHub Pages)

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

// Inisialisasi Firebase
firebase.initializeApp(firebaseConfig);

// Variabel global penting
const auth = firebase.auth();          // Untuk login/logout
const db = firebase.firestore();       // Untuk simpan & load game/cart real-time

// Test sukses (buka console F12 untuk lihat)
console.log("RHF GAMES Firebase berhasil connect! 🔥");
console.log("Database URL:", firebaseConfig.databaseURL);
