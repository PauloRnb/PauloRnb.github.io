document.addEventListener('DOMContentLoaded', () => {
    function lockScroll() {
        document.body.classList.add('overflow-hidden');
        document.documentElement.classList.add('overflow-hidden');
    }

    function unlockScroll() {
        document.body.classList.remove('overflow-hidden');
        document.documentElement.classList.remove('overflow-hidden');
    }

    function openMenu(menu, backdrop) {
        menu?.classList.remove('translate-x-full', 'opacity-0', 'pointer-events-none');
        menu?.classList.add('translate-x-0', 'opacity-100');
        backdrop?.classList.remove('hidden');
        lockScroll();
    }

    function closeMenu(menu, backdrop) {
        menu?.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
        menu?.classList.remove('translate-x-0', 'opacity-100');
        backdrop?.classList.add('hidden');
        unlockScroll();
    }

    // === MENU MOBILE 1 ===
    const btnMenu = document.getElementById('btn-menu');
    const btnClose = document.getElementById('btn-close');
    const boxMenu = document.getElementById('box-menu');
    const backdrop = document.getElementById('menu-backdrop');

    btnMenu?.addEventListener('click', () => requestIdleCallback(() => openMenu(boxMenu, backdrop)));
    btnClose?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxMenu, backdrop)));
    backdrop?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxMenu, backdrop)));

    // === MENU MOBILE 2 ===
    const btnSignature = document.getElementById('btn-signature');
    const btnSignatureClose = document.getElementById('btn-close-signature');
    const boxSignatureMenu = document.getElementById('box-menu-signature');
    const backdropSignature = document.getElementById('menu-backdrop-signature');

    btnSignature?.addEventListener('click', () => requestIdleCallback(() => openMenu(boxSignatureMenu, backdropSignature)));
    btnSignatureClose?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxSignatureMenu, backdropSignature)));
    backdropSignature?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxSignatureMenu, backdropSignature)));

    // === MENU MOBILE 3 ===
    const btnClient = document.getElementById('btn-client');
    const btnClientClose = document.getElementById('btn-close-client');
    const boxClientMenu = document.getElementById('box-menu-client');
    const backdropClient = document.getElementById('menu-backdrop-client');

    btnClient?.addEventListener('click', () => requestIdleCallback(() => openMenu(boxClientMenu, backdropClient)));
    btnClientClose?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxClientMenu, backdropClient)));
    backdropClient?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxClientMenu, backdropClient)));

    // === MENU MOBILE 4 ===
    const btnResidential = document.getElementById('btn-internet-residential');
    const btnResidentialClose = document.getElementById('btn-close-internet-residential');
    const boxResidentialMenu = document.getElementById('box-menu-internet-residential');
    const backdropResidential = document.getElementById('menu-backdrop-internet-residential');

    btnResidential?.addEventListener('click', () => requestIdleCallback(() => openMenu(boxResidentialMenu, backdropResidential)));
    btnResidentialClose?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxResidentialMenu, backdropResidential)));
    backdropResidential?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxResidentialMenu, backdropResidential)));

    // === SUBMENU MOBILE ===
    const btnSubmenu = document.getElementById('btn-submenu');
    const btnCloseSubmenu = document.getElementById('btn-closesubmenu');
    const boxSubmenu = document.getElementById('box-submenu');
    const backdropSubmenu = document.getElementById('submenu-backdrop');

    btnSubmenu?.addEventListener('click', () => requestIdleCallback(() => openMenu(boxSubmenu, backdropSubmenu)));
    btnCloseSubmenu?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxSubmenu, backdropSubmenu)));
    backdropSubmenu?.addEventListener('click', () => requestIdleCallback(() => closeMenu(boxSubmenu, backdropSubmenu)));

    // === DROPDOWN ===
    const triggers = document.querySelectorAll('[data-dropdown]');

    triggers.forEach(trigger => {
        const key = trigger.getAttribute('data-dropdown');
        const dropdown = document.querySelector(`[data-dropdown-target="${key}"]`);

        if (!dropdown) return;

        let isOpen = false;
        let justTouched = false;
        let hoverTimeout;

        const showDropdown = () => {
            dropdown.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
            dropdown.classList.add('opacity-100', 'visible', 'pointer-events-auto');
            isOpen = true;
        };

        const hideDropdown = () => {
            dropdown.classList.add('opacity-0', 'invisible', 'pointer-events-none');
            dropdown.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
            isOpen = false;
        };

        trigger.addEventListener('click', (e) => {
            if (justTouched) return;
            e.stopPropagation();
            isOpen ? hideDropdown() : showDropdown();
        });

        trigger.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            justTouched = true;
            isOpen ? hideDropdown() : showDropdown();
            setTimeout(() => justTouched = false, 400);
        }, { passive: true });

        trigger.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                clearTimeout(hoverTimeout);
                showDropdown();
            }
        });

        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) clearTimeout(hoverTimeout);
        });

        trigger.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                hoverTimeout = setTimeout(() => {
                    if (!dropdown.matches(':hover')) hideDropdown();
                }, 50);
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                hoverTimeout = setTimeout(() => {
                    if (!trigger.matches(':hover')) hideDropdown();
                }, 50);
            }
        });

        document.addEventListener('click', (e) => {
            if (!trigger.contains(e.target) && !dropdown.contains(e.target)) hideDropdown();
        });

        document.addEventListener('touchstart', (e) => {
            if (!trigger.contains(e.target) && !dropdown.contains(e.target)) hideDropdown();
        }, { passive: true });
    });

    // === DARK MODE ===
    const toggleDark = document.getElementById('toggleDark');
    toggleDark?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    // === MODAL ===
    const openBtn = document.getElementById("open-modal");
    const closeBtn = document.getElementById("close-modal");
    const modal = document.getElementById("modal-window");

    openBtn?.addEventListener('click', () => {
        modal?.classList.remove('hidden');
    });

    closeBtn?.addEventListener('click', () => {
        modal?.classList.add('hidden');
    });

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) modal.classList.add("hidden");
    });
});

var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    effect: "fade",
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});
