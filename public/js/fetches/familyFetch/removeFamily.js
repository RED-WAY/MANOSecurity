function removeFamily(fkFamily) {
  showLoading();

  fetch(`/family/editMachineFamilies`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkFamilyServer: fkFamily,
    }),
  })
    .then(function (result) {
      if (result.ok) {
        showMachines();
        removeFromFamilyOperations(fkFamily, removeFromFamily, fkFamily);
      } else if (result.status == 404) {
        window.alert("error 404!");
      } else {
        throw "Update machine families has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
    });
}

function removeFromFamilyOperations(fkFamily, postFunc, parameters) {
  fetch(`/family/removeFromFamilyOperations/${fkFamily}`, {
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
        throw "Delete family from familyOperations has fail, result: " + result.status;
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

function removeFromFamily(idFamily) {
  fetch(`/family/deleteFamily/${idFamily}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        showFamilies();
        getFamily();
        hideConfirm();
        setTimeout(() => {
          formView(false);
          hideLoading();
          showMessage('success', 'Coleção removida com sucesso!');
        }, 500);
      } else if (result.status == 404) {
        window.alert("error 404!");
      } else {
        throw "Delete family has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERROR: ${result}`);
    });
}
