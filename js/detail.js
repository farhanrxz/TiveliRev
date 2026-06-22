function loadProductDetail() {
  const id = new URLSearchParams(window.location.search).get("id");
  const product = PRODUCTS[id];

  if (!product) return;

  document.getElementById("productImage").src = product.image;
  document.getElementById("productName").textContent = product.name;
  document.getElementById("productPrice").textContent = product.price;
  document.getElementById("productDesc").textContent = product.desc;

  window.currentProductId = id;
}

function addToCartFromDetail() {
  addToCart(window.currentProductId);
}