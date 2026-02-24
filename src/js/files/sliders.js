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

  const stepsSlider = document.querySelector(".s-steps__slider");

  if (stepsSlider && window.matchMedia("(max-width:1199px)").matches) {
    const swiper = new Swiper(stepsSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      breakpoints: {
        576: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
      },
    });
  }

  const casesSlider = document.querySelector(".s-cases__slider");

  if (casesSlider) {
    const swiper = new Swiper(casesSlider, {
      speed: 900,
      spaceBetween: 20,
      slidesPerView: 1,
      pagination: {
        el: ".s-cases .slider-fraction",
        type: "fraction",
      },
      navigation: {
        prevEl: ".s-cases .slider-arrow._prev",
        nextEl: ".s-cases .slider-arrow._next",
      },
    });
  }
}
