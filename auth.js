// auth.js - Login user biasa (untuk cart & order, mirip Tokogame)

const loginBtn = document.getElementById('loginBtn');
const logoutBtn = document.getElementById('logoutBtn');
const userDisplay = document.getElementById('userDisplay');
const adminLink = document.getElementById('adminLink');

// Cek login user biasa
auth.onAuthStateChanged(user => {
    if (user) {
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';
        if (userDisplay) {
            userDisplay.innerHTML = user.displayName || user.email;
            userDisplay.style.display = 'block';
        }
        if (adminLink && user.email === 'radhitt925@gmail.com') adminLink.style.display = 'block';
    } else {
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (userDisplay) userDisplay.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
    }
});

// Login Google untuk user biasa
if (loginBtn) loginBtn.addEventListener('click', () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
});

// Logout user
if (logoutBtn) logoutBtn.addEventListener('click', () => {
    auth.signOut();
});
