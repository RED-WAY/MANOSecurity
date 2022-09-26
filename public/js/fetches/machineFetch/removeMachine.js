function deleteMachine(idMachine) {
  showLoading();

  fetch(`/machine/deleteMachine/${idMachine}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        setTimeout(() => {
          showDevices();
          hideLoading();
          hideConfirm();
        }, 500);
      } else if (result.status == 404) {
        hideConfirm();
        setTimeout(() => {
          window.alert("Error 404!");
          hideLoading();
        }, 800);
      } else {
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 1000);
        throw "Delete has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
      hideConfirm();
      setTimeout(() => {
        hideLoading();
      }, 3000);
    });
}
