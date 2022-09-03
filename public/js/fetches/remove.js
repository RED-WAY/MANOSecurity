function deleteMachine(idMachine) {

  fetch(`/machine/deleteMachine/${idMachine}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
         showDevices();
      } else if (result.status == 404) {
        window.alert("Error 404!");
      } else {
        throw (
          "Delete has fail, result: " +
          result.status
        );
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
    });
}
