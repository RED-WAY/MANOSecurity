function logIn() {
  const emailVar = login_email.value;
  const passwordVar = login_password.value;

  if (emailVar == "" || passwordVar == "") {
    return false;
  } else if (emailVar.indexOf("@") == -1) {
    return false;
  } else {
    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", passwordVar);

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
          console.log(result);

          result.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));

            sessionStorage.EMAIL_USER = json.userEmail;
            sessionStorage.NOME_USER = json.userName;
            sessionStorage.ID_USER = json.idUser;

            setTimeout(function () {
              hideLogin();
              window.location = "../../dashboard.html";
            }, 500);
          });
        } else {
          result.text().then((err) => {
            console.error(err);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}
