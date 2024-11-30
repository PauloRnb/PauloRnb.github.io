var navMenu = document.getElementById('card-menu'),
    toggleMenu = document.getElementById('toggle-menu'),
    closeMenu = document.getElementById('close-menu')

// Show Menu
if (toggleMenu) {
    toggleMenu.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

// Hidden Menu
if(closeMenu) {
    closeMenu.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

    