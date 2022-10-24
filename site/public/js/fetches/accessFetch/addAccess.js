function addAccess() {
  showLoading();

  const operationNameVar = access_name.value.toUpperCase().replace(/\s+/g, "");
  const operationTypeVar = access_type_select.value;

  if (operationNameVar == "") {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Nome do acesso não foi definido!");
  } else if (operationTypeVar == "") {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Tipo de acesso não foi escolhido!");
  } else {
    fetch(
      `/access/checkAccessGlobally/${operationNameVar}/${operationTypeVar}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then(function (result) {
        if (result.ok) {
          result.json().then((data) => {
            if (data.length == 0) {
              addAccessGlobal(operationNameVar, operationTypeVar);
            } else {
              addAccessCompany(data[0].idOperation);
            }
          });
        } else {
          hideLoading();
          hideConfirm();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto adicionava um acesso!"
          );
          throw "There was an error while getting the specific process";
        }
      })
      .catch((error) => {
        console.log(error);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 3000);
      });

    return false;
  }
}

function addAccessGlobal(operationNameVar, operationTypeVar) {
  fetch("/access/addAccessGlobal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      operationNameServer: operationNameVar,
      operationTypeServer: operationTypeVar,
    }),
  })
    .then(function (result) {
      if (result.ok) {
        addAccess();
      } else {
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 1000);
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto adicionava um acesso!"
        );
        throw "There was an error while adding operation global!";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      setTimeout(() => {
        hideLoading();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto adicionava um acesso!"
        );
      }, 3000);
    });

  return false;
}

function addAccessCompany(operationId) {
  const operationIdVar = operationId;
  const companyVar = sessionStorage.COMPANY_USER;

  if (operationIdVar == undefined) {
    console.log("operationIdVar is undefined");
  } else if (companyVar == undefined) {
    console.log("companyVar is undefined");
  } else {
    fetch("/access/addAccessCompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationIdServer: operationIdVar,
        companyServer: companyVar,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showAccess();
          hideConfirm();
          setTimeout(() => {
            formView(false);
            hideLoading();
            showMessage("success", "Acesso adicionado com sucesso!");
          }, 500);
        } else {
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            showMessage(
              "error",
              "Aconteceu algum erro enquanto adicionava um acesso!"
            );
          }, 1000);
          throw "There was an error while adding company operation!";
        }
      })
      .catch((error) => {
        console.log(error);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto adicionava um acesso!"
          );
        }, 3000);
      });

    return false;
  }
}
