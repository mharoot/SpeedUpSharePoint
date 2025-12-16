// Determine the base path for GitHub Pages
let basePath = "/"; // Default for localhost
if (window.location.hostname === "mharoot.github.io") {
  basePath = "/SpeedUpSharePoint/";
  var heroSection = document.getElementById('hero');
  heroSection.style = 'background-image:linear-gradient(rgba(0, 0, 0, 0.55),rgba(0, 0, 0, 0.55)),url("/assets/images/speed-up-sharepoint-hero-image.jpg")';
}

// Define the scrollToHero function globally
function scrollToHero() {
  if (window.location.hostname === "mharoot.github.io") {
    // If on GitHub Pages, set the correct base path
    basePath = "/SpeedUpSharePoint/";
  }

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

  // Close menu if open (can be defined elsewhere in your code)
  closeMenu();
}

// Define the scrollToHero function globally
function scrollToHeroThisIsDifferent() {
  const topbar = document.querySelector(".topbar");
  const home = document.getElementById("home");
  if (!topbar || !home) return;

  const offset = topbar.offsetHeight;

  // If not on the homepage, redirect first
  if (!window.location.pathname.endsWith("/index.html") && window.location.pathname !== basePath) {
    window.location.href = window.location.origin + basePath + "#home";
    return;
  }

  window.scrollTo({ top: home.offsetTop - offset, behavior: "smooth" });

  // Close menu if open
  closeMenu();
}

// Utility function to update links for GitHub Pages or localhost
function updateLinks() {
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    const path = link.getAttribute("href");
    if (!path.startsWith(basePath)) {
      link.setAttribute("href", basePath + path.replace(/^\/+/, ""));
    }
  });
}

// Sidebar & Menu toggling functionality
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const toggleBtn = document.getElementById("menuToggle");

function openMenu() {
  sidebar?.classList.add("open");
  overlay?.classList.add("show");
  if (toggleBtn) toggleBtn.textContent = "✕";
}

function closeMenu() {
  sidebar?.classList.remove("open");
  overlay?.classList.remove("show");
  if (toggleBtn) toggleBtn.textContent = "☰";
}

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", function () {
  // Update <base> tag dynamically
  const baseEl = document.getElementById('dynamic-base');
  if (baseEl) baseEl.setAttribute('href', basePath);

  console.log("Base Path: ", basePath);

  updateLinks();

  toggleBtn?.addEventListener("click", () => {
    sidebar.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlay?.addEventListener("click", closeMenu);

  // Attach scrollToHero to all logos
  document.querySelectorAll('.topbar img, .sidebar-logo').forEach(img => {
    img.addEventListener("click", scrollToHero);
  });

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const anchor = this.getAttribute("href");
      const target = document.querySelector(anchor);

      if (!target) {
        // If element not on current page, redirect
        window.location.href = basePath + anchor;
        return;
      }

      const offset = document.querySelector(".topbar")?.offsetHeight || 0;
      window.scrollTo({ top: target.offsetTop - offset, behavior: "smooth" });
      closeMenu();

      history.pushState(null, null, basePath + anchor);
    });
  });

  // FAQ links redirect properly
  document.querySelectorAll('a[href^="/pages/faq/"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");
      window.location.href = href.startsWith(basePath) ? window.location.origin + href : window.location.origin + basePath + href.replace(/^\/+/, "");
    });
  });

  // Update asset paths: favicons, JS, CSS, manifest
  function updateAssets() {
    // Favicons
    const favicons = ['favicon-16x16.png','favicon-32x32.png','favicon-96x96.png','favicon-128.png','favicon-196x196.png','favicon.ico'];
    favicons.forEach(favicon => {
      const link = document.querySelector(`link[rel="icon"][href$="${favicon}"]`);
      if (link) link.setAttribute('href', basePath + 'assets/images/' + favicon);
    });

    // CSS
    const cssFiles = ['style.css','faq.css','accordion.css','font-awesome-6.4.0-all.min.css'];
    cssFiles.forEach(css => {
      const link = document.querySelector(`link[href$="${css}"]`);
      if (link) link.setAttribute('href', basePath + 'assets/css/' + css);
    });

    // JS
    const jsFiles = ['main.js','accordion.js'];
    jsFiles.forEach(js => {
      const script = document.querySelector(`script[src$="${js}"]`);
      if (script) script.setAttribute('src', basePath + 'assets/js/' + js);
    });

    // Manifest
    const manifest = document.querySelector('link[rel="manifest"]');
    if (manifest) manifest.setAttribute('href', basePath + 'assets/images/site.webmanifest');
  }

  updateAssets();
});
