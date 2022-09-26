function showDevices() {
  const companyVar = sessionStorage.COMPANY_USER;

  fetch("/machine/showMachine", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      companyServer: companyVar,
    }),
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((json) => {
          dispositivos_content.innerHTML = "";

          for (var i = 0; i < json.length; i++) {
            json[i]
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
                <button onclick="deleteMachine(${json[i].idMachine})"
                class="btn-special">
                  <ion-icon name="trash-outline"></ion-icon>
                  <p>REMOVER</p>
                </button>
              </div>
              <h3 id="collection_machine${json[i].idSector}">COLLECTION: ${
              json[i].sectorName || "não adicionada"
            }</h3>
              <h2 id="name_machine${json[i].idMachine}">Name: ${
              json[i].machineName
            }</h2>
              <p>
                <strong>Adicionado em: </strong>${json[i].dtAdded.split("-")[0]}<br />
                <strong>Às: </strong>${json[i].dtAdded.split("-")[1]}<br />
                <strong>Por: </strong>${json[i].nameUserAdder}
              </p>
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

  return false;
}
