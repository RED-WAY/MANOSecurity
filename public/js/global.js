function opacityPointer(element, option) {
  el = document.querySelector(element);
  if (option === "show") {
    el.style.opacity = 1;
    el.style.pointerEvents = "all";
  } else {
    el.style.opacity = 0;
    el.style.pointerEvents = "none";
  }
}
