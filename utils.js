// utils.js
import { db } from './firebase.js';
import { ref, get, set, push, remove } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { formatRupiah, getQueryParam } from './utils.js'; // Jika sudah ada

async function fetchProducts() {
  const productsRef = ref(db, 'products');
  const snapshot = await get(productsRef);
  return snapshot.val() || {};
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

async function addProduct(product) {
  const newRef = push(ref(db, 'products'));
  await set(newRef, product);
}

async function deleteProduct(id) {
  await remove(ref(db, `products/${id}`));
}

async function addOrder(order) {
  const newRef = push(ref(db, 'orders'));
  await set(newRef, order);
}

async function trackUser(user) {
  await set(ref(db, `users/${user.uid}`), { email: user.email, lastLogin: new Date().toISOString() });
}

export { formatRupiah, getQueryParam, fetchProducts, fetchOrders, fetchUsers, addProduct, deleteProduct, addOrder, trackUser };
