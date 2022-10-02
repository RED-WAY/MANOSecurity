function deleteAccess(fkCompanyOperations, fkAccess) {
  showLoading();

  const fkCompanyVar = sessionStorage.COMPANY_USER;

  fetch(`/access/deleteAccessFamily/${fkCompanyVar}/${fkCompanyOperations}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        deleteAccessCompany(fkCompanyOperations, fkAccess);
      } else if (result.status == 404) {
        window.alert("error 404!");
      } else {
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto removia um acesso!"
        );
        throw "Delete company access has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
      hideLoading();
      hideConfirm();
      showMessage("error", "Aconteceu algum erro enquanto removia um acesso!");
    });
}

function deleteAccessCompany(fkCompanyOperations, fkAccess) {
  const fkCompanyVar = sessionStorage.COMPANY_USER;

  fetch(`/access/deleteAccessCompany/${fkCompanyVar}/${fkCompanyOperations}`, {
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
          showMessage("success", "Acesso removido com sucesso!");
        }, 500);
      } else if (result.status == 404) {
        window.alert("error 404!");
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto removia um acesso!"
          );
        }, 1000);
      } else {
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto removia um acesso!"
          );
        }, 1500);
        throw "Delete family access has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
      hideConfirm();
      setTimeout(() => {
        hideLoading();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto removia um acesso!"
        );
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
          hideLoading();
          hideConfirm();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto removia um acesso!"
          );
          throw "There was an error while getting global access use";
        }
      })
      .catch((error) => {
        console.log(error);
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto removia um acesso!"
        );
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
        console.log("ACCESS GLOBALLY DELETED");
      } else if (result.status == 404) {
        window.alert("error 404!");
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto removia um acesso!"
        );
      } else {
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto removia um acesso!"
        );
        throw "Delete global access has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
      hideLoading();
      hideConfirm();
      showMessage("error", "Aconteceu algum erro enquanto removia um acesso!");
    });
}
