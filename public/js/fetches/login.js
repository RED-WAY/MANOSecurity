function logIn() {
  showLoading();

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
          setTimeout(() => {
            hideLoading();            
            result.text().then((err) => {
              console.error(err);
            });
          }, 1000);
        }
      })
      .catch((error) => {      
        console.log(error);
        setTimeout(() => {
          hideLoading();          
        }, 3000);
      })
    return false;
  }
}
