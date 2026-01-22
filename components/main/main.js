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

// ---------------- FOCUS TRAP FUNCTION ----------------
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
  );
  
  if (focusableElements.length === 0) return;
  
  const firstElement = focusableElements[0];
  const lastElement = focusableElements[focusableElements.length - 1];
  
  function handleKeydown(e) {
    if (e.key !== 'Tab') return;
    
    if (e.shiftKey && document.activeElement === firstElement) {
      e.preventDefault();
      lastElement.focus();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      e.preventDefault();
      firstElement.focus();
    }
  }
  
  element.addEventListener('keydown', handleKeydown);
  
  // Store cleanup function
  element._focusTrapCleanup = () => {
    element.removeEventListener('keydown', handleKeydown);
  };
  
  // Focus first element
  firstElement.focus();
}

// ---------------- OPEN MENU WITH ARIA ----------------
function openMenu() {
  sidebar?.classList.add("open");
  sidebar?.setAttribute("aria-hidden", "false");
  overlay?.classList.add("show");
  overlay?.setAttribute("aria-hidden", "false");
  overlay?.setAttribute("tabindex", "0");
  overlay?.setAttribute("aria-label", "Close menu overlay");
  
  if (toggleBtn) {
    toggleBtn.textContent = "✕";
    toggleBtn.setAttribute("aria-expanded", "true");
    toggleBtn.setAttribute("aria-label", "Close navigation menu");
  }
  
  // Trap focus in sidebar
  if (sidebar) {
    trapFocus(sidebar);
  }
}

// ---------------- CLOSE MENU WITH ARIA ----------------
function closeMenu() {
  sidebar?.classList.remove("open");
  sidebar?.setAttribute("aria-hidden", "true");
  overlay?.classList.remove("show");
  overlay?.setAttribute("aria-hidden", "true");
  overlay?.removeAttribute("tabindex");
  overlay?.removeAttribute("aria-label");
  
  if (toggleBtn) {
    toggleBtn.textContent = "☰";
    toggleBtn.setAttribute("aria-expanded", "false");
    toggleBtn.setAttribute("aria-label", "Open navigation menu");
  }
  
  // Clean up focus trap
  if (sidebar && sidebar._focusTrapCleanup) {
    sidebar._focusTrapCleanup();
  }
  
  // Return focus to toggle button
  toggleBtn?.focus();
}

// Wait for DOM content to load
document.addEventListener("DOMContentLoaded", function () {
  // Update <base> tag dynamically
  const baseEl = document.getElementById('dynamic-base');
  if (baseEl) baseEl.setAttribute('href', basePath);

  console.log("Base Path: ", basePath);

  updateLinks();

  // ---------------- FIX #3: ADD ARIA ATTRIBUTES ----------------
  // Add ARIA to menu toggle
  if (toggleBtn) {
    toggleBtn.setAttribute('aria-label', 'Open navigation menu');
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', 'sidebar');
  }
  
  // Add ARIA to sidebar
  if (sidebar) {
    sidebar.setAttribute('role', 'navigation');
    sidebar.setAttribute('aria-label', 'Mobile navigation');
    sidebar.setAttribute('aria-hidden', 'true');
  }
  
  // Add ARIA to overlay
  if (overlay) {
    overlay.setAttribute('aria-hidden', 'true');
  }

  // ---------------- FIX #10: ADD ARIA LABELS TO NAVIGATION ----------------
  // Main navigation
  const topnav = document.querySelector('.topnav');
  if (topnav) {
    topnav.setAttribute('role', 'navigation');
    topnav.setAttribute('aria-label', 'Main navigation');
  }
  
  // Footer navigation
  const footerNav = document.querySelector('.footer-nav');
  if (footerNav) {
    footerNav.setAttribute('role', 'navigation');
    footerNav.setAttribute('aria-label', 'Legal navigation');
  }

  // ---------------- FIX #5: ADD ARIA-HIDDEN TO ALL ICONS ----------------
  // Add aria-hidden="true" to all Font Awesome icons
  document.querySelectorAll('i[class*="fa-"]').forEach(icon => {
    icon.setAttribute('aria-hidden', 'true');
  });
  
  // Service icons
  document.querySelectorAll('.service i, .principle i, .icon-item i').forEach(icon => {
    icon.setAttribute('aria-hidden', 'true');
  });
  
  // Contact icons
  document.querySelectorAll('.contact-box i').forEach(icon => {
    icon.setAttribute('aria-hidden', 'true');
  });
  
  // Social media icons
  document.querySelectorAll('footer i[class*="fa-"]').forEach(icon => {
    icon.setAttribute('aria-hidden', 'true');
  });

  // ---------------- FIX #4: MAKE IMAGES KEYBOARD ACCESSIBLE ----------------
  // Topbar logo
  const topbarLogo = document.querySelector('.topbar img');
  if (topbarLogo) {
    topbarLogo.setAttribute('tabindex', '0');
    topbarLogo.setAttribute('role', 'button');
    topbarLogo.setAttribute('aria-label', 'Scroll to home section');
    topbarLogo.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToHero();
      }
    });
  }
  
  // Sidebar logo
  const sidebarLogo = document.querySelector('.sidebar-logo');
  if (sidebarLogo) {
    sidebarLogo.setAttribute('tabindex', '0');
    sidebarLogo.setAttribute('role', 'button');
    sidebarLogo.setAttribute('aria-label', 'Scroll to home section');
    sidebarLogo.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToHero();
      }
    });
  }
  
  // Menu titles (clickable text)
  document.querySelectorAll('.menu_title').forEach(title => {
    title.setAttribute('tabindex', '0');
    title.setAttribute('role', 'button');
    title.setAttribute('aria-label', 'Scroll to home section');
    title.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToHero();
      }
    });
  });
  
  // Contact box logo
  const contactLogo = document.querySelector('#contact img');
  if (contactLogo) {
    contactLogo.setAttribute('tabindex', '0');
    contactLogo.setAttribute('role', 'button');
    contactLogo.setAttribute('aria-label', 'Scroll to home section');
    contactLogo.addEventListener('keydown', function(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollToHero();
      }
    });
  }

  // ---------------- FIX #8: ADD SKIP TO MAIN CONTENT LINK ----------------
  const skipLink = document.createElement('a');
  skipLink.href = '#content';
  skipLink.className = 'skip-link';
  skipLink.textContent = 'Skip to main content';
  skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--primary, #011021);
    color: var(--secondary, #fefcc8);
    padding: 8px 16px;
    text-decoration: none;
    z-index: 10000;
    font-weight: bold;
    transition: top 0.2s ease;
  `;
  
  skipLink.addEventListener('focus', function() {
    this.style.top = '0';
  });
  
  skipLink.addEventListener('blur', function() {
    this.style.top = '-40px';
  });
  
  document.body.insertBefore(skipLink, document.body.firstChild);
  
  // Wrap main content in <main> tag if not already present
  let mainElement = document.querySelector('main');
  if (!mainElement) {
    mainElement = document.createElement('main');
    mainElement.id = 'content';
    mainElement.setAttribute('role', 'main');
    
    // Move all sections into main
    const sections = document.querySelectorAll('section:not(#accessibilityWidget):not(#accessibilityTrigger)');
    sections.forEach(section => {
      mainElement.appendChild(section);
    });
    
    // Insert main after header
    const header = document.querySelector('header');
    if (header && header.nextSibling) {
      header.parentNode.insertBefore(mainElement, header.nextSibling);
    }
  }

  // Menu toggle handler
  toggleBtn?.addEventListener("click", () => {
    sidebar.classList.contains("open") ? closeMenu() : openMenu();
  });

  // ---------------- FIX #9: KEYBOARD ACCESSIBLE OVERLAY CLOSE ----------------
  // Overlay click handler
  overlay?.addEventListener("click", closeMenu);
  
  // Overlay keyboard handler
  overlay?.addEventListener("keydown", (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      closeMenu();
    }
  });
  
  // Escape key handler for closing sidebar
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar?.classList.contains('open')) {
      closeMenu();
    }
  });

  // Attach scrollToHero to all logos
  document.querySelectorAll('.topbar img, .sidebar-logo, .menu_title, #contact img').forEach(img => {
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
}

// Attach resize event with debounce
window.addEventListener("resize", debounce(handleSidebarResize, 200));

// Optional: reset scroll position if sidebar content changes
function resetSidebarScroll() {
  if (sidebar) {
    sidebar.scrollTop = 0;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("figure.architecture-diagram").forEach(figure => {
    const link = figure.querySelector("a[href]");
    const figcaption = figure.querySelector("figcaption");

    if (!link || !figcaption) return;

    const href = link.getAttribute("href");

    figcaption.style.cursor = "pointer";
    figcaption.setAttribute("role", "link");
    figcaption.setAttribute("tabindex", "0");

    figcaption.addEventListener("click", () => {
      window.open(href, "_blank");
    });

    figcaption.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        window.open(href, "_blank");
      }
    });
  });
});