document.addEventListener("scroll", handleScroll);

function handleScroll() {
  requestAnimationFrame(() => {
    if (window.scrollY > 220) {
      document.getElementById("nav").style.top = "0";
      document.getElementById("nav").style.transition = "1s";
      document.getElementById("nav-links").style.opacity = "1";
      document.getElementById("start-cont").style.animation =
        "slide-in .8s linear";
    } else {
      document.getElementById("nav").style.top = "-9vh";
      document.getElementById("nav").style.transition = ".2s";
      document.getElementById("nav-links").style.opacity = "0";
      document.getElementById("start-cont").style.animation = "none";
    }
  });
}
