const html = document.querySelector("html");
const themeTrigger = document.querySelector("#theme_changer");

const getStyle = (element, variable) => {
  window.getComputedStyle(element).getPropertyValue(variable);
};

const lightColors = {
  bla: getStyle(html, "--bla"),
  blaTrans1: getStyle(html, "--bla-trans1"),
  blaTrans2: getStyle(html, "--bla-trans2"),
  red: getStyle(html, "--red"),
  redDark: getStyle(html, "--red-dark"),
  redLight: getStyle(html, "--red-light"),
  back1: getStyle(html, "--bla-ack1"),
  font1: getStyle(html, "--font1"),
  border1: getStyle(html, "--bla-order1"),
};
const darkColors = {
  bla: getStyle(html, "--bla"),
  blaTrans1: "#1e1e1eaa",
  blaTrans2: getStyle(html, "--bla-trans2"),
  red: getStyle(html, "--red"),
  redDark: getStyle(html, "--red-dark"),
  redLight: getStyle(html, "--red-light"),
  back1: "#000",
  font1: "#fff",
  border1: getStyle(html, "--border1"),
};

//
const transformKey = (key) =>
  `--${key.replace(/([A-Z])/, "-$1").toLowerCase()}`;

// change theme to a theme (parameter)
function changeTheme(theme) {
  Object.keys(theme).map((key) => {
    html.style.setProperty(transformKey(key), theme[key]);
  });
}

// change theme at checkbox clicked
themeTrigger.addEventListener("change", ({ target }) => {
  target.checked ? changeTheme(darkColors) : changeTheme(lightColors);
});
