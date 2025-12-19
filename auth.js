// auth.js
const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const adminLink = document.getElementById('adminLink');

if (loginBtn) {
  auth.onAuthStateChanged(user => {
    if (user) {
      loginBtn.style.display = 'none';
      logoutBtn.style.display = 'block';
      if (user.email === 'admin@rhfgames.com') { // Ganti dengan email admin kamu
        if (adminLink) adminLink.style.display = 'block';
      }
    } else {
      loginBtn.style.display = 'block';
      logoutBtn.style.display = 'none';
      if (adminLink) adminLink.style.display = 'none';
    }
  });

  loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  });

  logoutBtn.addEventListener('click', () => {
    auth.signOut();
  });
}
