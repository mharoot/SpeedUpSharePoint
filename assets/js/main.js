// Determine the base path for GitHub Pages
let basePath = "/"; // Default for localhost

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

  // Utility function to update links for GitHub Pages or localhost
  function updateLinks() {
    // Update all links with hrefs starting with /pages/faq/ to use the basePath
    document.querySelectorAll('a[href^="/pages/faq/"]').forEach(link => {
      const path = link.getAttribute("href");
      link.setAttribute("href", basePath + path.substring(1));  // Fix links dynamically
    });

    // Update any other relative links based on basePath
    document.querySelectorAll('a[href^="/"]').forEach(link => {
      const path = link.getAttribute("href");
      link.setAttribute("href", basePath + path.substring(1));  // Add basePath for all root-relative links
    });
  }

  // Sidebar & Menu toggling functionality
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





// Wait for the DOM to load before executing DOM manipulation logic
document.addEventListener("DOMContentLoaded", function () {
  if (window.location.hostname === "mharoot.github.io") {
    // If on GitHub Pages, set the correct base path
    basePath = "/SpeedUpSharePoint/";
    const base = document.getElementById('dynamic-base');
    if (base) {
      base.setAttribute('href', basePath);
    }
  }

  console.log("Base Path: ", basePath); // Log basePath for debugging

   updateLinks();

  toggleBtn.addEventListener("click", () => {
    sidebar.classList.contains("open") ? closeMenu() : openMenu();
  });
  overlay.addEventListener("click", closeMenu);

  // Attach the scrollToHero function to the header logo click event
  const logo = document.querySelector('.topbar img');
  if (logo) {
    logo.addEventListener("click", scrollToHero); // Attach the scrollToHero function
  }

  // Handle anchor links with smooth scrolling or redirect
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const anchor = link.getAttribute("href");

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

  // Handling redirect on FAQ link based on basePath
  document.querySelectorAll('a[href^="/pages/faq/"]').forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const href = link.getAttribute("href");

      // Check if href already contains basePath
      if (!href.startsWith(basePath)) {
        window.location.href = window.location.origin + basePath + href.substring(1);
      } else {
        window.location.href = window.location.origin + href;  // Already correct path
      }
    });
  });

  // Update asset paths (favicons, js, css)
  function updateAssets() {
    // Favicons
    const favicons = [
      'favicon-16x16.png', 'favicon-32x32.png', 'favicon-96x96.png',
      'favicon-128.png', 'favicon-196x196.png', 'favicon.ico'
    ];

    favicons.forEach(favicon => {
      const link = document.querySelector(`link[rel="icon"][href="assets/images/${favicon}"]`);
      if (link) {
        const newHref = basePath + 'assets/images/' + favicon;
        console.log(`Updating favicon: ${favicon} to ${newHref}`); // Log for debugging
        link.setAttribute('href', newHref);
      }
    });

    // JavaScript files
    const jsFiles = ['main.js'];
    jsFiles.forEach(jsFile => {
      const script = document.querySelector(`script[src="assets/js/${jsFile}"]`);
      if (script) {
        const newSrc = basePath + 'assets/js/' + jsFile;
        console.log(`Updating script: ${jsFile} to ${newSrc}`); // Log for debugging
        script.setAttribute('src', newSrc);
      }
    });

    // CSS files
    const cssFiles = ['style.css'];
    cssFiles.forEach(cssFile => {
      const link = document.querySelector(`link[href="assets/css/${cssFile}"]`);
      if (link) {
        const newHref = basePath + 'assets/css/' + cssFile;
        console.log(`Updating CSS: ${cssFile} to ${newHref}`); // Log for debugging
        link.setAttribute('href', newHref);
      }
    });
  }

  updateAssets();

  // Clear cache to ensure changes are reflected
  // (you might also want to test this by disabling cache in dev tools temporarily)
  // window.location.reload(true); // Uncomment if assets are still not updating
});
