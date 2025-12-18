// auth.js
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } 
from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";

import { app } from "./firebase.js";

const auth = getAuth(app);

// =========================
// LOGIN ADMIN
// =========================
export function adminLogin(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      window.location.href = "admin.html";
    })
    .catch((error) => {
      alert("Login gagal: " + error.message);
    });
}

// =========================
// PROTECT ADMIN PAGE
// =========================
export function protectAdminPage() {
  onAuthStateChanged(auth, (user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });
}

// =========================
// LOGOUT ADMIN
// =========================
export function adminLogout() {
  auth.signOut().then(() => {
    window.location.href = "index.html";
  });
}
