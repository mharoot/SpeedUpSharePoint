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
  const h = document.querySelector(".topbar").offsetHeight;
  window.scrollTo({ top: document.getElementById("home").offsetTop - h, behavior: "smooth" });
  closeMenu();
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    const h = document.querySelector(".topbar").offsetHeight;
    window.scrollTo({ top: target.offsetTop - h, behavior: "smooth" });
    closeMenu();
  });
});