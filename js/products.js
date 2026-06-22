const PRODUCTS = {
  cadbury: {
    name: "Cadbury Cherry Ripe Minis",
    price: "Rp 235.000",
    image: "assets/products/cherryripe.jpg",
    desc: "Cadbury Cherry Ripe Minis are bite-sized versions of Australia’s oldest and most iconic chocolate bar. They combine juicy cherries and moist coconut coated in rich Old Gold dark chocolate. These treats are typically sold in sharing bags or multipacks, offering a portion-controlled way to enjoy the classic flavor profile."
  },
  labubu: {
    name: "Popmart Labubu Constellation",
    price: "Rp 165.000",
    image: "assets/products/labubu.jpg",
    desc: "The POP MART The Monsters Constellation Series is a highly sought-after blind box collection by artist Kasing Lung, featuring the viral character Labubu dressed up as the different signs of the zodiac."
  },
  ralph: {
    name: "Ralph Lauren American Flag Sweater",
    price: "Rp 1.300.000",
    image: "assets/products/polo ralph.jpg",
    desc: "The Ralph Lauren American Flag Sweater, officially known as The Iconic Flag Sweater, is one of the most celebrated and permanent staples of American style. First introduced in 1989 under the Polo Country line, it has evolved from a runway piece inspired by early American folk art into a timeless cultural icon."
  },
  scuderia: {
    name: "Scuderia Ferrari Drivers Tee Men",
    price: "Rp 1.499.000",
    image: "assets/products/scuderia.jpg",
    desc: "The PUMA Scuderia Ferrari 2025 Drivers Tee Men is an officially licensed Formula 1 t-shirt celebrating the 20th anniversary of the PUMA and Scuderia Ferrari HP partnership. Part of the 2025 Replica Collection, its styling is directly inspired by the personal aesthetics and trackside gear of the official Ferrari driver lineup."
  },
  kosas: {
    name: "Kosas Mini Revealer",
    price: "Rp 132.000",
    image: "assets/products/kosas.jpg",
    desc: "The Kosas Mini Revealer Concealer is a highly popular, 3-in-1 skincare-infused makeup product that acts as a medium-coverage concealer, eye cream, and spot treatment all in one. The mini travel size contains 0.06 fl oz (2 mL) of product, making it ideal for trying out the formula or tossing into a small bag."
  }
}

function loadProductDetail() {
  const id = new URLSearchParams(window.location.search).get("id");

  if (!id || !PRODUCTS[id]) return;
  const p = PRODUCTS[id];

  const img = document.getElementById("productImage");
  const name = document.getElementById("productName");
  const price = document.getElementById("productPrice");
  const desc = document.getElementById("productDesc");

  if (img) img.src = p.image;
  if (name) name.textContent = p.name;
  if (price) price.textContent = p.price;
  if (desc) desc.textContent = p.desc;
};

function goDetail(id) {
  window.location.href = `product-detail.html?id=${id}`;
}

window.PRODUCTS = PRODUCTS;