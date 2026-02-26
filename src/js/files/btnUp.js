export default function btnUp() {
  const buttons = document.querySelectorAll("[data-btn-up]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      btn.addEventListener("click", () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });
    });
  }
}
