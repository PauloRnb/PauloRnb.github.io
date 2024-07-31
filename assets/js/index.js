const swiperTravel = new Swiper('.container', {
    loop: false,
    spaceBetween: '20',
    grabCursor: true,
    slidesPerView: 'auto',
    centeredSlidesBounds: true,
    centerInsufficientSlides: true,

    breakpoints: {
        1588: {
            slidesPerView: 6,
        },
        1200: {
            slidesPerView: 5,
        },
        950: {
            slidesPerView: 4,
        },
        750: {
            slidesPerView: 3,
        },
        550: {
            slidesPerView: 2,
        },
    },
});
