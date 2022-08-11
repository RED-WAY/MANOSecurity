function opacityPointer(element) {
  el = document.querySelector(element);
  let opacity = el.style.opacity;

  if (opacity === "0" || opacity === '') {
    el.style.opacity = 1;
    el.style.pointerEvents = "all";
  } else {
    el.style.opacity = 0;
    el.style.pointerEvents = "none";
  }
}

function test(event) {
    console.log("aaaa");
}
