// Swiper JS
const swiper = new Swiper('.swiper', {
  // Optional parameters
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Card Menu Mobile
const listCard = document.getElementById('list__card'),
      closeMenu = document.getElementById('close__menu'),
      toggleMenu = document.getElementById('toggle__menu')

// Show Menu
if (toggleMenu) {
  toggleMenu.addEventListener('click', () => {
    listCard.classList.add('show-menu')
  })
}

// Hidden Menu
if (closeMenu) {
  closeMenu.addEventListener('click', () => {
    listCard.classList.remove('show-menu')
  })
}
