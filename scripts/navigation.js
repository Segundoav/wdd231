const menuButton = document.getElementById('menu-button');
const navigation = document.getElementById('animate-me');

menuButton.addEventListener('click', () => {
    navigation.classList.toggle('open');
    menuButton.classList.toggle('open');
});