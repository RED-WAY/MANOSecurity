// SESSION MANAGE
function validateSession() {
  const consumerEmail = sessionStorage.EMAIL_USER;
  const consumerName = sessionStorage.NAME_USER;

  if (consumerEmail == null && consumerName == null) {
    window.location = "../index.html";
  }
}

function cleanSession() {
  sessionStorage.clear();
}

function aguardar() {}

function finalizarAguardar() {}
