// utils.js
import { db } from './firebase.js';
import { ref, get, push, set, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

async function fetchProducts() {
  const snapshot = await get(ref(db, 'products'));
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
  const snapshot = await get(ref(db, 'orders'));
  return snapshot.val() || {};
}

async function fetchUsers() {
  const snapshot = await get(ref(db, 'users'));
  return snapshot.val() || {};
}

function formatRupiah(angka) {
  return 'Rp ' + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

export { fetchProducts, addProduct, deleteProduct, fetchOrders, fetchUsers, formatRupiah };
