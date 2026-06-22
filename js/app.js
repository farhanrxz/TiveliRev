document.addEventListener("DOMContentLoaded", () => {
  document.body.style.opacity = "1";

  initPageTransition();
  loadNavbar();
  initHeroAnimation();

  updateCartCount();
  updateStickyTotalCheckout();

  loadProductDetail();
  loadCart();

  initProductClick();
})

function initProductClick() {
  document.querySelectorAll(".product-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;

      window.location.href = `product-detail.html?id=${id}`;
    });
  });
}

function goDetail(id) {
  window.location.href = `product-detail.html?id=${id}`;
};