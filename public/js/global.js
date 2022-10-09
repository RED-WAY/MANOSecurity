// display flex on elements with ".invisible" class
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
// display message aside
let barWidth = 100;
let barInterval;
function showMessage(status, msg) {
  // verify state and set message icon
  let imgSrc = "";
  switch (status) {
    case "success":
      imgSrc = "checkmark-circle";
      break;
    case "error":
      imgSrc = "close-circle";
      break;
    case "warning":
      imgSrc = "warning";
      break;
    default:
      imgSrc = "checkmark-circle";
  }

  // set custom content in message
  const element = document.querySelector(".message-modal");
  document.querySelector("#message_icon").name = imgSrc;
  document.querySelector("#message_icon").style.color = `var(--msg-${status})`;
  element.style.boxShadow = `0 0 .5em var(--msg-${status})`;
  document.querySelector("#message_text").innerHTML = msg;

  // execute if there is no message displayed
  if (element.classList.contains("invisible")) {
    document.querySelector(
      "#message_bar"
    ).style.backgroundColor = `var(--msg-${status})`;
    // restart bar
    barInterval = setInterval(() => {
      if (barWidth <= 0) {
        clearInterval(barInterval);
        barWidth = 100;
      }

      barWidth--;
      document.querySelector("#message_bar").style.width = `${barWidth}%`;
    }, 35);

    // show message
    setTimeout(() => {
      opacityPointer(element, "show");
    }, 0);

    // timer to remove message and restart
    hideMsgTimeout = setTimeout(() => {
      setTimeout(() => {
        clearInterval(barInterval);
        barWidth = 100;
        document.querySelector("#message_bar").style.width = "100%";
      }, 500);
      opacityPointer(element, "hide");
    }, 3000);
  }
}
// hide message aside
let hideMsgTimeout;
function hideMessage(element) {
  // reset progress bar
  setTimeout(() => {
    clearInterval(barInterval);
    clearInterval(hideMsgTimeout);
    barWidth = 100;
    document.querySelector("#message_bar").style.width = "100%";
  }, 500);
  // hide message div
  opacityPointer(element.parentElement, "hide");
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
    hideConfirm();
    formView(false);
    hideMenu();
    if (chartMachine?.canvas) {
      closeMachineDash();
    }
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
  const el =
    typeof element === "string" ? document.querySelector(element) : element;
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

function addAnimatedLabelEvent(array) {
  for (const id of array) {
    const label = document.querySelector(`label[for="${id}"]`);
    const input = document.querySelector(`input[name="${id}"]`);

    label.classList.add("animated-label");
    input.addEventListener("focus", () => {
      label.classList.add("move-up-label");
    });

    ["change", "blur"].map((event) => {
      input.addEventListener(event, () => {
        if (!input.value) {
          label.classList.remove("move-up-label");
        } else {
          label.classList.add("move-up-label");
        }
      });
    });
  }
}
