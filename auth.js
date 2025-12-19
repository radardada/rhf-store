// auth.js - Handle login/logout untuk semua halaman

// Pastikan firebase.js sudah di-load sebelum ini (auth & db sudah ada)

// Elemen yang HARUS ADA di HTML kamu (di header/nav)
const loginBtn = document.getElementById('loginBtn');      // Tombol "Login"
const logoutBtn = document.getElementById('logoutBtn');    // Tombol "Logout" (awalnya hidden)
const adminLink = document.getElementById('adminLink');    // Link ke admin.html (hidden dulu)
const userDisplay = document.getElementById('userDisplay'); // Opsional: tempat nama/foto user

// Ganti dengan email Google kamu yang jadi admin!
const ADMIN_EMAIL = "radar@gmail.com";  // <--- UBAH INI JADI EMAIL KAMU SENDIRI!!!

// Cek status login setiap halaman load
auth.onAuthStateChanged(user => {
    if (user) {
        // Sudah login
        if (loginBtn) loginBtn.style.display = 'none';
        if (logoutBtn) logoutBtn.style.display = 'block';

        // Tampilkan info user (nama + foto)
        if (userDisplay) {
            userDisplay.innerHTML = `
                <img src="${user.photoURL || 'https://via.placeholder.com/40'}" alt="Profil" style="width:40px; height:40px; border-radius:50%; margin-right:10px;">
                <span>${user.displayName || user.email}</span>
            `;
            userDisplay.style.display = 'flex';
            userDisplay.style.alignItems = 'center';
        }

        // Kalau emailnya admin → tampilkan link admin
        if (user.email === ADMIN_EMAIL && adminLink) {
            adminLink.style.display = 'block';
        }

    } else {
        // Belum login
        if (loginBtn) loginBtn.style.display = 'block';
        if (logoutBtn) logoutBtn.style.display = 'none';
        if (adminLink) adminLink.style.display = 'none';
        if (userDisplay) userDisplay.style.display = 'none';
    }
});

// Klik tombol Login → popup Google
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        auth.signInWithPopup(provider)
            .then(() => {
                // Sukses login, onAuthStateChanged akan handle sisanya
            })
            .catch(error => {
                alert("Gagal login: " + error.message);
            });
    });
}

// Klik Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        auth.signOut().then(() => {
            alert("Logout berhasil!");
        });
    });
}
