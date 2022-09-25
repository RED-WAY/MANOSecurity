function showCollections() {
  const companyVar = sessionStorage.COMPANY_USER;

  fetch(`/collection/showCollections/${companyVar}`, {
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
            if (i == 0 || res[i].idSector != res[i - 1].idSector) {
              colecoes_content.innerHTML += `
               
              <div class="card-info" id="${res[i].idSector}">
              <ion-icon name="layers-outline"></ion-icon>
              <div class="card-buttons">
                <button
                  onclick="formView(true, 'Editar coleção', 'collection', 'edit', '${res[i].idSector}')"
                  class="btn-special"
                >
                  <ion-icon name="create-outline"></ion-icon>
                  <p>EDITAR</p>
                </button>
                <button
                  onclick="removeCollection('${res[i].idSector}')"
                  class="btn-special"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                  <p>REMOVER</p>
                </button>
              </div>
              <h3 id="level_collection1">LEVEL: ${res[i].sectorLevel}</h3>
              <h2 id="name_collection1">Name: ${res[i].sectorName}</h2>
                <p id="access_preview_${res[i].idSector}">
                    
                </p>
              </div> 
                `;

              // plot preview process
              res.map((line) => {
                if (line.idSector == res[i].idSector) {
                  document.querySelector(
                    `#access_preview_${res[i].idSector}`
                  ).innerHTML += `
                    - ${
                      line.OperationName || "NÃO HÁ ACESSOS ADICIONADOS"
                    }<br />
                    `;
                }
              });
            }
          }
          // - Lorem ipsum dolor sit, amet consectetur<br />
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
