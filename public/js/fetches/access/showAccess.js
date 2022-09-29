function showAccess() {
  showLoading();

  const idCompany = sessionStorage.COMPANY_USER;

  fetch(`/access/showAccess/${idCompany}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((json) => {
          acessos_content.innerHTML = "";
          for (var i = 0; i < json.length; i++) {
            acessos_content.innerHTML += `               
                <div class="card-info acessos-info" id="${json[i].idOperation}">
                <ion-icon name="lock-open-outline"></ion-icon>
                <div class="card-buttons">
                  <button onclick="setYes('Remover acesso', 'deleteAccess', '${json[i].idOperation}')" class="btn-special">
                    <ion-icon name="trash-outline"></ion-icon>
                    <p>REMOVER</p>
                  </button>
                </div>
                <h3>TYPE: ${json[i].operationType}</h3>
                <h2>Name: ${json[i].operationName}</h2>
                <p>Process path: ${json[i].operationPath}</p>
              </div>              
           `;
          }

          const divCheck = document.querySelector(".div-checkes");
          divCheck.innerHTML = "";
          for (var i = 0; i < json.length; i++) {
            divCheck.innerHTML += `
            <div class="pretty p-default p-default p-thick p-pulse manos-check">
                      <input type="checkbox" class="get-checkes" id="${json[i].idOperation}" />
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
