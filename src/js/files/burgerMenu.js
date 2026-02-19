export default function burgerMenu() {
  const list = document.querySelector(".burger__list");

  if (list) {
    const itemsHasChildren = list.querySelectorAll(".menu-item-has-children");

    if (itemsHasChildren.length) {
      const burgerMenuStart = document.querySelector("#burger-menu-start");
      const burgerMenuInside = document.querySelector("#burger-menu-inside");
      const burgerInsidePrev =
        burgerMenuInside.querySelector(".burger__prev-btn");

      itemsHasChildren.forEach((item) => {
        const btn = document.createElement("div");
        btn.classList.add("btn");

        item.appendChild(btn);

        btn.addEventListener("click", () => {
          const subMenu = item.querySelector(".sub-menu");
          const burgerList = document.createElement("ul");
          burgerList.classList.add("list", "burger__list");

          burgerList.innerHTML = subMenu.innerHTML;
          burgerMenuInside.appendChild(burgerList);

          openInside();
        });

        burgerInsidePrev.addEventListener("click", openStart);

        function openInside() {
          burgerMenuStart.classList.remove("_show");
          setTimeout(() => {
            burgerMenuInside.classList.add("_active");
            burgerMenuStart.classList.remove("_active");
            setTimeout(() => {
              burgerMenuInside.classList.add("_show");
            }, 150);
          }, 150);
        }
        function openStart() {
          burgerMenuInside.classList.remove("_show");
          setTimeout(() => {
            burgerMenuStart.classList.add("_active");
            burgerMenuInside.classList.remove("_active");
            setTimeout(() => {
              burgerMenuStart.classList.add("_show");
              const burgerInsideList =
                burgerMenuInside.querySelector(".burger__list");

              if (burgerInsideList) burgerInsideList.remove();
            }, 150);
          }, 150);
        }
      });
    }
  }
}
