function deleteUser(idConsumer) {
  showLoading();

  fetch(`/users/deleteConsumer/${idConsumer}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        showUsers();
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage('success', 'Usuário removido com sucesso!');
        }, 500);
      } else if (result.status == 404) {
        window.alert("Error 404!");
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto removia um usuário!"
          );
        }, 800);
      } else {
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto removia um usuário!"
          );
        }, 1000);
        throw "Delete user has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
      hideConfirm();
      setTimeout(() => {
        hideLoading();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto removia um usuário!"
        );
      }, 3000);
    });
  userBtnAttributes(false);
}
