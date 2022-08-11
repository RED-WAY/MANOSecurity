function cadastrar() {
  var nomeVar = nome_input.value;
  var emailVar = email_input.value;
  var senhaVar = senha_input.value;
  var confirmacaoSenhaVar = confirmacao_senha_input.value;

  if (
    nomeVar == "" ||
    emailVar == "" ||
    senhaVar == "" ||
    confirmacaoSenhaVar == ""
  ) {
    
    return false;
  } else {
    
  }

  // SEND CONFIRMED INPUTS
  fetch("/usuarios/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeServer: nomeVar,
      emailServer: emailVar,
      senhaServer: senhaVar,
    }),
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
