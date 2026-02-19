import "../scss/style.scss";
import burger from "./files/burger.js";
import burgerMenu from "./files/burgerMenu.js";
import buttonsNote from "./files/buttonsNote.js";
import inputmask from "./files/inputmask.js";
import spoller from "./files/spoller.js";

document.addEventListener("DOMContentLoaded", () => {
  spoller();
  inputmask();
  burgerMenu();
  buttonsNote();
  burger();

  Fancybox.bind("[data-fancybox]", {
    closeButton: false,
  });
});

// Fancybox.show([{ src: "#modal-feedback", type: "inline" }]);
