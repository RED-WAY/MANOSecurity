function deleteUser(idConsumer, fkManager) {
  updateMachineAdder(fkManager, idConsumer);
}

function updateMachineAdder(fkManager, idConsumer) {
  fetch(`/users/updateMachineAdder/${fkManager}/${idConsumer}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        updateChildrenManager(fkManager, idConsumer);
      } else if (result.status == 404) {
        window.alert("error 404!");
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro atualizavam os gerentes das máquinas!"
        );
      } else {
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro atualizavam os gerentes das máquinas!"
        );
        throw "Update machine adder has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
      hideLoading();
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro atualizavam os gerentes das máquinas!"
      );
    });
}

function updateChildrenManager(fkManager, idConsumer) {
  fetch(`/users/updateChildrenManager/${fkManager}/${idConsumer}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        deleteUserFinal(idConsumer);
      } else if (result.status == 404) {
        window.alert("error 404!");
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro atualizavam os gerentes dos usuários!"
        );
      } else {
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro atualizavam os gerentes dos usuários!"
        );
        throw "Update machine adder has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
      hideLoading();
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro atualizavam os gerentes dos usuários!"
      );
    });
}

function deleteUserFinal(idConsumer) {
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
        hideLoading();
        showMessage("success", "Usuário removido com sucesso!");
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
