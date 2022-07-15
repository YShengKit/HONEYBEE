const menuBar = document.querySelector('#mobile-menu')
const menuLinks = document.querySelector('.menu-bar')

menuBar.addEventListener('click', function(){
    menuBar.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})