function signUp() {
  var nomeVar = signup_username.value;
  var emailVar = signup_email.value;
  var senhaVar = signup_password.value;
  var confirmacaoSenhaVar = signup_password_confirm.value;

  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == ""
  ) {

    return false;
  } else {


    // SEND CONFIRMED INPUTS
    
    fetch("/users/signUp", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
        body: JSON.stringify({

          nomeServer: nomeVar,
          emailServer: emailVar,
          senhaServer: senhaVar
      })
  })
      .then(function (resposta) {
        console.log("resposta: ", resposta);

        if (resposta.ok) {
          setTimeout(() => {
            console.log("CADASTRO REALIZADO COM SUCESSO");
            hideSignup();
            showLogin();
          }, 500);

        } else {
          throw "Houve um erro ao tentar realizar o cadastro!";
        }
      })
      .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
      });

    return false;
  }

}
