// display login card and reset form
function showLogin() {
  document.querySelector("body").style.overflowY = "hidden"; // disable scroll
  aside_login.style.display = "flex";
  form_login.reset();
  setTimeout(() => {
    opacityPointer("#aside_login", "show");
    login_email.focus();
  }, 200);
}
// hide login card
function hideLogin() {
  document.querySelector("body").style.overflowY = "auto"; // enable scroll again
  opacityPointer("#aside_login", "hide");
  setTimeout(() => {
    aside_login.style.display = "none";
  }, 200);
}
// ----------------
// animate labels
addAnimatedLabelEvent([
  "email",
  "password",
]);
