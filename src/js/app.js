import "../scss/style.scss";
import btnUp from "./files/btnUp.js";
import burger from "./files/burger.js";
import burgerMenu from "./files/burgerMenu.js";
import buttonsNote from "./files/buttonsNote.js";
import headerScroll from "./files/headerScroll.js";
import inputmask from "./files/inputmask.js";
import map from "./files/map.js";
import sliders from "./files/sliders.js";
import spoller from "./files/spoller.js";

document.addEventListener("DOMContentLoaded", () => {
  spoller();
  inputmask();
  burgerMenu();
  buttonsNote();
  burger();
  sliders();
  map();
  btnUp();
  headerScroll();

  Fancybox.bind("[data-fancybox]", {
    closeButton: false,
  });
});

// Fancybox.show([{ src: "#modal-feedback", type: "inline" }]);
