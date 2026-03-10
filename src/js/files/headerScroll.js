export default function headerScroll() {
  const header = document.querySelector(".header-s");

  if (header) {
    let lastScrollTop = 0;

    window.addEventListener("scroll", () => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > header.clientHeight * 2) {
        header.classList.add("_scroll");
      } else {
        header.classList.remove("_scroll");
      }

      lastScrollTop = scrollTop;
    });
  }
}
