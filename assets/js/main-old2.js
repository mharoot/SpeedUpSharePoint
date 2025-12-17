/* ============================================================
   Base Path (GitHub Pages vs Localhost)
============================================================ */
const isGitHubPages = window.location.hostname === "mharoot.github.io";
const basePath = isGitHubPages ? "/SpeedUpSharePoint/" : "/";

/* ============================================================
   Sidebar & Menu
============================================================ */
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

/* ============================================================
   Universal Scroll Helper
============================================================ */
function scrollToSection(hash, pushState = false) {
  if (!hash || !hash.startsWith("#")) return;

  const target = document.querySelector(hash);
  if (!target) return;

  const topbar = document.querySelector(".topbar");
  const offset = topbar ? topbar.offsetHeight : 0;

  const top =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  window.scrollTo({
    top,
    behavior: "smooth"
  });

  if (pushState) {
    history.pushState(null, "", basePath + hash);
  }
}

/* ============================================================
   Hero / Logo Click
============================================================ */
function scrollToHero() {
  const isHome =
    window.location.pathname === basePath ||
    window.location.pathname === basePath + "index.html";

  if (!isHome) {
    window.location.href = basePath + "#home";
    return;
  }

  scrollToSection("#home", true);
  closeMenu();
}

/* ============================================================
   Update Internal Absolute Links
============================================================ */
function updateLinks() {
  document.querySelectorAll('a[href^="/"]').forEach(link => {
    const path = link.getAttribute("href");
    if (!path.startsWith(basePath)) {
      link.setAttribute("href", basePath + path.replace(/^\/+/, ""));
    }
  });
}

/* ============================================================
   Assets & Hero Background
============================================================ */
function updateAssets() {
  // Favicons
  const favicons = [
    "favicon-16x16.png",
    "favicon-32x32.png",
    "favicon-96x96.png",
    "favicon-128.png",
    "favicon-196x196.png",
    "favicon.ico"
  ];

  favicons.forEach(favicon => {
    const link = document.querySelector(
      `link[rel="icon"][href$="${favicon}"]`
    );
    if (link) link.href = basePath + "assets/images/" + favicon;
  });

  // CSS
  const cssFiles = [
    "style.css",
    "faq.css",
    "accordion.css",
    "font-awesome-6.4.0-all.min.css"
  ];

  cssFiles.forEach(css => {
    const link = document.querySelector(`link[href$="${css}"]`);
    if (link) link.href = basePath + "assets/css/" + css;
  });

  // JS
  const jsFiles = ["main.js", "accordion.js"];

  jsFiles.forEach(js => {
    const script = document.querySelector(`script[src$="${js}"]`);
    if (script) script.src = basePath + "assets/js/" + js;
  });

  // Manifest
  const manifest = document.querySelector('link[rel="manifest"]');
  if (manifest) manifest.href = basePath + "assets/images/site.webmanifest";

  // Hero Background
  const hero = document.getElementById("home");
  if (!hero) return;

  const isHome =
    window.location.pathname === basePath ||
    window.location.pathname === basePath + "index.html";

  if (isHome) {
    hero.classList.add("hero-enabled");

    hero.style.backgroundImage = `
      linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
      url("${basePath}assets/images/speed-up-sharepoint-hero-image.jpg")
    `;
  } else {
    hero.style.backgroundImage = "none";
  }
}

/* ============================================================
   DOM Ready
============================================================ */
document.addEventListener("DOMContentLoaded", () => {
  // Dynamic <base> tag
  const baseEl = document.getElementById("dynamic-base");
  if (baseEl) baseEl.href = basePath;

  updateLinks();
  updateAssets();

  // Menu toggle
  toggleBtn?.addEventListener("click", () => {
    sidebar.classList.contains("open") ? closeMenu() : openMenu();
  });

  overlay?.addEventListener("click", closeMenu);

  // Logo / hero clicks
  document
    .querySelectorAll(".topbar img, .sidebar-logo")
    .forEach(el => el.addEventListener("click", scrollToHero));

  // Internal anchor clicks
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const hash = link.getAttribute("href");

      const target = document.querySelector(hash);
      if (!target) {
        window.location.href = basePath + hash;
        return;
      }

      scrollToSection(hash, true);
      closeMenu();
    });
  });
});

/* ============================================================
   Handle Direct Hash Loads + Back/Forward
============================================================ */
window.addEventListener("load", () => {
  if (window.location.hash) {
    setTimeout(() => {
      scrollToSection(window.location.hash);
    }, 80);
  }
});

window.addEventListener("hashchange", () => {
  scrollToSection(window.location.hash);
});
