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

// display menu aside
function showMenu() {
  opacityPointer("#aside_menu", "show");
  document.querySelector("#menu_first_item").focus();
}
// hide menu aside
function hideMenu() {
  opacityPointer("#aside_menu", "hide");
}

// exit form with "escape" key
document.addEventListener("keydown", (event) => {
  if (
    document.querySelector(".section-start") !== null &&
    event.key === "Escape"
  ) {
    hideLogin();
    hideSignup();
  } else if (
    document.querySelector("#aside_forms").style.display == "flex" &&
    event.key === "Escape"
  ) {
    formView(false);
  }
});

// change visibility of elements with OPACITY and POINTER-EVENTS
function opacityPointer(element, option) {
  el = document.querySelector(element);
  if (option === "show") {
    el.classList.remove("invisible");
  } else {
    el.classList.add("invisible");
  }
}
