function removeCollection(idCollection) {

  fetch(`/collection/editMachineCollections/${idCollection}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idCollectionServer: idCollection,
    })
  })
    .then(function (result) {
      if (result.ok) {
        showDevices();
        edit(idCollection);
      } else if (result.status == 404) {
        window.alert("error 404!");
      } else {
        throw "Update machine colletions has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
    });
}

function edit(idCollection) {
  fetch(`/collection/deleteCollection/${idCollection}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        showCollections();
        getCollection();
        formView(false);
      } else if (result.status == 404) {
        window.alert("error 404!");
      } else {
        throw "Delete collection has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERROR: ${result}`);
    });
}