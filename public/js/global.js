// display flex om elements with ".invisible" clas
// to not flick at start
function displayAfterStart() {
  const inv = document.querySelectorAll(".invisible");
  Array.from(inv).map((el) => {
    el.style.display = "flex";
  });
}

// setup
setTimeout(() => {
  displayAfterStart();
}, 500);

// change visibility of elements with OPACITY and POINTER-EVENTS
function opacityPointer(element, option) {
  el = document.querySelector(element);
  if (option === "show") {
    el.classList.remove("invisible");
  } else {
    el.classList.add("invisible");
  }
}
