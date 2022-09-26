function logIn() {
  showLoading();

  const emailVar = login_email.value;
  const passwordVar = login_password.value;

  if (emailVar == "" || passwordVar == "") {
    showMessage("error", "E-mail e/ou senha não preenchido!");
    hideLoading();
    return false;
  } else {
    fetch("/users/logIn", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailServer: emailVar,
        passwordServer: passwordVar,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          result.json().then((json) => {
            sessionStorage.COMPANY_USER = json.company;
            sessionStorage.EMAIL_USER = json.consumerEmail;
            sessionStorage.NAME_USER = json.consumerName;
            sessionStorage.ID_USER = json.idConsumer;

            setTimeout(function () {
              hideLoading();
              hideLogin();
              window.location = "../../dashboard.html";
            }, 700);
          });
        } else {
          showMessage("error", "E-mail e/ou senha inválidos!");
          setTimeout(() => {
            hideLoading();
            result.text().then((err) => {
              console.error(err);
            });
          }, 1000);
        }
      })
      .catch((error) => {
        showMessage("error", "Erro na API!");
        console.log(error);
        setTimeout(() => {
          hideLoading();
        }, 3000);
      });
    return false;
  }
}
