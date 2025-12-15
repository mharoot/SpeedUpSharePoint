const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toggleBtn = document.getElementById("menuToggle");

function openMenu() {
  sidebar.classList.add("open");
  overlay.classList.add("show");
  toggleBtn.textContent = "✕";
}

function closeMenu() {
  sidebar.classList.remove("open");
  overlay.classList.remove("show");
  toggleBtn.textContent = "☰";
}

toggleBtn.addEventListener("click", () => {
  sidebar.classList.contains("open") ? closeMenu() : openMenu();
});
overlay.addEventListener("click", closeMenu);

function scrollToHero() {
  const basePath = "/"; // change if your site lives under a subdirectory
  if (window.location.pathname !== basePath) {
    window.location.href = window.location.origin + basePath;
    return;
  }

  const topbar = document.querySelector(".topbar");
  const home = document.getElementById("home");
  if (!topbar || !home) return;

  const h = topbar.offsetHeight;
  window.scrollTo({
    top: home.offsetTop - h,
    behavior: "smooth"
  });

  closeMenu();
}

// Handle all anchor links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const anchor = link.getAttribute("href");
    const basePath = "/"; // homepage path

    // Special case: Contact Us links
    if (anchor === "#contact") {
      const target = document.querySelector(anchor);
      if (!target) return;
      const h = document.querySelector(".topbar").offsetHeight;
      window.scrollTo({ top: target.offsetTop - h, behavior: "smooth" });
      closeMenu();
      return;
    }

    // Other anchors
    if (window.location.pathname === basePath) {
      // On homepage: smooth scroll
      const target = document.querySelector(anchor);
      if (!target) return;
      const h = document.querySelector(".topbar").offsetHeight;
      window.scrollTo({ top: target.offsetTop - h, behavior: "smooth" });
      closeMenu();
    } else {
      // Not on homepage: redirect with hash
      window.location.href = window.location.origin + basePath + anchor;
    }
  });
});
