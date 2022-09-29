function editUser(idConsumer) {
  showLoading();

  const consumerNameVar = user_name.value;
  const consumerEmailVar = user_email.value;
  const consumerPasswordVar = user_password.value;
  const managementVar = user_office.value.toUpperCase();

  if (consumerNameVar == undefined) {
    console.log("consumerName is undefined");
  } else if (consumerEmailVar == undefined) {
    console.log("consumerEmail is undefined");
  } else if (consumerPasswordVar == undefined) {
    console.log("consumerPassword is undefined");
  } else if (managementVar == undefined) {
    console.log("management is undefined");
  } else if (idConsumer == undefined) {
    console.log("idConsumer is undefined");
  } else {
    fetch(`/users/editConsumer/${idConsumer}`, {
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
            showMessage('success', 'Usuário editado com sucesso!');
          }, 500);
        } else {
          hideConfirm();
          setTimeout(() => {
            hideLoading();
          }, 800);
          throw "There was an error while editing user!";
        }
      })
      .catch((error) => {
        console.log(error);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 1000);
      });

    return false;
  }
}
