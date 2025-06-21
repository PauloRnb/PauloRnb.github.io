// ===== BLOQUEIO DE SCROLL COM TRAVA COMPLETA CORRIGIDO =====
let openMenus = 0;
let scrollPosition = 0;

function setBodyScrollStyles(locked) {
    const body = document.body;

    if (locked) {
        scrollPosition = window.scrollY || window.pageYOffset;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        Object.assign(body.style, {
            position: 'fixed',
            top: `-${scrollPosition}px`,
            left: '0',
            width: '100%',
            minWidth: '100vw', // CORREÇÃO PARA NÃO QUEBRAR O LAYOUT
            overflow: 'hidden',
            paddingRight: `${scrollbarWidth}px`
        });

        body.classList.add('scroll-locked');
    } else {
        Object.assign(body.style, {
            position: '',
            top: '',
            left: '',
            width: '',
            minWidth: '', // LIMPA O ESTILO APLICADO
            overflow: '',
            paddingRight: ''
        });

        body.classList.remove('scroll-locked');
        window.scrollTo(0, scrollPosition);
    }
}

function lockScroll() {
    document.body.style.overflow = 'hidden';
}

function unlockScroll() {
    document.body.style.overflow = '';
}

// ===== MENU TOGGLE =====
function toggleMenu(menu, backdrop, open) {
    if (!menu || !backdrop) return;

    const action = open ? 'add' : 'remove';
    const inverse = open ? 'remove' : 'add';

    menu.classList[action]('translate-x-0', 'opacity-100');
    menu.classList[inverse]('translate-x-full', 'opacity-0', 'pointer-events-none');
    backdrop.classList[inverse]('hidden');

    open ? lockScroll() : unlockScroll();
}

// ===== FECHAR TODOS OS MENUS E REMOVER BLUR =====
function closeAllMenus() {
    const menus = [
        'box-menu', 
        'box-menu-signature', 
        'box-menu-client', 
        'box-menu-internet-residential', 
        'box-menu-internet-streaming', 
        'box-submenu'
    ];

    const backdrops = [
        'menu-backdrop', 
        'menu-backdrop-signature', 
        'menu-backdrop-client', 
        'menu-backdrop-internet-residential', 
        'menu-backdrop-internet-streaming', 
        'submenu-backdrop'
    ];

    menus.forEach(id => {
        const menu = document.getElementById(id);
        if (menu) {
            menu.classList.remove('translate-x-0', 'opacity-100');
            menu.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
        }
    });

    backdrops.forEach(id => {
        const backdrop = document.getElementById(id);
        if (backdrop) {
            backdrop.classList.add('hidden');
            backdrop.classList.remove('block');
        }
    });

    // Remove o blur e libera o scroll
    unlockScroll();
}

// ===== INICIALIZAÇÕES =====
function initMenus() {
    const menus = [
        ['btn-menu', 'btn-close', 'box-menu', 'menu-backdrop'],
        ['btn-signature', 'btn-close-signature', 'box-menu-signature', 'menu-backdrop-signature'],
        ['btn-client', 'btn-close-client', 'box-menu-client', 'menu-backdrop-client'],
        ['btn-internet-residential', 'btn-close-internet-residential', 'box-menu-internet-residential', 'menu-backdrop-internet-residential'],
        ['btn-internet-streaming', 'btn-close-internet-streaming', 'box-menu-internet-streaming', 'menu-backdrop-internet-streaming'],
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

// DropDowns
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

// DarkMode
function initDarkMode() {
    const desktopBtn = document.getElementById('toggleDarkDesktop');
    const mobileBtn = document.getElementById('toggleDarkMobile');

    const buttons = [desktopBtn, mobileBtn];

    buttons.forEach(btn => {
        btn?.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            try {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (e) {
                console.warn('Não foi possível salvar o tema:', e);
            }
        });
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

// Modal
function initModal() {
    const openBtn = document.getElementById("open-modal");
    const closeBtn = document.getElementById("close-modal");
    const backdrop = document.getElementById("modal-window");
    const content = document.getElementById("modal-content");

    openBtn?.addEventListener('click', () => {
        backdrop.classList.remove('hidden');
        setTimeout(() => backdrop.classList.add('opacity-100'), 10);
        setTimeout(() => {
            content.classList.remove('hidden');
            setTimeout(() => content.classList.remove('opacity-0', 'scale-95'), 10);
        }, 200);
        lockScroll();
    });

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener("click", closeModal);

    function closeModal() {
        content.classList.add('opacity-0', 'scale-95');
        setTimeout(() => content.classList.add('hidden'), 200);
        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        setTimeout(() => backdrop.classList.add('hidden'), 200);
        unlockScroll();
    }
}

// Tabs
function initTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");
    const underline = document.getElementById("tab-underline");

    function updateUnderlineColor() {
        const isDark = document.documentElement.classList.contains("dark");
        underline.classList.toggle("bg-orange-600", !isDark);
        underline.classList.toggle("bg-cyan-400", isDark);
    }

    function activateTab(tab) {
        const isDark = document.documentElement.classList.contains("dark");

        tabs.forEach(btn => {
            btn.classList.remove("text-orange-600", "text-gray-600", "text-white", "text-cyan-400");
            btn.classList.add(isDark ? "text-cyan-400" : "text-gray-600");
        });

        tab.classList.remove(isDark ? "text-cyan-400" : "text-gray-600");
        tab.classList.add(isDark ? "text-white" : "text-orange-600");

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
        updateUnderlineColor();

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

    const observer = new MutationObserver(() => {
        const activeTab = document.querySelector(".tab-btn.text-orange-600, .tab-btn.text-white");
        if (activeTab) activateTab(activeTab);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
}

// Swipers
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
    window.scrollTo(0, 0); // Força voltar ao topo ao recarregar

    initMenus();
    initDropdowns();
    initDarkMode();
    initModal();
    initTabs();
    initSwipers();

    window.addEventListener('resize', () => {
        const breakpoint = 960;
        if (window.innerWidth > breakpoint) {
            closeAllMenus();
        }
    });
});

// Garante que o scroll volte ao topo ao recarregar
window.addEventListener('beforeunload', () => window.scrollTo(0, 0));






// Backup 19/06/2025
/*
// ===== BLOQUEIO DE SCROLL COM TRAVA COMPLETA CORRIGIDO =====
let openMenus = 0;
let scrollPosition = 0;

function setBodyScrollStyles(locked) {
    const body = document.body;

    if (locked) {
        scrollPosition = window.scrollY || window.pageYOffset;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        Object.assign(body.style, {
            position: 'fixed',
            top: `-${scrollPosition}px`,
            left: '0',
            width: '100%',
            minWidth: '100vw', // CORREÇÃO PARA NÃO QUEBRAR O LAYOUT
            overflow: 'hidden',
            paddingRight: `${scrollbarWidth}px`
        });

        body.classList.add('scroll-locked');
    } else {
        Object.assign(body.style, {
            position: '',
            top: '',
            left: '',
            width: '',
            minWidth: '', // LIMPA O ESTILO APLICADO
            overflow: '',
            paddingRight: ''
        });

        body.classList.remove('scroll-locked');
        window.scrollTo(0, scrollPosition);
    }
}

function lockScroll() {
    document.body.style.overflow = 'hidden';
}

function unlockScroll() {
    document.body.style.overflow = '';
}

// ===== MENU TOGGLE =====
function toggleMenu(menu, backdrop, open) {
    if (!menu || !backdrop) return;

    const action = open ? 'add' : 'remove';
    const inverse = open ? 'remove' : 'add';

    menu.classList[action]('translate-x-0', 'opacity-100');
    menu.classList[inverse]('translate-x-full', 'opacity-0', 'pointer-events-none');
    backdrop.classList[inverse]('hidden');

    open ? lockScroll() : unlockScroll();
}

// ===== FECHAR TODOS OS MENUS E REMOVER BLUR =====
function closeAllMenus() {
    const menus = [
        'box-menu', 
        'box-menu-signature', 
        'box-menu-client', 
        'box-menu-internet-residential', 
        'box-menu-internet-streaming', 
        'box-submenu'
    ];

    const backdrops = [
        'menu-backdrop', 
        'menu-backdrop-signature', 
        'menu-backdrop-client', 
        'menu-backdrop-internet-residential', 
        'menu-backdrop-internet-streaming', 
        'submenu-backdrop'
    ];

    menus.forEach(id => {
        const menu = document.getElementById(id);
        if (menu) {
            menu.classList.remove('translate-x-0', 'opacity-100');
            menu.classList.add('translate-x-full', 'opacity-0', 'pointer-events-none');
        }
    });

    backdrops.forEach(id => {
        const backdrop = document.getElementById(id);
        if (backdrop) {
            backdrop.classList.add('hidden');
            backdrop.classList.remove('block');
        }
    });

    // Remove o blur e libera o scroll
    unlockScroll();
}

// ===== INICIALIZAÇÕES =====
function initMenus() {
    const menus = [
        ['btn-menu', 'btn-close', 'box-menu', 'menu-backdrop'],
        ['btn-signature', 'btn-close-signature', 'box-menu-signature', 'menu-backdrop-signature'],
        ['btn-client', 'btn-close-client', 'box-menu-client', 'menu-backdrop-client'],
        ['btn-internet-residential', 'btn-close-internet-residential', 'box-menu-internet-residential', 'menu-backdrop-internet-residential'],
        ['btn-internet-streaming', 'btn-close-internet-streaming', 'box-menu-internet-streaming', 'menu-backdrop-internet-streaming'],
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

// DropDowns
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

// DarkMode
function initDarkMode() {
    const desktopBtn = document.getElementById('toggleDarkDesktop');
    const mobileBtn = document.getElementById('toggleDarkMobile');

    const buttons = [desktopBtn, mobileBtn];

    buttons.forEach(btn => {
        btn?.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            const isDark = document.documentElement.classList.contains('dark');
            try {
                localStorage.setItem('theme', isDark ? 'dark' : 'light');
            } catch (e) {
                console.warn('Não foi possível salvar o tema:', e);
            }
        });
    });

    // Aplica tema salvo ao carregar
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }
    } catch (e) {
        console.warn('Não foi possível carregar o tema:', e);
    }
}

// Modal 001
function initModal() {
    const openBtn = document.getElementById("open-modal");
    const closeBtn = document.getElementById("close-modal");
    const backdrop = document.getElementById("modal-window");
    const content = document.getElementById("modal-content");

    openBtn?.addEventListener('click', () => {
        backdrop.classList.remove('hidden');
        setTimeout(() => {
            backdrop.classList.add('opacity-100');
            backdrop.classList.remove('opacity-0');
        }, 10);

        setTimeout(() => {
            content.classList.remove('hidden');
            setTimeout(() => {
                content.classList.remove('opacity-0', 'scale-95');
            }, 10);
        }, 200);

        lockScroll();
    });

    closeBtn?.addEventListener('click', closeModal);
    backdrop?.addEventListener("click", closeModal);

    function closeModal() {
        content.classList.add('opacity-0', 'scale-95');
        setTimeout(() => {
            content.classList.add('hidden');
        }, 200);

        backdrop.classList.remove('opacity-100');
        backdrop.classList.add('opacity-0');
        setTimeout(() => {
            backdrop.classList.add('hidden');
        }, 200);

        unlockScroll();
    }
}

// TabsPlans
function initTabs() {
    const tabs = document.querySelectorAll(".tab-btn");
    const contents = document.querySelectorAll(".tab-content");
    const underline = document.getElementById("tab-underline");

    function updateUnderlineColor() {
        const isDark = document.documentElement.classList.contains("dark");
        underline.classList.toggle("bg-orange-600", !isDark);
        underline.classList.toggle("bg-cyan-400", isDark);
    }

    function activateTab(tab) {
        const isDark = document.documentElement.classList.contains("dark");

        tabs.forEach(btn => {
            btn.classList.remove(
                "text-orange-600",
                "text-gray-600",
                "text-white",
                "text-cyan-400"
            );

            if (isDark) {
                btn.classList.add("text-cyan-400");
            } else {
                btn.classList.add("text-gray-600");
            }
        });

        if (isDark) {
            tab.classList.remove("text-cyan-400");
            tab.classList.add("text-white");
        } else {
            tab.classList.remove("text-gray-600");
            tab.classList.add("text-orange-600");
        }

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
        updateUnderlineColor();

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

    const observer = new MutationObserver(() => {
        const activeTab = document.querySelector(".tab-btn.text-orange-600, .tab-btn.text-white");
        if (activeTab) activateTab(activeTab);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
}

// Swipers
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

    // Remove blur e fecha menus ao redimensionar acima de 768px
    window.addEventListener('resize', () => {
        const breakpoint = 960;
        if (window.innerWidth > breakpoint) {
            closeAllMenus();
        }
    });
});
*/