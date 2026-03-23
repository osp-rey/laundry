export default function more() {
  const buttons = document.querySelectorAll("[data-more-btn]");

  if (buttons.length) {
    buttons.forEach((btn) => {
      const containerId = btn.dataset.moreBtn;
      const container = document.querySelector(containerId);
      const childrens = Array.from(container.children).filter((item) => {
        return window.getComputedStyle(item).display === "none";
      });
      const spanBtn = btn.querySelector("span");
      const startTextBTn = spanBtn.textContent;

      console.log(childrens.length, Array.from(container.children).length)

      if (childrens.length === 0) {
        btn.remove();
      } else {
        btn.addEventListener("click", () => {
          if (!btn.classList.contains("_active")) {
            btn.classList.add("_active");
            spanBtn.textContent = "Свернуть текст";
            childrens.forEach((c) => {
              c.style.display = "block";
              setTimeout(() => {
                c.style.opacity = 1;
              }, 100);
            });
          } else {
            btn.classList.remove("_active");
            spanBtn.textContent = startTextBTn;
            childrens.forEach((c) => {
              c.style.opacity = 0;
              setTimeout(() => {
                c.style.display = "none";
              }, 100);
            });
          }
        });
      }
    });
  }
}
