// burger.js - единый скрипт для всех страниц
document.addEventListener('DOMContentLoaded', function() {
    initBurgerMenu();
});

function initBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileNav = document.querySelector('.mobile-nav');
    const overlay = document.querySelector('.overlay');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Проверяем, есть ли элементы на странице
    if (!burgerMenu || !mobileNav || !overlay) {
        console.log('Бургер-меню не найдено на этой странице');
        return;
    }

    // Функция открытия/закрытия меню
    function toggleMenu() {
        const isOpening = !mobileNav.classList.contains('active');
        
        burgerMenu.classList.toggle('active');
        mobileNav.classList.toggle('active');
        overlay.classList.toggle('active');
        
        if (isOpening) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }
    }

    // Функция закрытия меню
    function closeMenu() {
        burgerMenu.classList.remove('active');
        mobileNav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Открытие/закрытие по клику на бургер
    burgerMenu.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Закрытие по клику на overlay
    overlay.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        closeMenu();
    });

    // Закрытие по клику на ссылки в меню
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(closeMenu, 300);
        });
    });

    // Закрытие по клику вне меню
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !burgerMenu.contains(e.target)) {
            closeMenu();
        }
    });

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMenu();
        }
    });

    console.log('Бургер-меню инициализировано');
}