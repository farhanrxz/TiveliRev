function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCartFromDetail() {
  const productId = new URLSearchParams(window.location.search).get("id");

  if (!productId) return;

  const product = window.PRODUCTS?.[productId];
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let existing = cart.find(item => item.id === productId);

  const priceNumber = parseInt(String(product.price).replace(/[^0-9]/g, "")) || 0;

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: priceNumber,
      image: product.image,
      qty: 1
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();

  showToast("Products added to cart", "success");
}

function removeItem(index) {
  const items = document.querySelectorAll(".cart-item");

  const el = items[index];

  if (el) {
    el.classList.add("removing");
  }

  setTimeout(() => {
    let cart = getCart();

    cart.splice(index, 1);

    saveCart(cart);
    loadCart();
    updateCartCount();

    showToast("Product removed from cart", "remove");
  }, 300);
}

function updateCartCount() {
  const cart = getCart();

  const totalQty = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

  document.querySelectorAll("#cart-count").forEach(el => {
    el.textContent = totalQty;
  });

  updateStickyTotalCheckout();
}

function loadCart() {
  const container = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");
  const emptyEl = document.getElementById("cart-empty");

  if (!container) return;

  let cart = getCart();
  let total = 0;

  container.innerHTML = "";

  if (cart.length === 0) {
    if (emptyEl) emptyEl.classList.remove("hidden");
    if (totalEl) totalEl.style.display = "none";
    return;
  }

  if (emptyEl) emptyEl.classList.add("hidden");
  if (totalEl) totalEl.style.display = "block";

  cart.forEach((item, i) => {
    const price = item.price || 0;
    const qty = item.qty || 1;

    total += price * qty;

    container.innerHTML += `
      <div class="cart-item">
        <img class="cart-pointer" src="${item.image}" onclick="goDetail('${item.id}')">
        <div class="cart-info">
          <h3 class="cart-pointer" onclick="goDetail('${item.id}')">${item.name}</h3>
          <p class="cart-pointer" onclick="goDetail('${item.id}')">Rp ${price.toLocaleString()}</p>
          <div class="qty-control">
            <button class="btn-qty" onclick="changeQty(${i}, -1)">-</button>
            <span>${qty}</span>
            <button class="btn-qty" onclick="changeQty(${i}, 1)">+</button>
          </div>
        </div>
        <button class="btn-primary-cart" onclick="confirmRemove(${i})">Remove</button>
      </div>
    `;
  });

  if (totalEl) {
    totalEl.textContent = "Total: Rp " + total.toLocaleString();
  }
}

function changeQty(index, delta) {
  let cart = getCart();

  if (!cart[index]) return;

  const item = cart[index];

  if (delta === -1 && item.qty === 1) {
    confirmRemove(index);
    return;
  }

  item.qty += delta;

  if (item.qty <= 0) {
    confirmRemove(index);
    return;
  }

  saveCart(cart);
  loadCart();
  updateCartCount();
}

function updateStickyTotalCheckout() {
  const bar = document.querySelector(".checkout-sticky");
  const totalEl = document.getElementById("sticky-total");

  if (!bar || !totalEl) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    bar.classList.remove("show");
    return;
  }

  bar.classList.add("show");

  let total = 0;

  cart.forEach(item => {
    const price = item.price || 0;
    const qty = item.qty || 1;
    total += price * qty;
  });

  totalEl.textContent = "Rp " + total.toLocaleString();

  animatePrice(totalEl, total);
}

function animateCartUpdate() {
  const items = document.querySelectorAll(".cart-item");

  items.forEach((item, i) => {
    item.style.transform = "scale(0.98)";
    item.style.transition = "0.2s ease";

    setTimeout(() => {
      item.style.transform = "scale(1)";
    }, 120);
  });
}

function animatePrice(el, target) {
  const duration = 400;
  const start = parseInt(el.innerText.replace(/[^0-9]/g, "")) || 0;
  const startTime = performance.now();

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const value = Math.floor(start + (target - start) * progress);

    el.textContent = "Rp " + value.toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

let deleteIndex = null;

function confirmRemove(index) {
  deleteIndex = index;

  const modal = document.getElementById("confirm-modal");
  modal.classList.remove("hidden");
}

function closeModal() {
  const modal = document.getElementById("confirm-modal");
  modal.classList.add("hidden");

  deleteIndex = null;
}

document.addEventListener("DOMContentLoaded", () => {
  const cancelBtn = document.getElementById("cancel-btn");
  const confirmBtn = document.getElementById("confirm-btn");

  if (cancelBtn) {
    cancelBtn.addEventListener("click", closeModal);
  }

  if (confirmBtn) {
    confirmBtn.addEventListener("click", () => {
      if (deleteIndex === null) return;

      const items = document.querySelectorAll(".cart-item");
      const el = items[deleteIndex];

      if (el) el.classList.add("removing");

      setTimeout(() => {
        let cart = getCart();

        cart.splice(deleteIndex, 1);

        saveCart(cart);
        loadCart();
        updateCartCount();

        closeModal();

        showToast("Product removed from cart", "remove");
      }, 300);
    });
  }
});