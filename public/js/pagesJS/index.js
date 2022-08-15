// display login card and reset form
function showLogin() {
  aside_login.style.display = "flex";
  form_login.reset();
  setTimeout(() => {
    opacityPointer("#aside_login", "show");
    login_email.focus();
  }, 200);
}
// hide login card
function hideLogin() {
  opacityPointer("#aside_login", "hide");
  setTimeout(() => {
    aside_login.style.display = "none";    
  }, 200);
}
// ----------------
// display signup card and reset form
function showSignup() {
  aside_signup.style.display = "flex";
  form_signup.reset();
  setTimeout(() => {
    opacityPointer("#aside_signup", "show");
    signup_email.focus();
  }, 200);
}
// hide signup card
function hideSignup() {
  opacityPointer("#aside_signup", "hide");
  setTimeout(() => {
    aside_signup.style.display = "none";
  }, 200);
}
// ----------------
// display menu aside
function showMenu() {
  opacityPointer("#aside_menu", "show");
  document.querySelector('#menu_first_item').focus();
}
// hide menu aside
function hideMenu() {
  opacityPointer("#aside_menu", "hide");
}