const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const buyBtnMain = document.getElementById('buy-vnst-btn');
const buyBtnHero = document.getElementById('buy-vnst-btn-hero');

hamburger.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});

// Scroll highlight active menu
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navLinks.forEach(lnk => lnk.classList.remove('active'));
    link.classList.add('active');
  });
});

// Buy VNST button open embedded swap section on page scroll
buyBtnMain.addEventListener('click', () => {
  document.querySelector('.swap-embed').scrollIntoView({ behavior: 'smooth' });
});

buyBtnHero.addEventListener('click', () => {
  document.querySelector('.swap-embed').scrollIntoView({ behavior: 'smooth' });
});
