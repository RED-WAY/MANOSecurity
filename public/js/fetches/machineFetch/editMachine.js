function editMachine(idMachine) {
  showLoading();

  const machineNameVar = machine_name.value.trimStart().trimEnd();
  const fkFamilyVar = machine_family_select.value;

  fetch(`/machine/editMachine/${idMachine}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      machineNameServer: machineNameVar,
      fkFamilyServer: fkFamilyVar,
    }),
  })
    .then(function (result) {
      if (result.ok) {
        showMachines();
        hideConfirm();
        setTimeout(() => {
          formView(false);
          hideLoading();
          showMessage("success", "Máquina editada com sucesso!");
        }, 200);
      } else if (result.status == 404) {
        window.alert("error 404!");
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto editava uma máquina!"
          );
        }, 800);
      } else {
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto editava uma máquina!"
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
          "Aconteceu algum erro enquanto editava uma máquina!"
        );
      }, 3000);
    });
}
