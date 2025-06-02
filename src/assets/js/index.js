document.addEventListener('DOMContentLoaded', () => {
    // === MENU MOBILE ===
    const btnMenu = document.getElementById('btn-menu');
    const btnClose = document.getElementById('btn-close');
    const boxMenu = document.getElementById('box-menu');
    const backdrop = document.getElementById('menu-backdrop');

    btnMenu?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxMenu?.classList.add('right-[0]');
            backdrop?.classList.remove('hidden');
        });
    });

    btnClose?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxMenu?.classList.remove('right-[0]');
            backdrop?.classList.add('hidden');
        });
    });

    backdrop?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxMenu?.classList.remove('right-[0]');
            backdrop?.classList.add('hidden');
        });
    });

    // === MENU MOBILE 2 ===
    const btnSignature = document.getElementById('btn-signature');
    const btnSignatureClose = document.getElementById('btn-close-signature');
    const boxSignatureMenu = document.getElementById('box-menu-signature');
    const backdropSignature = document.getElementById('menu-backdrop-signature');

    btnSignature?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxSignatureMenu?.classList.add('right-[0]');
            backdropSignature?.classList.remove('hidden');
        });
    });

    btnSignatureClose?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxSignatureMenu?.classList.remove('right-[0]');
            backdropSignature?.classList.add('hidden');
        });
    });

    backdropSignature?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxSignatureMenu?.classList.remove('right-[0]');
            backdropSignature?.classList.add('hidden');
        });
    });


    // === MENU MOBILE 3 ===
    const btnClient = document.getElementById('btn-client');
    const btnClientClose = document.getElementById('btn-close-client');
    const boxClientMenu = document.getElementById('box-menu-client');
    const backdropClient = document.getElementById('menu-backdrop-client');

    btnClient?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxClientMenu?.classList.add('right-[0]');
            backdropClient?.classList.remove('hidden');
        });
    });

    btnClientClose?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxClientMenu?.classList.remove('right-[0]');
            backdropClient?.classList.add('hidden');
        });
    });

    backdropClient?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxClientMenu?.classList.remove('right-[0]');
            backdropClient?.classList.add('hidden');
        });
    });

    // === MENU MOBILE 4 ===
    const btnResidential = document.getElementById('btn-internet-residential');
    const btnResidentialClose = document.getElementById('btn-close-internet-residential');
    const boxResidentialMenu = document.getElementById('box-menu-internet-residential');
    const backdropResidential = document.getElementById('menu-backdrop-internet-residential');

    btnResidential?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxResidentialMenu?.classList.add('right-[0]');
            backdropResidential?.classList.remove('hidden');
        });
    });

    btnResidentialClose?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxResidentialMenu?.classList.remove('right-[0]');
            backdropResidential?.classList.add('hidden');
        });
    });

    backdropResidential?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxResidentialMenu?.classList.remove('right-[0]');
            backdropResidential?.classList.add('hidden');
        });
    });

    // === SUBMENU MOBILE ===
    const btnSubmenu = document.getElementById('btn-submenu');
    const btnCloseSubmenu = document.getElementById('btn-closesubmenu');
    const boxSubmenu = document.getElementById('box-submenu');
    const backdropSubmenu = document.getElementById('submenu-backdrop');

    btnSubmenu?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxSubmenu?.classList.add('right-[0]');
            backdropSubmenu?.classList.remove('hidden');
        });
    });

    btnCloseSubmenu?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxSubmenu?.classList.remove('right-[0]');
            backdropSubmenu?.classList.add('hidden');
        });
    });

    backdropSubmenu?.addEventListener('click', () => {
        requestIdleCallback(() => {
            boxSubmenu?.classList.remove('right-[0]');
            backdropSubmenu?.classList.add('hidden');
        });
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

        // Click
        trigger.addEventListener('click', (e) => {
            if (justTouched) return;
            e.stopPropagation();
            isOpen ? hideDropdown() : showDropdown();
        });

        // Touch
        trigger.addEventListener('touchstart', (e) => {
            e.stopPropagation();
            justTouched = true;
            isOpen ? hideDropdown() : showDropdown();
            setTimeout(() => justTouched = false, 400);
        }, { passive: true });

        // Hover (desktop)
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

        // Click ou toque fora
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