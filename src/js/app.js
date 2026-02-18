import "../scss/style.scss";
import inputmask from "./files/inputmask.js";
import spoller from "./files/spoller.js";

spoller();
inputmask();

Fancybox.bind("[data-fancybox]", {
  closeButton: false,
});
// Fancybox.show([{ src: "#modal-feedback", type: "inline" }]);
