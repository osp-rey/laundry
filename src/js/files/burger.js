export default function burger() {
  const burgerBtn = document.querySelector("#burger-toggle");
  const burger = document.querySelector("#burger");

  if (burger) {
    burger.addEventListener("click", (e) => e.stopPropagation());

    document.body.addEventListener("click", burgerClose);

    burgerBtn.addEventListener("click", (e) => {
      e.stopPropagation();

      if (burger.classList.contains("_open")) {
        burgerClose();
      } else {
        burgerOpen();
      }
    });

    function burgerClose() {
      burger.classList.remove("_open");
      burgerBtn.classList.remove("_active");
      document.body.classList.remove("body-hidden");
    }

    function burgerOpen() {
      burger.classList.add("_open");
      burgerBtn.classList.add("_active");
      document.body.classList.add("body-hidden");
    }

    function updateHeightBurger() {
      burger.style.maxHeight = `${window.visualViewport.height}px`;
    }

    window.visualViewport.addEventListener("resize", updateHeightBurger);
    window.visualViewport.addEventListener("scroll", updateHeightBurger);

    updateHeightBurger();
  }
}
