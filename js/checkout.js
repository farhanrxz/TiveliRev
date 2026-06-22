document.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("paymentMethod");

  if (saved) {
    document.getElementById("selected-payment").textContent = saved;
    document.getElementById("payment-icon").src = paymentIcons[saved];
  }
});

function updateCheckoutButton() {
  const btn = document.querySelector(".btn-checkout");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (!btn) return;

  btn.disabled = cart.length === 0;
}

function goCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    showToast("Your cart is empty", "warning");
    return;
  }

  window.location.href = "checkout.html";
}

function loadCheckout() {
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!container) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  container.innerHTML = "";

  cart.forEach(item => {
    const price = item.price || 0;
    const qty = item.qty || 1;
    const subtotal = price * qty;

    total += subtotal;

    container.innerHTML += `
    <div class="checkout-item">

        <img src="${item.image}" class="checkout-img">

        <div class="checkout-info">
          <div class="checkout-name">${item.name}</div>

          <div class="checkout-meta">
            <span>Rp ${price.toLocaleString()} / item</span>
            <span>Qty: ${qty}</span>
          </div>
        </div>

        <div class="checkout-subtotal">
          Rp ${subtotal.toLocaleString()}
        </div>

    </div>
    `;
  });

  totalEl.textContent = "Total: Rp " + total.toLocaleString();
}

function placeOrder() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const payment = localStorage.getItem("paymentMethod");

    if (!name || !phone || !address) {
        showToast("Please fill all fields", "warning");
        return;
    }

    if (!payment) {
        showToast("Please select payment method", "warning");
        return;
    }

    const method = localStorage.getItem("paymentMethod") || "QRIS";

  const modal = document.getElementById("payment-process");
  const title = document.getElementById("process-title");
  const sub = document.getElementById("process-sub");

  modal.classList.remove("hidden");

  // STEP 1

        paymentSuccess();
}

const paymentIcons = {
  "ShopeePay": "https://img.icons8.com/color/48/shopee.png",
  "QRIS": "assets/icons/qris-white.png",
  "Bank BCA": "assets/icons/bca.svg",
  "Bank BRI": "assets/icons/bri.svg",
  "Bank Mandiri": "assets/icons/mandiri.svg",
  "Virtual Account": "https://img.icons8.com/fluency/48/receipt.png",
  "Debit / Credit Card": "https://img.icons8.com/fluency/48/bank-card-front-side.png",
  "Cash on Delivery": "https://icons8.com/icon/xGP5FK2yfiS5/cash-on-delivery"
};

function openPaymentModal() {
  console.log("CLICKED"); // debug
  document.getElementById("payment-modal").classList.add("show");
}

function closePaymentModal() {
  document.getElementById("payment-modal").classList.remove("show");
}

function selectPayment(method, el) {
  // remove active
  document.querySelectorAll(".pay-item").forEach(i => i.classList.remove("active"));

  // set active
  el.classList.add("active");

  // update UI
  document.getElementById("selected-payment").textContent = method;
  document.getElementById("payment-icon").src = paymentIcons[method];

  // save
  localStorage.setItem("paymentMethod", method);

  closePaymentModal();
}

function goToPayment() {
  window.location.href = "payment.html";
}

function paymentSuccess() {
  const orderId = "ORD-" + Math.floor(Math.random() * 99999999);

  const modal = document.getElementById("success-modal");
  const orderText = document.getElementById("order-id");

  orderText.textContent = "Order ID: " + orderId;

  modal.classList.remove("hidden");
    localStorage.removeItem("cart");
}

function backToCart() {
  localStorage.removeItem("cart");
  localStorage.setItem("cart", JSON.stringify([]));

  window.location.href = "cart.html";
}
