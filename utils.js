// utils.js - Versi Baru untuk RHF GAMES All-in-One Top Up (mirip Codashop & Tokogame)

// Format Rupiah (Rp 75.000)
function formatRupiah(angka) {
    if (!angka) return "Rp 0";
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(angka);
}

// Format amount/item (ex: 570 Diamonds, Rp 50.000 saldo DANA)
function formatAmount(amount, type = "item") {
    if (type === "pulsa" || type === "ewallet") {
        return "Rp " + Number(amount).toLocaleString("id-ID");
    }
    return amount; // ex: 570 Diamonds, 1000 UC, dll.
}

// Toast notification cantik (mirip popup Codashop)
function showToast(message, type = 'success') {
    // Hapus toast lama kalau ada
    const oldToast = document.querySelector('.rhf-toast');
    if (oldToast) oldToast.remove();

    const toast = document.createElement('div');
    toast.className = 'rhf-toast';
    toast.textContent = message;
    toast.style.position = 'fixed';
    toast.style.bottom = '30px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.background = type === 'success' ? '#00aa5b' : '#ff4444';
    toast.style.color = 'white';
    toast.style.padding = '16px 32px';
    toast.style.borderRadius = '50px';
    toast.style.boxShadow = '0 8px 25px rgba(0,0,0,0.3)';
    toast.style.zIndex = '9999';
    toast.style.fontSize = '18px';
    toast.style.fontWeight = '600';
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.4s ease';

    document.body.appendChild(toast);

    setTimeout(() => toast.style.opacity = '1', 100);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 400);
    }, 3500);
}

// Tambah ke keranjang (universal: game, e-wallet, pulsa)
function addToCart(productId, productData, selectedOption, inputValues = {}) {
    auth.onAuthStateChanged(user => {
        if (!user) {
            showToast("Login dulu untuk top up!", 'error');
            return;
        }

        const cartRef = db.collection("carts").doc(user.uid);

        const cartItem = {
            productId: productId,
            category: productData.category || "game",
            title: productData.title,
            image: productData.image,
            amount: selectedOption.amount || selectedOption.nominal,
            price: selectedOption.price,
            inputs: inputValues, // ex: { "User ID": "12345", "Zone": "6789" } atau { "Nomor HP": "08123..." }
            addedAt: firebase.firestore.FieldValue.serverTimestamp()
        };

        cartRef.set({
            [productId + "_" + Date.now()]: cartItem  // Unique key biar bisa multi item
        }, { merge: true }).then(() => {
            showToast(`${cartItem.amount} ${productData.title} berhasil ditambahkan ke keranjang!`, 'success');
        }).catch(error => {
            showToast("Gagal: " + error.message, 'error');
        });
    });
}

// Hapus dari keranjang
function removeFromCart(cartItemKey) {
    auth.onAuthStateChanged(user => {
        if (!user) return;

        if (confirm("Hapus item ini dari keranjang?")) {
            db.collection("carts").doc(user.uid).update({
                [cartItemKey]: firebase.firestore.FieldValue.delete()
            }).then(() => {
                showToast("Item dihapus dari keranjang", 'success');
            });
        }
    });
}

// Validasi semua input field terisi
function validateInputs(inputValues, requiredFields) {
    for (const field of requiredFields) {
        if (!inputValues[field] || inputValues[field].trim() === "") {
            return false;
        }
    }
    return true;
}

// Console info
console.log("utils.js versi baru loaded – RHF GAMES siap jadi all-in-one top up seperti Codashop & Tokogame! 🔥💎");
