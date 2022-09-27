function removeCollection(idCollection) {
  showLoading();

  fetch(`/collection/editMachineCollections/${idCollection}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      idCollectionServer: idCollection,
    }),
  })
    .then(function (result) {
      if (result.ok) {
        showDevices();
        removeFromOperationLog(idCollection, removeFromSector, idCollection);
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

function removeFromOperationLog(fkCollection, postFunc, parameters) {
  fetch(`/collection/removeFromOperationLog/${fkCollection}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        postFunc(parameters);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 500);
      } else if (result.status == 404) {
        window.alert("error 404!");
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 1000);
      } else {
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 1500);
        throw "Delete collection from operation log has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERROR: ${result}`);
      hideConfirm();
      setTimeout(() => {
        hideLoading();
      }, 3000);
    });
}

function removeFromSector(idCollection) {
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
        hideConfirm();
        setTimeout(() => {
          formView(false);
          hideLoading();
        }, 500);
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
