// ===== YEAR =====
const year = new Date().getFullYear();
document.querySelector('#year').textContent = year;

// ===== HAMBURGER MENU =====
const menuBtn = document.querySelector('#menu-btn');
const navLinks = document.querySelector('#nav-links');

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});