// Menu Mobile Functions
document.addEventListener('DOMContentLoaded', () => {
    var btnMenu = document.getElementById('btn-menu');
    var btnClose = document.getElementById('btn-close');
    var boxMenu = document.getElementById('box-menu');

    // Open Menu Functions
    btnMenu.addEventListener('click', () => {
        boxMenu.classList.add('right-[0]');
    });

    // Hidden Menu Functions
    btnClose.addEventListener('click', () => {
        boxMenu.classList.remove('right-[0]');
    });
});


// Sub Menu Mobile Functions
document.addEventListener('DOMContentLoaded', () => {
    var btnSubmenu = document.getElementById('btn-submenu');
    var btnCloseSubmenu = document.getElementById('btn-closesubmenu');
    var boxSubmenu = document.getElementById('box-submenu');

    // Open Menu Functions
    btnSubmenu.addEventListener('click', () => {
        boxSubmenu.classList.add('right-[0]');
    });

    // Hidden Menu Functions
    btnCloseSubmenu.addEventListener('click', () => {
        boxSubmenu.classList.remove('right-[0]');
    });
});

// Modal 001 Functions
document.addEventListener('DOMContentLoaded', () => {
    const openModal = document.getElementById('open-modal');
    const closeModal = document.getElementById('close-modal');
    const modalWindow = document.getElementById('modal-window');

    // Close Modal Functions
    openModal.addEventListener('click', () => {
        modalWindow.classList.remove('hidden');
    });

    // Open Modal Functions
    closeModal.addEventListener('click', () => {
        modalWindow.classList.add('hidden');
    });
});
