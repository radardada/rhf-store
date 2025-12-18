/* ===============================
   RHF GAMES - utils.js
   Helper Global (Wajib)
================================ */

/* -------------------------------
   CONFIG GLOBAL
-------------------------------- */
const RHF_CONFIG = {
  CURRENCY: "IDR",
  MARKUP_DEFAULT: 1000, // markup admin default 1K
  STORAGE_CART: "rhf_cart",
  STORAGE_ADMIN: "rhf_admin_config",
};

/* -------------------------------
   FORMAT RUPIAH
-------------------------------- */
function formatRupiah(number) {
  if (!number) return "Rp 0";
  return (
    "Rp " +
    parseInt(number)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
  );
}

/* -------------------------------
   PARSE ANGKA
-------------------------------- */
function toNumber(value) {
  return parseInt(value.toString().replace(/\D/g, "")) || 0;
}

/* -------------------------------
   ADMIN CONFIG (MARKUP)
-------------------------------- */
function getAdminConfig() {
  return JSON.parse(localStorage.getItem(RHF_CONFIG.STORAGE_ADMIN)) || {
    markup: RHF_CONFIG.MARKUP_DEFAULT,
  };
}

function setAdminConfig(config) {
  localStorage.setItem(
    RHF_CONFIG.STORAGE_ADMIN,
    JSON.stringify(config)
  );
}

/* -------------------------------
   HITUNG HARGA JUAL
-------------------------------- */
function getSellPrice(basePrice) {
  const admin = getAdminConfig();
  return toNumber(basePrice) + toNumber(admin.markup);
}

/* -------------------------------
   CART STORAGE
-------------------------------- */
function getCart() {
  return JSON.parse(localStorage.getItem(RHF_CONFIG.STORAGE_CART)) || [];
}

function saveCart(cart) {
  localStorage.setItem(RHF_CONFIG.STORAGE_CART, JSON.stringify(cart));
}

function clearCart() {
  localStorage.removeItem(RHF_CONFIG.STORAGE_CART);
}

/* -------------------------------
   TAMBAH KE CART
-------------------------------- */
function addToCart(item) {
  const cart = getCart();
  cart.push({
    id: Date.now(),
    ...item,
  });
  saveCart(cart);
}

/* -------------------------------
   TOTAL CART
-------------------------------- */
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + toNumber(item.price), 0);
}

/* -------------------------------
   VALIDASI INPUT USER ID
-------------------------------- */
function validateInput(gameKey, value) {
  if (!value || value.length < 3) {
    return {
      valid: false,
      message: "Input tidak valid",
    };
  }

  // Contoh validasi khusus
  if (gameKey === "mobile-legends") {
    if (!value.includes("(") || !value.includes(")")) {
      return {
        valid: false,
        message: "Format harus: ID(Server)",
      };
    }
  }

  if (gameKey === "brawl-stars") {
    if (!value.startsWith("#")) {
      return {
        valid: false,
        message: "Player Tag harus diawali #",
      };
    }
  }

  return {
    valid: true,
    message: "OK",
  };
}

/* -------------------------------
   GENERATE INVOICE
-------------------------------- */
function generateInvoice() {
  return "RHF-" + Date.now();
}

/* -------------------------------
   NOTIFIKASI SIMPLE
-------------------------------- */
function showAlert(message) {
  alert(message);
}

/* -------------------------------
   REDIRECT
-------------------------------- */
function goTo(url) {
  window.location.href = url;
}

/* -------------------------------
   CEK LOGIN ADMIN
-------------------------------- */
function isAdmin() {
  return localStorage.getItem("rhf_admin_login") === "true";
}

function requireAdmin() {
  if (!isAdmin()) {
    alert("Akses Admin Ditolak");
    goTo("index.html");
  }
}

/* -------------------------------
   EXPORT (GLOBAL)
-------------------------------- */
window.RHF_UTILS = {
  formatRupiah,
  toNumber,
  getSellPrice,
  getCart,
  addToCart,
  getCartTotal,
  clearCart,
  validateInput,
  generateInvoice,
  getAdminConfig,
  setAdminConfig,
  showAlert,
  goTo,
  requireAdmin,
};
