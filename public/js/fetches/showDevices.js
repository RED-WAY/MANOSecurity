function showDevices() {
  const companyVar = sessionStorage.COMPANY_USER;

  // fazer ela dinamica

  // while que enquanto user estiver na pagina ele verifica com o banco
  // e se o length que retornar for diferente ele cria as div´s de novo

  // confirmar com big vitaminas

  // setInterval(funcao, tempo);

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
            dispositivos_content.innerHTML += `
              <div class="card-info" id="machine${i}">
              <ion-icon name="desktop-outline"></ion-icon>

              <div class="card-buttons">
                <button onclick="formView(true, 'Editar máquina', 'machine', 'edit', '${json[i].idMachine}')">
                  <ion-icon name="create-outline"></ion-icon>  
                  <p>EDITAR</p>
                </button>
                <button onclick="deleteMachine(${json[i].idMachine})">
                  <ion-icon name="trash-outline"></ion-icon>
                  <p>REMOVER</p>
                </button>
              </div>

              <h3 id="collection_machine">COLLECTION: ${json[i].collection}</h3>
              <h2 id="name_machine${i}">Name: ${json[i].machineName}</h2>
              <p>
                <strong>Adicionado em: </strong>${json[i].day}/${json[i].mounth}/${json[i].year}<br />
                <strong>Às: </strong>${json[i].hour}:${json[i].minut}<br />
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
