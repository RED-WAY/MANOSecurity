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
        }, 500);
      } else if (result.status == 404) {
        setTimeout(() => {
          window.alert("Error 404!");
          hideLoading();
        }, 800);
      } else {
        setTimeout(() => {
          hideLoading();
        }, 1000);
        throw "Delete has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
      setTimeout(() => {
        hideLoading();
      }, 3000);
    });
}
