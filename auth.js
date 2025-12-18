/* =============================== RHF GAMES - AUTH.JS Auth sederhana tapi BENAR-BENAR BEKERJA

Admin login

Proteksi halaman admin

Bisa dikembangkan ke Firebase ================================ */


const RHF_AUTH = { adminKey: "RHF_ADMIN_LOGIN", adminPassword: "admin123", // GANTI NANTI

// ===================== // LOGIN ADMIN // ===================== loginAdmin(password) { if (!password) return { ok: false, msg: "Password kosong" };

if (password === this.adminPassword) {
  const token = "admin_" + Date.now();
  localStorage.setItem(this.adminKey, token);
  return { ok: true, msg: "Login berhasil" };
}

return { ok: false, msg: "Password salah" };

},

// ===================== // CEK LOGIN ADMIN // ===================== isAdmin() { return !!localStorage.getItem(this.adminKey); },

// ===================== // LOGOUT ADMIN // ===================== logoutAdmin() { localStorage.removeItem(this.adminKey); location.href = "index.html"; },

// ===================== // PROTEKSI HALAMAN ADMIN // ===================== protectAdminPage() { if (!this.isAdmin()) { const pass = prompt("Masukkan password admin:"); const res = this.loginAdmin(pass); if (!res.ok) { alert(res.msg); location.href = "index.html"; } } } };

/* =============================== CARA PAKAI

1. Di admin.html



   <script src="auth.js"></script>   <script>
     RHF_AUTH.protectAdminPage();
   </script>2. Tombol logout: onclick="RHF_AUTH.logoutAdmin()"



================================ */
