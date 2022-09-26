function editMachine(idMachine) {
  showLoading();

  const collectionVar =  machine_collection_select.value;
  const nameVar = machine_name.value;

  fetch(`/machine/editMachine/${idMachine}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newCollectionServer: collectionVar,
      newNameServer: nameVar,
    }),
  })
    .then(function (result) {
      if (result.ok) {
        showDevices();
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          formView(false);
        }, 500);
      } else if (result.status == 404) {
        hideConfirm();
        setTimeout(() => {
          window.alert("error 404!");
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
