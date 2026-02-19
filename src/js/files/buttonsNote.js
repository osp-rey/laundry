export default function buttonsNote() {
  const butons = document.querySelectorAll("[data-note]");

  if (butons.length) {
    butons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selectorTarget = btn.dataset.targetNote;
        const target = document.querySelector(selectorTarget);
        const value = btn.dataset.note;

        if (target) {
          target.value = value;
        }
      });
    });
  }
}
