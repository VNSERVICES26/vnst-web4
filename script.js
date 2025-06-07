function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

function openSwap() {
  const swapSection = document.getElementById("swap-section");
  swapSection.scrollIntoView({ behavior: "smooth" });
}
