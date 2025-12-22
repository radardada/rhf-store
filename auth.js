// auth.js
import { auth } from './firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

function register(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Registered:', userCredential.user);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function login(email, password) {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log('Logged in:', userCredential.user);
      if (userCredential.user.email === 'admin@rhfgamestore.com') { // Ganti dengan email admin mu
        window.location.href = 'admin.html';
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function logout() {
  signOut(auth).then(() => {
    console.log('Logged out');
    window.location.href = 'index.html';
  }).catch((error) => {
    console.error('Error:', error);
  });
}

function checkAuth(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

export { register, login, logout, checkAuth };
