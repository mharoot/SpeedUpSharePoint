// Determine the base path for GitHub Pages
let basePath = "/"; // Default for localhost
if (window.location.hostname === "mharoot.github.io") {
  basePath = "/SpeedUpSharePoint/";
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
  document.querySelectorAll('.topbar img, .sidebar-logo, .menu_title').forEach(img => {
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
  
    // Hero background image done in css
    const heroSection = document.getElementById("home");
    if (heroSection) {
      // Are we on the homepage?
    const isHomePage =
      window.location.pathname === basePath ||
      window.location.pathname === basePath + "index.html";

    if (isHomePage) {
      heroSection.classList.add("hero-enabled");

      const imagePath =
        basePath === "/"
          ? "/assets/images/speed-up-sharepoint-hero-image.jpg"
          : "/SpeedUpSharePoint/assets/images/speed-up-sharepoint-hero-image.jpg";

      heroSection.style.backgroundImage = `
        linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)),
        url("${imagePath}")
      `;
    } else {
      // Remove hero background on non-home pages
      heroSection.style.backgroundImage = "none";
    }
    }

    
      
  }

  updateAssets();
});


// ------------------------------------------------------------
// FIX: Handle direct hash loads & back/forward navigation
// (Does NOT modify existing click or redirect behavior)
// ------------------------------------------------------------

function scrollToHashWithOffset(hash) {
  if (!hash) return;

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
}

// When page loads WITH a hash (paste / refresh / external link)
window.addEventListener("load", () => {
  if (window.location.hash) {
    // Delay ensures layout, fonts, hero, CSS are fully applied
    setTimeout(() => {
      scrollToHashWithOffset(window.location.hash);
    }, 80);
  }
});

// When navigating via back/forward buttons
window.addEventListener("hashchange", () => {
  scrollToHashWithOffset(window.location.hash);
});



// Debounce helper: runs function after user stops resizing
function debounce(func, wait = 150) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// Handle responsive sidebar on resize
function handleSidebarResize() {
  const mobileBreakpoint = 768; // matches your CSS
  if (window.innerWidth > mobileBreakpoint) {
    // Desktop: close sidebar & overlay if open
    if (sidebar?.classList.contains("open")) {
      closeMenu();
    }
  } 
  // Optional: mobile side scrolling adjustments could go here
}

// Attach resize event with debounce
window.addEventListener("resize", debounce(handleSidebarResize, 200));

// ------------------------
// Optional: reset scroll position if sidebar content changes
// (keeps scrollable sidebar usable on resize)
function resetSidebarScroll() {
  if (sidebar) {
    sidebar.scrollTop = 0;
  }
}
