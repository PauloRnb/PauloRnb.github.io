// Dropdown
var btnSize = document.getElementById('letter-size'),
    closeSize = document.getElementById('close-click-hidden'),
    boxDropdown = document.getElementById('items-click-hidden')
// Menu Mobile
var menuMb = document.getElementById('menu-mobile'),
    closeMb = document.getElementById('close-mobile'),
    menuCard = document.getElementById('menu-mobile-card-items')
//Sub Menu Mobile
var subAcess = document.getElementById('submenu-mobile'),
    subMenu = document.getElementById('menu-acessibility'),
    closeAcess = document.getElementById('close-mobile-mb')


// Dropdown
if (btnSize) {
    btnSize.addEventListener('click', () => {
        boxDropdown.classList.add('open-dropdown')
    })
}

// Hidden

if (closeSize) {
    closeSize.addEventListener('click', () => {
        boxDropdown.classList.remove('open-dropdown')
    })
}

// Menu Mobile
if (menuMb) {
    menuMb.addEventListener('click', () => {
        menuCard.classList.add('open-menu')
    })
}

// Hidden
if (closeMb) {
    closeMb.addEventListener('click', () => {
        menuCard.classList.remove('open-menu')
    })
}

// Sub Menu Mobile
if (subAcess) {
    subAcess.addEventListener('click', () => {
        subMenu.classList.add('open-menu-mb')
    })
}

// Hiden
if (closeAcess) {
    closeAcess.addEventListener('click', () => {
        subMenu.classList.remove('open-menu-mb')
    })
}

// Swipper
const swiper = new Swiper('.swiper', {
    loop: true,
    grabCursor: true,
    effect: "fade",
    autoplay: {
        delay: 2500,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});