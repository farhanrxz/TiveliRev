function initPageTransition() {
  document.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", e => {
      if (link.hostname === window.location.hostname) {
        e.preventDefault();

        document.body.style.opacity = "0";

        setTimeout(() => {
          window.location.href = link.href;
        }, 250);
      }
    });
  });
}

function initHeroAnimation() {
  const sections = document.querySelectorAll(".hero-section");

  if (!sections.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  });

  sections.forEach(sec => observer.observe(sec));
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";

  const icon = document.createElement("div");
  icon.className = "toast-icon";

  icon.innerHTML = type === "success" ? "✓" : "!";

  const text = document.createElement("div");
  text.textContent = message;

  toast.appendChild(icon);
  toast.appendChild(text);
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hide");

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}