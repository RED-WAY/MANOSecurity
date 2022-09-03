function editMachine(idMachine) {
  
  const collectionVar =  machine_collection.value;
  const nameVar = machine_name.value;

  fetch(`/machine/editMachine/${idMachine}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      newCollectionServer: collectionVar,
      newNameServer: nameVar
    }),
  })
    .then(function (result) {
      if (result.ok) {
          showDevices()
      } else if (result.status == 404) {
        window.alert("Deu 404!");
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
