var cardList = document.getElementById('card-list'),
    closeMenu = document.getElementById('close-menu'),
    toggleMenu = document.getElementById('toggle-menu')

// Show menu

if (toggleMenu) {
    toggleMenu.addEventListener('click', (e) => {
        cardList.classList.add('show-menu')
    })
}

// Hidden menu
if(closeMenu) {
    closeMenu.addEventListener('click', (e) => {
        cardList.classList.remove('show-menu')
    })
}