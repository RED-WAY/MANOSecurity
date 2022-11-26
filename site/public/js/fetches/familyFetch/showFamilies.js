function showFamilies() {
  const permission = () => {
    return {
      MASTER: "",
      ADMIN: "",
      ANALYST: "disabled",
    }[sessionStorage.OFFICE_USER];
  };

  showLoading();

  const fkCompanyVar = sessionStorage.COMPANY_USER;

  fetch(`${baseURL}/family/showFamilies/${fkCompanyVar}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((res) => {
          colecoes_content.innerHTML = "";

          for (let i = 0; i < res.length; i++) {
            if (i == 0 || res[i].idFamily != res[i - 1].idFamily) {
              colecoes_content.innerHTML += `
              
              <div class="card-info" id="${res[i].idFamily}">
              <ion-icon name="layers-outline"></ion-icon>
              <div class="card-buttons">
                <button
                  ${permission()}
                  onclick="formView(true, 'Editar coleção', 'family', 'edit', '${
                    res[i].idFamily
                  }')"
                  class="btn-special"
                >
                  <ion-icon name="create-outline"></ion-icon>
                  <p>EDITAR</p>
                </button>
                <button
                  ${permission()}
                  onclick="setYes('Remover coleção', 'removeFamily', '${
                    res[i].idFamily
                  }')"
                  class="btn-special"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                  <p>REMOVER</p>
                </button>
              </div>
              <h3 id="level_family1">LEVEL: ${res[i].familyLevel}</h3>
              <h2 id="name_family1">nome: ${res[i].familyName}</h2>
                <p id="access_preview_${res[i].idFamily}">
                    
                </p>
              </div> 
                `;

              // plot preview process
              res.map((line) => {
                if (line.idFamily == res[i].idFamily) {
                  document.querySelector(
                    `#access_preview_${res[i].idFamily}`
                  ).innerHTML += `
                    - ${
                      line.operationName || "NÃO HÁ ACESSOS ADICIONADOS"
                    }<br />
                    `;
                }
              });
            }
          }
        });
        showAccess();
      } else {
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto exibia as coleções!"
        );
        throw "There was an error while getting the machines";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      showMessage("error", "Aconteceu algum erro enquanto exibia as coleções!");
    });
  setTimeout(() => {
    hideLoading();
  }, 1000);
  return false;
}
