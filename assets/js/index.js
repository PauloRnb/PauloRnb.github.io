const swiperCards = new Swiper('.main', {
    loop: true,
    spaceBetween: '32',
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlides: 'auto',

    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
    },

    breakpoints: {
        600: {
            slidesPerView: 3,
        },
        900: {
            slidesPerView: 4,
        },
    }
  });