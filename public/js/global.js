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
window.addEventListener("keydown", (event) => {
  // press button in form with ENTER
  if (
    document.querySelector(".popup-form").display != "flex" &&
    event.key == "Enter"
  ) {
    document.querySelector(".btnForm").focus();
    setTimeout(() => {
      document.querySelector(".btnForm").click();
    }, 400);
  }

  // close forms with ESC
  if (
    document.querySelector(".section-start") !== null &&
    event.key === "Escape"
  ) {
    hideLogin();
    hideMenu();
  } else if (
    document.querySelector("#aside_forms") !== null &&
    event.key === "Escape"
  ) {
    formView(false);
    hideMenu();
  }
});

// prevent multiple clicks
document.querySelector(".btnForm").addEventListener("click", () => {
  document.querySelector(".btnForm").disabled = true;
  setTimeout(() => {
    document.querySelector(".btnForm").disabled = false;
  }, 2000);
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

// loader
function viewLoad(option) {
  setTimeout(() => {
    opacityPointer(".loader", option);
    if (option == "hide") {
      document.querySelector("body").style.overflowY = "scroll";
    } else {
      document.querySelector("body").style.overflowY = "hidden";
    }
  }, 1000);
}
