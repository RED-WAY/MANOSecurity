// PERMISSION CHANGES
// users panel
if (sessionStorage.OFFICE_USER !== "MASTER") {
  Array.from(
    document.querySelectorAll(
      `a[onclick="showSection('#usuarios'), showUsers()"]`
    )
  ).map((link) => {
    link.style.display = "none";
  });
}
// adding components
sessionStorage.OFFICE_USER === "ANALYST" &&
  Array.from(document.querySelectorAll(".btn-add")).map((button) => {
    button.disabled = true;
  });

// THEME CHANGING
const themeTrigger = document.querySelector("#theme_changer");
const dataTheme = document.documentElement;

// verify storage theme
if (localStorage.THEME === undefined) {
  localStorage.THEME = "light";
}
dataTheme.setAttribute("data-theme", localStorage.THEME);

// adjust at begin
themeTrigger.checked =
  dataTheme.getAttribute("data-theme") == "light" ? false : true;
// change theme at checkbox change
themeTrigger.addEventListener("change", function () {
  let theme = this.checked ? "dark" : "light";
  dataTheme.setAttribute("data-theme", theme);
  localStorage.THEME = theme;
});

// RANDOMIZE CORNERS
const radiusCorners = [
  "top--left",
  "top--right",
  "bottom--left",
  "bottom--right",
];
// randomize corner to remove radius
function borderChange(element) {
  const randomNumber = Math.floor(Math.random() * 4);
  element.classList.add(radiusCorners[randomNumber]);
  radiusCorners.push(radiusCorners[randomNumber]);
}
// reset corners to original config
function resetBorder(element) {
  element.classList.remove(radiusCorners.at(-1));
  radiusCorners.pop();
}

// SHOW/HIDE LOADING
function showLoading() {
  opacityPointer(".load-proc", "show");
}
function hideLoading() {
  opacityPointer(".load-proc", "hide");
}
