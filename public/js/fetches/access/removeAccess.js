function deleteAccess(fkAccess) {
  showLoading();

  const fkCompanyVar = sessionStorage.COMPANY_USER;

  fetch(`/access/deleteAccessCompany/${fkCompanyVar}/${fkAccess}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        deleteAccessFamily(fkAccess);
      } else if (result.status == 404) {
        window.alert("error 404!");
      } else {
        throw "Delete company access has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
    });
}

function deleteAccessFamily(fkAccess) {
  const fkCompanyVar = sessionStorage.COMPANY_USER;

  fetch(`/access/deleteAccessFamily/${fkCompanyVar}/${fkAccess}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        showFamilies();
        showAccess();
        hideConfirm();
        verifyGlobalAccessUsing(fkAccess);
        setTimeout(() => {
          hideLoading();
          showMessage('success', 'Acesso removido com sucesso!');
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
        throw "Delete family access has fail, result: " + result.status;
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

function verifyGlobalAccessUsing(idAccess) {
  if (idAccess == "") {
    console.log("idAccess is undefined");
  } else {
    fetch(`/access/verifyGlobalAccessUsing/${idAccess}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (result) {
        if (result.ok) {
          result.json().then((data) => {
            data = JSON.parse(JSON.stringify(data));

            let isUsing = false;
            for (const register of data) {
              if (register.company != null || register.familiesUsing != null) {
                isUsing = true;
              }
            }

            if (!isUsing) {
              deleteAccessGlobal(idAccess);
            }
          });
        } else {
          throw "There was an error while getting global access use";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}

function deleteAccessGlobal(idAccess) {
  fetch(`/access/deleteAccessGlobal/${idAccess}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        console.log("ACCESS GLOBALY DELETED");
      } else if (result.status == 404) {
        window.alert("error 404!");
      } else {
        throw "Delete global access has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
    });
}
