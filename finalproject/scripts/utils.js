// utils.js
export function initYear() {
  document.querySelector('#year').textContent = new Date().getFullYear();
}

export function initMenu() {
  const menuBtn = document.querySelector('#menu-btn');
  const navLinks = document.querySelector('#nav-links');
  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}