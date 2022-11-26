function showAccess() {
  const permission = () => {
    return {
      MASTER: "",
      ADMIN: "",
      ANALYST: "disabled",
    }[sessionStorage.OFFICE_USER];
  };

  showLoading();

  const idCompany = sessionStorage.COMPANY_USER;

  fetch(`${baseURL}/access/showAccess/${idCompany}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((json) => {
          acessos_content.innerHTML = "";
          for (let i = 0; i < json.length; i++) {
            acessos_content.innerHTML += `               
                <div class="card-info acessos-info" id="${json[i].idOperation}">
                <ion-icon name="lock-open-outline"></ion-icon>
                <div class="card-buttons">
                  <button 
                    ${permission()}
                    onclick="setYes('Remover acesso', 'deleteAccess', ['${
                      json[i].idCompanyOperations
                    }', '${json[i].idOperation}'])" 
                    class="btn-special">
                    <ion-icon name="trash-outline"></ion-icon>
                    <p>REMOVER</p>
                  </button>
                </div>
                <h3>TIPO: ${json[i].operationType}</h3>
                <h2>${json[i].operationName}</h2>
              </div>              
          `;
          }

          const divCheck = document.querySelector(".div-checks");
          divCheck.innerHTML = "";
          for (let i = 0; i < json.length; i++) {
            divCheck.innerHTML += `
            <div class="pretty p-default p-default p-thick p-pulse manos-check">
                      <input type="checkbox" class="get-checks" id="${json[i].idCompanyOperations}" />
                      <div class="state p-danger-o">
                        <label>${json[i].operationName}</label>
                      </div>
                    </div>
            `;
          }
        });
      } else {
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregavam os acessos!"
        );
        throw "There was an error while getting access";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregavam os acessos!"
      );
    });
  setTimeout(() => {
    hideLoading();
  }, 1000);
  return false;
}
