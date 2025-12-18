// firebase.js // KONFIGURASI & INIT FIREBASE (RHF GAMES) // Dipakai oleh SEMUA file: index, game, detail, checkout, admin

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js"; import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js"; import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js"; import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

// ========================= // FIREBASE CONFIG (PUNYA KAMU) // ========================= const firebaseConfig = { apiKey: "AIzaSyAyHSaALeuwibcF22VNL_6WDlcZepcDB3A", authDomain: "rhf-gamestore.firebaseapp.com", databaseURL: "https://rhf-gamestore-default-rtdb.asia-southeast1.firebasedatabase.app", projectId: "rhf-gamestore", storageBucket: "rhf-gamestore.firebasestorage.app", messagingSenderId: "52065906934", appId: "1:52065906934:web:c15f0eff91cc937f787cd7", measurementId: "G-RYFR9D5R5H" };

// ========================= // INITIALIZE // ========================= export const app = initializeApp(firebaseConfig); export const analytics = getAnalytics(app); export const auth = getAuth(app); export const db = getDatabase(app);

// ========================= // GLOBAL EXPORT // ========================= export default app;
