function loadNavbar() {
  const container = document.getElementById("navbar-container");
  if (!container) return;

  fetch("navbar.html")
    .then(res => res.text())
    .then(html => {
      container.innerHTML = html;
      initNavbar();
      updateCartCount();
    });
}

function initNavbar() {
  const navbar = document.getElementById("navbar");
  const hero2 = document.querySelector(".dark-section-2");

  if (!navbar) return;

  function updateNavbar() {
    if (!hero2) {
      navbar.classList.add("dark");
      return;
    }

    const isDark = window.scrollY < hero2.offsetTop + hero2.offsetHeight;
    navbar.classList.toggle("dark", isDark);
  }

  window.addEventListener("scroll", updateNavbar);
  window.addEventListener("load", updateNavbar);
}