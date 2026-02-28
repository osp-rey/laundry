export default function handlerCookie() {
  const item = document.querySelector(".cookie");

  if (item) {
    const btnClose = item.querySelector(".cookie__close");
    const btnSubmit = item.querySelector(".cookie__btn");

    btnClose.addEventListener("click", () => {
      item.style.opacity = 0;

      setTimeout(() => {
        item.remove();
      }, 300);
    });

    btnSubmit.addEventListener("click", () => {
      item.style.opacity = 0;

      setTimeout(() => {
        item.remove();
      }, 300);
    });
  }
}
