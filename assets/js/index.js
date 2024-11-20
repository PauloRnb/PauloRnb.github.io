const navigationMenu = document.getElementById('card-menu'),
      toggleNav = document.getElementById('menu-mobile'),
      closeNav = document.getElementById('menu-close')

/* Menu Show */
if(toggleNav) {
    toggleNav.addEventListener('click', () => {
        navigationMenu.classList.add('menu-show')
    })
}

/* Menu Hidden */
if(closeNav) {
    closeNav.addEventListener('click', () => {
        navigationMenu.classList.remove('menu-show')
    })
}