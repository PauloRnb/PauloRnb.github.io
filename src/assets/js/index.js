// ===== BLOQUEIO TOTAL DE SCROLL (inclusive mobile) =====
function lockScroll() {
    document.documentElement.classList.add('scroll-locked');
    document.body.classList.add('scroll-locked');
}

function unlockScroll() {
    document.documentElement.classList.remove('scroll-locked');
    document.body.classList.remove('scroll-locked');
}

// ===== MENU TOGGLE GENERICO =====
function toggleMenu(menu, backdrop, open) {
    if (!menu || !backdrop) return;

    const action = open ? 'add' : 'remove';
    const inverse = open ? 'remove' : 'add';

    menu.classList[action]('translate-x-0', 'opacity-100');
    menu.classList[inverse]('translate-x-full', 'opacity-0', 'pointer-events-none');
    backdrop.classList[inverse]('hidden');

    open ? lockScroll() : unlockScroll();
}

// ===== INICIALIZAÇÕES DE MENUS =====
function initMenus() {
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

        btnOpen?.addEventListener('click', () => toggleMenu(box, backdrop, true));
        btnClose?.addEventListener('click', () => toggleMenu(box, backdrop, false));
        backdrop?.addEventListener('click', () => toggleMenu(box, backdrop, false));
    });
}

// ===== DROPDOWNS =====
function initDropdowns() {
    const triggers = document.querySelectorAll('[data-dropdown]');

    triggers.forEach(trigger => {
        const key = trigger.getAttribute('data-dropdown');
        const dropdown = document.querySelector(`[data-dropdown-target="${key}"]`);
        if (!dropdown) return;

        let isOpen = false;
        let justTouched = false;

        const showDropdown = () => {
            document.querySelectorAll('[data-dropdown-target]').forEach(el => {
                el.classList.add('opacity-0', 'invisible', 'pointer-events-none');
                el.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
            });

            dropdown.classList.remove('opacity-0', 'invisible', 'pointer-events-none');
            dropdown.classList.add('opacity-100', 'visible', 'pointer-events-auto');
            isOpen = true;
        };

        const hideDropdown = () => {
            dropdown.classList.add('opacity-0', 'invisible', 'pointer-events-none');
            dropdown.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
            isOpen = false;
        };

        const safeHideDropdown = () => {
            setTimeout(() => {
                if (
                    !trigger.matches(':hover') &&
                    !dropdown.matches(':hover')
                ) {
                    hideDropdown();
                }
            }, 100);
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
            if (window.innerWidth > 768) showDropdown();
        });

        trigger.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) safeHideDropdown();
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) safeHideDropdown();
        });
    });

    function closeAllDropdowns(e) {
        if (e.target.closest('.swiper')) return;

        const isTrigger = [...document.querySelectorAll('[data-dropdown]')].some(el =>
            el.contains(e.target)
        );
        const isInsideDropdown = [...document.querySelectorAll('[data-dropdown-target]')].some(el =>
            el.contains(e.target)
        );

        if (!isTrigger && !isInsideDropdown) {
            document.querySelectorAll('[data-dropdown-target]').forEach(el => {
                el.classList.add('opacity-0', 'invisible', 'pointer-events-none');
                el.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
            });
        }
    }

    document.addEventListener('click', closeAllDropdowns);
    document.addEventListener('touchstart', closeAllDropdowns, { passive: true });
}

// ===== MODO ESCURO =====
function initDarkMode() {
    const toggleDark = document.getElementById('toggleDark');
    toggleDark?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
            console.warn('Não foi possível salvar o tema:', e);
        }
    });

    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    } catch (e) {
        console.warn('Não foi possível carregar o tema:', e);
    }
}

// ===== MODAL POPUP =====
function initModal() {
    const openBtn = document.getElementById("open-modal");
    const closeBtn = document.getElementById("close-modal");
    const modal = document.getElementById("modal-window");

    openBtn?.addEventListener('click', () => {
        modal?.classList.remove('hidden');
        lockScroll();
    });

    closeBtn?.addEventListener('click', () => {
        modal?.classList.add('hidden');
        unlockScroll();
    });

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            unlockScroll();
        }
    });
}

// ===== TABS =====
function initTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");
    const underline = document.getElementById("tab-underline");

    function activateTab(tab) {
        tabs.forEach(btn => btn.classList.remove("text-orange-600", "border-orange-500"));
        tab.classList.add("text-orange-600", "border-orange-500");

        const selected = tab.dataset.tab;
        contents.forEach(content => {
            const isActive = content.id === selected;
            content.classList.toggle("opacity-100", isActive);
            content.classList.toggle("opacity-0", !isActive);
            content.classList.toggle("translate-y-0", isActive);
            content.classList.toggle("translate-y-4", !isActive);
            content.classList.toggle("block", isActive);
            content.classList.toggle("hidden", !isActive);
            content.classList.toggle("relative", isActive);
            content.classList.toggle("absolute", !isActive);
        });

        underline.style.width = `${tab.offsetWidth}px`;
        underline.style.left = `${tab.offsetLeft}px`;

        setTimeout(() => {
            window.swiperPlans?.update();
            window.swiperPlans?.slideTo(0, 0);
            window.swiperCombos?.update();
            window.swiperCombos?.slideTo(0, 0);
        }, 50);
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => activateTab(tab));
    });

    window.addEventListener("load", () => {
        if (tabs.length) activateTab(tabs[0]);
    });
}

// ===== SWIPERS =====
function initSwipers() {
    window.swiperHome = new Swiper(".mySwiperHome", {
        spaceBetween: 30,
        effect: "fade",
        autoplay: { delay: 3000 },
        navigation: {
            nextEl: ".swiper-button-next-home",
            prevEl: ".swiper-button-prev-home",
        },
        pagination: {
            el: ".swiper-pagination-home",
            clickable: true,
        },
    });

    const closeAllDropdowns = () => {
        document.querySelectorAll('[data-dropdown-target]').forEach(drop => {
            drop.classList.add('opacity-0', 'invisible', 'pointer-events-none');
            drop.classList.remove('opacity-100', 'visible', 'pointer-events-auto');
        });
    };

    window.swiperHome.on('slideChangeTransitionStart', function () {
        if (!this.autoplay.running) {
            closeAllDropdowns();
        }
    });

    window.swiperHome.on('touchStart', function () {
        closeAllDropdowns();
    });

    window.swiperCombos = new Swiper(".mySwiperCombos", {
        slidesPerView: 'auto',
        spaceBetween: 30,
        freeMode: true,
        direction: 'horizontal',
        navigation: {
            nextEl: ".swiper-button-next-combos",
            prevEl: ".swiper-button-prev-combos",
        },
        pagination: {
            el: ".swiper-pagination-combos",
            clickable: true,
        },
    });

    window.swiperPlans = new Swiper(".mySwiperPlans", {
        slidesPerView: 'auto',
        spaceBetween: 30,
        freeMode: true,
        direction: 'horizontal',
        navigation: {
            nextEl: ".swiper-button-next-plans",
            prevEl: ".swiper-button-prev-plans",
        },
        pagination: {
            el: ".swiper-pagination-plans",
            clickable: true,
        },
    });
}

// ===== EXECUÇÃO FINAL =====
document.addEventListener('DOMContentLoaded', () => {
    initMenus();
    initDropdowns();
    initDarkMode();
    initModal();
    initTabs();
    initSwipers();
});









/*
// ===== BLOQUEIO DE SCROLL COM TRAVA COMPLETA =====
let openMenus = 0;
let scrollPosition = 0;

function setBodyScrollStyles(locked) {
    const body = document.body;
    const html = document.documentElement;

    if (locked) {
        scrollPosition = window.scrollY || window.pageYOffset;
        Object.assign(body.style, {
            position: 'fixed',
            top: `-${scrollPosition}px`,
            left: '0',
            right: '0',
            width: '100%',
            overflow: 'hidden',
        });
        html.style.overflow = 'hidden';
        html.classList.add('scroll-locked');
        body.classList.add('scroll-locked');
    } else {
        Object.assign(body.style, {
            position: '',
            top: '',
            left: '',
            right: '',
            width: '',
            overflow: '',
        });
        html.style.overflow = '';
        html.classList.remove('scroll-locked');
        body.classList.remove('scroll-locked');
        window.scrollTo(0, scrollPosition);
    }
}

function lockScroll() {
    if (++openMenus === 1) setBodyScrollStyles(true);
}

function unlockScroll() {
    if (--openMenus === 0) setBodyScrollStyles(false);
}

// ===== MENU TOGGLE GENERICO =====
function toggleMenu(menu, backdrop, open) {
    if (!menu || !backdrop) return;

    const action = open ? 'add' : 'remove';
    const inverse = open ? 'remove' : 'add';

    menu.classList[action]('translate-x-0', 'opacity-100');
    menu.classList[inverse]('translate-x-full', 'opacity-0', 'pointer-events-none');
    backdrop.classList[inverse]('hidden');

    open ? lockScroll() : unlockScroll();
}

// ===== INICIALIZAÇÕES =====
function initMenus() {
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

        btnOpen?.addEventListener('click', () => toggleMenu(box, backdrop, true));
        btnClose?.addEventListener('click', () => toggleMenu(box, backdrop, false));
        backdrop?.addEventListener('click', () => toggleMenu(box, backdrop, false));
    });
}

function initDropdowns() {
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
}

function initDarkMode() {
    const toggleDark = document.getElementById('toggleDark');
    toggleDark?.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
            console.warn('Não foi possível salvar o tema:', e);
        }
    });

    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    } catch (e) {
        console.warn('Não foi possível carregar o tema:', e);
    }
}

function initModal() {
    const openBtn = document.getElementById("open-modal");
    const closeBtn = document.getElementById("close-modal");
    const modal = document.getElementById("modal-window");

    openBtn?.addEventListener('click', () => {
        modal?.classList.remove('hidden');
        lockScroll();
    });

    closeBtn?.addEventListener('click', () => {
        modal?.classList.add('hidden');
        unlockScroll();
    });

    modal?.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
            unlockScroll();
        }
    });
}

function initTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");
    const underline = document.getElementById("tab-underline");

    function activateTab(tab) {
        tabs.forEach(btn => btn.classList.remove("text-orange-600", "border-orange-500"));
        tab.classList.add("text-orange-600", "border-orange-500");

        const selected = tab.dataset.tab;
        contents.forEach(content => {
            const isActive = content.id === selected;
            content.classList.toggle("opacity-100", isActive);
            content.classList.toggle("opacity-0", !isActive);
            content.classList.toggle("translate-y-0", isActive);
            content.classList.toggle("translate-y-4", !isActive);
            content.classList.toggle("block", isActive);
            content.classList.toggle("hidden", !isActive);
            content.classList.toggle("relative", isActive);
            content.classList.toggle("absolute", !isActive);
        });

        underline.style.width = `${tab.offsetWidth}px`;
        underline.style.left = `${tab.offsetLeft}px`;

        setTimeout(() => {
            window.swiperPlans?.update();
            window.swiperPlans?.slideTo(0, 0);
            window.swiperCombos?.update();
            window.swiperCombos?.slideTo(0, 0);
        }, 50);
    }

    tabs.forEach(tab => {
        tab.addEventListener("click", () => activateTab(tab));
    });

    window.addEventListener("load", () => {
        if (tabs.length) activateTab(tabs[0]);
    });
}

function initSwipers() {
    window.swiperHome = new Swiper(".mySwiperHome", {
        spaceBetween: 30,
        effect: "fade",
        autoplay: { delay: 3000 },
        navigation: {
            nextEl: ".swiper-button-next-home",
            prevEl: ".swiper-button-prev-home",
        },
        pagination: {
            el: ".swiper-pagination-home",
            clickable: true,
        },
    });

    window.swiperCombos = new Swiper(".mySwiperCombos", {
        slidesPerView: 'auto',
        spaceBetween: 30,
        freeMode: true,
        direction: 'horizontal',
        navigation: {
            nextEl: ".swiper-button-next-combos",
            prevEl: ".swiper-button-prev-combos",
        },
        pagination: {
            el: ".swiper-pagination-combos",
            clickable: true,
        },
    });

    window.swiperPlans = new Swiper(".mySwiperPlans", {
        slidesPerView: 'auto',
        spaceBetween: 30,
        freeMode: true,
        direction: 'horizontal',
        navigation: {
            nextEl: ".swiper-button-next-plans",
            prevEl: ".swiper-button-prev-plans",
        },
        pagination: {
            el: ".swiper-pagination-plans",
            clickable: true,
        },
    });
}

// ===== EXECUÇÃO =====
document.addEventListener('DOMContentLoaded', () => {
    initMenus();
    initDropdowns();
    initDarkMode();
    initModal();
    initTabs();
    initSwipers();
});
*/