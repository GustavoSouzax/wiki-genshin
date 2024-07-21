document.getElementById('menu-icon').addEventListener('click', function() {
    var menu = document.querySelector('header nav.menu-mobile');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
});