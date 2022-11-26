function editUser(idConsumer) {
  showLoading();

  const consumerNameVar = user_name.value;
  const consumerEmailVar = user_email.value;
  const consumerPasswordVar = user_password.value;
  const managementVar = user_office.value.toUpperCase();

  const emailRegex = new RegExp(
    /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[A-Z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
  );

  if (consumerNameVar == "") {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Nome do usuário não foi definido!");
    return false;
  } else if (consumerEmailVar == "" || !consumerEmailVar.match(emailRegex)) {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Email inválido!");
    return false;
  } else if (consumerPasswordVar == "") {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Senha do usuário não foi definida!");
    return false;
  } else if (managementVar == "") {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Cargo do usuário não foi definido!");
    return false;
  } else if (idConsumer == undefined) {
    hideLoading();
    hideConfirm();
    showMessage(
      "warning",
      "Gestor não identificado! Encerre a sessão e tente novamente"
    );
    return false;
  } else {
    fetch(`${baseURL}/users/editConsumer/${idConsumer}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        consumerNameServer: consumerNameVar,
        consumerEmailServer: consumerEmailVar,
        consumerPasswordServer: consumerPasswordVar,
        managementServer: managementVar,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showUsers();
          userBtnAttributes(false);
          hideConfirm();
          setTimeout(() => {
            formView(false);
            hideLoading();
            showMessage("success", "Usuário editado com sucesso!");
          }, 500);
        } else {
          result.json().then((res) => {
            console.log(res);
            hideConfirm();
            setTimeout(() => {
              hideLoading();
              let errorMsg =
                "Aconteceu algum erro enquanto adicionava um usuário!";
              if (res.match(/duplicate/i)) {
                errorMsg = "E-mail já cadastrado no sistema! Tente novamente";
              }
              showMessage("error", errorMsg);
            }, 1000);
          });
          throw res;
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}
