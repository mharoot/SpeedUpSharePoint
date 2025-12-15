document.addEventListener("DOMContentLoaded", () => {
  const accordions = document.querySelectorAll('.accordion-header');

  accordions.forEach((header, index) => {
    const content = header.nextElementSibling;

    // Open first item on page load
    if (index === 0) {
      header.classList.add('active');
      content.style.maxHeight = content.scrollHeight + "px";
    }

    header.addEventListener('click', () => {
      const isActive = header.classList.contains('active');

      // Close all other accordions
      accordions.forEach(h => {
        if (h !== header) {
          h.classList.remove('active');
          h.nextElementSibling.style.maxHeight = null;
        }
      });

      if (isActive) {
        content.style.maxHeight = null;
        header.classList.remove('active');
      } else {
        // Use scrollHeight, which already includes padding
        content.style.maxHeight = content.scrollHeight + "px";
        header.classList.add('active');
      }
    });
  });
});
