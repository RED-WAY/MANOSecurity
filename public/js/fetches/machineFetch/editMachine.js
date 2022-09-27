function editMachine(idMachine) {
  showLoading();

  const machineNameVar = machine_name.value;
  const fkFamilyVar =  machine_family_select.value;

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
        }, 500);
      } else if (result.status == 404) {
        window.alert("error 404!");
        hideConfirm();
        setTimeout(() => {
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
