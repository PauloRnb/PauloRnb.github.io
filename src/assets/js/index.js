
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

    const menus = [
        ['btn-menu', 'btn-close', 'box-menu', 'menu-backdrop'],
        ['btn-signature', 'btn-close-signature', 'box-menu-signature', 'menu-backdrop-signature'],
        ['btn-client', 'btn-close-client', 'box-menu-client', 'menu-backdrop-client'],
        ['btn-internet-residential', 'btn-close-internet-residential', 'box-menu-internet-residential', 'menu-backdrop-internet-residential'],
        ['btn-submenu', 'btn-closesubmenu', 'box-submenu', 'submenu-backdrop']
    ];

    menus.forEach(([btnOpenId, btnCloseId, boxId, backdropId]) => {
        const btnOpen = document.getElementById(btnOpenId);
        const btnClose = document.getElementById(btnCloseId);
        const box = document.getElementById(boxId);
        const backdrop = document.getElementById(backdropId);

        btnOpen?.addEventListener('click', () => openMenu(box, backdrop));
        btnClose?.addEventListener('click', () => closeMenu(box, backdrop));
        backdrop?.addEventListener('click', () => closeMenu(box, backdrop));
    });

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
