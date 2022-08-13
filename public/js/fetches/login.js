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
      .then(function (resposta) {
        console.log("AT THEN OF logIn()!");

        if (resposta.ok) {
          console.log(resposta);

          resposta.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));

            sessionStorage.EMAIL_USUARIO = json.email;
            sessionStorage.NOME_USUARIO = json.nome;
            sessionStorage.ID_USUARIO = json.id;

            setTimeout(function () {
              console.log("LOGIN EFETUADO COM SUCESSO");
              hideLogin();
            }, 500);
          });
        } else {
          console.log("Houve um erro ao tentar realizar o login!");

          resposta.text().then((texto) => {
            console.error(texto);
          });
        }
      })
      .catch(function (erro) {
        console.log(erro);
      });

    return false;
  }
}
