document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll(".slide-up");
  const checkVisibility = () => {
    const windowHeight = window.innerHeight;
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight) {
        section.classList.add("visible");
      } else {
        section.classList.remove("visible");
      }
    });
  };
  const debounce = (func, delay) => {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };
  window.addEventListener("scroll", debounce(checkVisibility, 10));
  checkVisibility();
});