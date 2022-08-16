function signUp() {
  const usernameVar = signup_username.value;
  const emailVar = signup_email.value;
  const passwordVar = signup_password.value;
  const confirmPasswordVar = signup_password_confirm.value;

  if (
    usernameVar == "" ||
    emailVar == "" ||
    passwordVar == "" ||
    confirmPasswordVar == ""
  ) {
    return false;
  } else {
    // SEND CONFIRMED INPUTS
    fetch("/users/signUp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        usernameServer: usernameVar,
        emailServer: emailVar,
        passwordServer: passwordVar,
      }),
    })
      .then(function (result) {
        console.log("resposta: ", result);

        if (result.ok) {
          setTimeout(() => {
            console.log("CADASTRO REALIZADO COM SUCESSO");
            hideSignup();
            showLogin();
          }, 500);
        } else {
          throw "There was an error while signing up!";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}
