function showAcess() {
  const idCompany = sessionStorage.COMPANY_USER;

  fetch(`/acess/showAcess/${idCompany}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        console.log("resposta: ", result);

        result.json().then((json) => {
          console.log(JSON.stringify(json));

          acessos_content.innerHTML = "";

          for (var i = 0; i < json.length; i++) {
            acessos_content.innerHTML += `
               
                <div class="card-info acessos-info" id="${json[i].idOperation}">
                <ion-icon name="lock-open-outline"></ion-icon>
                <div class="card-buttons">
                  <button onclick="remove('${json[i].idOperation}')" class="btn-special">
                    <ion-icon name="trash-outline"></ion-icon>
                    <p>REMOVER</p>
                  </button>
                </div>
                <h3>TYPE: ${json[i].operationType}</h3>
                <h2>Name: ${json[i].OperationName}</h2>
                <p>Process path: ${json[i].OperationPath}</p>
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
