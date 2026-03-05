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

  const reviewsSliders = document.querySelectorAll(".s-reviews__slider");

  if (reviewsSliders.length) {
    reviewsSliders.forEach((slider) => {
      const swiper = new Swiper(slider, {
        speed: 900,
        spaceBetween: 15,
        slidesPerView: "auto",
        navigation: {
          prevEl: slider.nextElementSibling.querySelector(
            ".slider-arrow._prev",
          ),
          nextEl: slider.nextElementSibling.querySelector(
            ".slider-arrow._next",
          ),
        },
        breakpoints: {
          992: {
            spaceBetween: 20,
            slidesPerView: 3,
          },
        },
      });
    });
  }

  const locationSlider = document.querySelector(".s-location__slider");

  if (locationSlider) {
    const swiper = new Swiper(locationSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
    });
  }

  const gallerySlider = document.querySelector(".s-gallery__slider");

  if (gallerySlider) {
    const swiper = new Swiper(gallerySlider, {
      // slidesPerView: "auto",
      // spaceBetween: 25,
      // speed: 12000,
      // watchOverflow: true,
      // loop: true,
      // allowTouchMove: false,
      // watchSlidesProgress: true,
      // a11y: false,
      // autoplay: {
      //   delay: 0,
      // },
      speed: 900,
      slidesPerView: "auto",
      spaceBetween: 25,
      autoplay: {
        delay: 3500,
      },
      navigation: {
        prevEl: ".s-gallery .slider-arrow._prev",
        nextEl: ".s-gallery .slider-arrow._next",
      },
    });
  }

  const partnersSlider = document.querySelector(".s-partners__slider");

  if (partnersSlider && window.matchMedia("(max-width:991px)").matches) {
    const swiper = new Swiper(partnersSlider, {
      slidesPerView: "auto",
      spaceBetween: 16,
      speed: 11000,
      watchOverflow: true,
      loop: true,
      allowTouchMove: false,
      watchSlidesProgress: true,
      a11y: false,
      autoplay: {
        delay: 0,
      },
    });
  }

  const overviewSlider = document.querySelector(".s-overview__slider");

  if (overviewSlider) {
    const swiper = new Swiper(overviewSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      autoplay: {
        delay: 4000,
      },
      navigation: {
        prevEl: ".s-overview .slider-arrow._prev",
        nextEl: ".s-overview .slider-arrow._next",
      },
      breakpoints: {
        768: {
          spaceBetween: 25,
          slidesPerView: "auto",
        },
      },
    });
  }

  const selectionSlider = document.querySelector(".s-selection__slider");

  if (selectionSlider) {
    const swiper = new Swiper(selectionSlider, {
      speed: 900,
      spaceBetween: 15,
      slidesPerView: "auto",
      autoplay: {
        delay: 4000,
      },
      breakpoints: {
        992: {
          spaceBetween: 20,
          slidesPerView: 3,
        },
        768: {
          spaceBetween: 20,
          slidesPerView: "auto",
        },
      },
    });
  }
}
