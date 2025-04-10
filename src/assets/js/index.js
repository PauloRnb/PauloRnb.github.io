// Menu Mobile Functions

var btnMenu = document.getElementById('btn-menu'),
    btnClose = document.getElementById('btn-close'),
    boxMenu = document.getElementById('box-menu')


if (btnMenu) {
    btnMenu.addEventListener('click', () => {
        boxMenu.classList.add('right-[0]')
    })
}

// Hidden Menu Functions
if (btnClose) {
    btnClose.addEventListener('click', () => {
        boxMenu.classList.remove('right-[0]')
    })
}