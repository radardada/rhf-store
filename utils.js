/* =========================================
   RHF GAMES - UTILS CORE SYSTEM
   ========================================= */

/* ===============================
   GLOBAL CONFIG
   =============================== */

const RHF_CONFIG = {
  siteName: "RHF GAMES",
  currency: "IDR",
  adminPassword: "admin123", // bisa kamu ganti
};

/* ===============================
   STORAGE HELPERS
   =============================== */

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function loadData(key, defaultValue = []) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}

/* ===============================
   GAME DATA
   =============================== */

function getGames() {
  return loadData("rhf_games", []);
}

function saveGames(games) {
  saveData("rhf_games", games);
}

/* ===============================
   PACKAGE DATA
   =============================== */

function getPackages(gameId) {
  const all = loadData("rhf_packages", {});
  return all[gameId] || [];
}

function savePackages(gameId, packages) {
  const all = loadData("rhf_packages", {});
  all[gameId] = packages;
  saveData("rhf_packages", all);
}

/* ===============================
   INPUT FIELD CONFIG
   =============================== */

function getInputConfig(gameId) {
  const all = loadData("rhf_inputs", {});
  return all[gameId] || [];
}

function saveInputConfig(gameId, inputs) {
  const all = loadData("rhf_inputs", {});
  all[gameId] = inputs;
  saveData("rhf_inputs", all);
}

/* ===============================
   PRICE SYSTEM (MARKUP)
   =============================== */

function calculatePrice(basePrice, markup) {
  return parseInt(basePrice) + parseInt(markup);
}

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

/* ===============================
   RENDER GAME LIST (INDEX / GAME)
   =============================== */

function renderGameList(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const games = getGames();
  container.innerHTML = "";

  games.forEach(game => {
    const card = document.createElement("div");
    card.className = "game-card";
    card.onclick = () => {
      window.location.href = `game-detail.html?id=${game.id}`;
    };

    card.innerHTML = `
      <img src="${game.logo}" alt="${game.name}">
      <h3>${game.name}</h3>
    `;

    container.appendChild(card);
  });
}

/* ===============================
   GAME DETAIL LOAD
   =============================== */

function loadGameDetail() {
  const params = new URLSearchParams(window.location.search);
  const gameId = params.get("id");

  const games = getGames();
  const game = games.find(g => g.id === gameId);
  if (!game) return;

  document.getElementById("gameName").innerText = game.name;
  document.getElementById("gameLogo").src = game.logo;

  renderPackages(gameId);
  renderInputFields(gameId);
}

/* ===============================
   RENDER PACKAGES
   =============================== */

function renderPackages(gameId) {
  const list = document.getElementById("packageList");
  if (!list) return;

  const packages = getPackages(gameId);
  list.innerHTML = "";

  packages.forEach((pkg, index) => {
    const div = document.createElement("div");
    div.className = "package-card";
    div.onclick = () => selectPackage(gameId, index);

    div.innerHTML = `
      <h4>${pkg.name}</h4>
      <p>${formatRupiah(pkg.finalPrice)}</p>
    `;

    list.appendChild(div);
  });
}

let selectedPackage = null;

function selectPackage(gameId, index) {
  const packages = getPackages(gameId);
  selectedPackage = packages[index];

  document.querySelectorAll(".package-card").forEach(el => {
    el.classList.remove("active");
  });

  document.querySelectorAll(".package-card")[index].classList.add("active");

  document.getElementById("selectedPrice").innerText =
    formatRupiah(selectedPackage.finalPrice);
}

/* ===============================
   INPUT FIELD RENDER
   =============================== */

function renderInputFields(gameId) {
  const wrapper = document.getElementById("inputFields");
  if (!wrapper) return;

  const inputs = getInputConfig(gameId);
  wrapper.innerHTML = "";

  inputs.forEach(input => {
    const div = document.createElement("div");
    div.className = "form-group";

    div.innerHTML = `
      <label>${input.label}</label>
      <input type="text" placeholder="${input.placeholder}" required>
    `;

    wrapper.appendChild(div);
  });
}

/* ===============================
   CHECKOUT PROCESS
   =============================== */

function submitOrder() {
  if (!selectedPackage) {
    alert("Pilih paket terlebih dahulu");
    return;
  }

  const inputs = document.querySelectorAll("#inputFields input");
  let data = [];

  inputs.forEach(input => {
    if (!input.value) {
      alert("Semua data harus diisi");
      throw new Error("Input kosong");
    }
    data.push(input.value);
  });

  const order = {
    id: "RHF-" + Date.now(),
    package: selectedPackage,
    inputs: data,
    status: "PENDING",
    time: new Date().toLocaleString("id-ID"),
  };

  const orders = loadData("rhf_orders", []);
  orders.push(order);
  saveData("rhf_orders", orders);

  window.location.href = "checkout.html";
}

/* ===============================
   ADMIN AUTH
   =============================== */

function adminLogin(password) {
  if (password === RHF_CONFIG.adminPassword) {
    sessionStorage.setItem("rhf_admin", "true");
    window.location.href = "admin.html";
  } else {
    alert("Password salah");
  }
}

function checkAdmin() {
  if (!sessionStorage.getItem("rhf_admin")) {
    window.location.href = "login.html";
  }
}

/* ===============================
   ADMIN ORDER LIST
   =============================== */

function renderOrders() {
  const table = document.getElementById("orderTable");
  if (!table) return;

  const orders = loadData("rhf_orders", []);
  table.innerHTML = "";

  orders.forEach(order => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${order.id}</td>
      <td>${order.package.name}</td>
      <td>${order.inputs.join(" | ")}</td>
      <td>${formatRupiah(order.package.finalPrice)}</td>
      <td>${order.status}</td>
    `;
    table.appendChild(row);
  });
}
