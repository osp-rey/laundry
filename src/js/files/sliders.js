export default function sliders() {
  const advSlider = document.querySelector(".s-adv__slider");

  if (advSlider) {
    const swiper = new Swiper(advSlider, {
      speed: 900,
      spaceBetween: 20,
      slidesPerView: "auto",
      navigation: {
        prevEl: ".s-adv .slider-arrow._prev",
        nextEl: ".s-adv .slider-arrow._next",
      },
      breakpoints: {
        992: {
          spaceBetween: 25,
          slidesPerView: 1,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: 1,
        },
      },
    });
  }
}
