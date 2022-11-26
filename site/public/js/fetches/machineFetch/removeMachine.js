function deleteMachine(idMachine) {
  showLoading();

  fetch(`${baseURL}/machine/deleteMachine/${idMachine}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        showMachines();
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage("success", "Máquina removida com sucesso!");
        }, 500);
      } else if (result.status == 404) {
        window.alert("Error 404!");
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto removia uma máquina!"
          );
        }, 800);
      } else {
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto removia uma máquina!"
          );
        }, 1000);
        throw "Delete has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
      hideConfirm();
      setTimeout(() => {
        hideLoading();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto removia uma máquina!"
        );
      }, 3000);
    });
}
