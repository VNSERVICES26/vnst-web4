// script.js - V Network Services

// Mobile menu toggle
function toggleMenu() {
  const nav = document.getElementById("navLinks");
  nav.classList.toggle("active");
}

// Scroll animation for section elements
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".section, .whyjoin-image");
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

//
