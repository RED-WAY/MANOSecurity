function showMachines() {
  showLoading();
  const fkCompanyVar = sessionStorage.COMPANY_USER;

  fetch("/machine/showMachines", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkCompanyServer: fkCompanyVar,
    }),
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((json) => {
          dispositivos_content.innerHTML = "";

          for (var i = 0; i < json.length; i++) {
            json[i];
            dispositivos_content.innerHTML += `             
              <div class="card-info" id="machine${json[i].idMachine}" >
              <ion-icon name="desktop-outline"></ion-icon>
              <div class="card-buttons">
                <button onclick="formView(true, 'Editar máquina', 'machine', 'edit', '${
                  json[i].idMachine
                }')"
                class="btn-special">
                  <ion-icon name="create-outline"></ion-icon>
                  <p>EDITAR</p>
                </button>
                <button onclick="setYes('Remover máquina', 'deleteMachine', '${
                  json[i].idMachine
                }')" class="btn-special">
                  <ion-icon name="trash-outline"></ion-icon>
                  <p>REMOVER</p>
                </button>
              </div>
              <h3 id="family_machine${json[i].idFamily}">COLLECTION: ${
              json[i].familyName || "não adicionada"
            }</h3>
              <h2 id="name_machine${json[i].idMachine}">Name: ${
              json[i].machineName
            }</h2>
              <p>
                <strong>Adicionado em: </strong>${
                  json[i].dtAdded.split("-")[0]
                }<br />
                <strong>Às: </strong>${json[i].dtAdded.split("-")[1]}<br />
                <strong>Por: </strong>${
                  json[i].consumerName || "USUÁRIO REMOVIDO"
                }
              </p>
              <div class="copy-token">
                <div>
                  <div>
                    <p class="token-blur" id="token${
                      json[i].idMachine
                    }">askdjhkj123</p>
                  </div>                  
                  <ion-icon name="key-outline" onclick="copyToken(${
                    json[i].idMachine
                  })" id="key${json[i].idMachine}"></ion-icon>
                </div>
              </div>
            </div> 
         `;
          }
        });
      } else {
        throw "There was an error while getting the machines";
      }
    })
    .catch((error) => {
      console.log(error);
    });
  setTimeout(() => {
    hideLoading();
  }, 1000);
  return false;
}
