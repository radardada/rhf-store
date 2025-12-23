// utils.js
import { db } from './firebase.js';
import { ref, get, push, set, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

async function fetchProducts() {
  const productsRef = ref(db, 'products');
  const snapshot = await get(productsRef);
  return snapshot.val() || {};
}

async function addProduct(product) {
  const newRef = push(ref(db, 'products'));
  await set(newRef, product);
}

async function deleteProduct(id) {
  await remove(ref(db, `products/${id}`));
}

async function fetchOrders() {
  const ordersRef = ref(db, 'orders');
  const snapshot = await get(ordersRef);
  return snapshot.val() || {};
}

async function fetchUsers() {
  const usersRef = ref(db, 'users');
  const snapshot = await get(usersRef);
  return snapshot.val() || {};
}

async function trackUser(user) {
  await set(ref(db, `users/${user.uid}`), {
    email: user.email,
    lastLogin: new Date().toISOString()
  });
}

function formatRupiah(angka) {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export { fetchProducts, addProduct, deleteProduct, fetchOrders, fetchUsers, trackUser, formatRupiah };
