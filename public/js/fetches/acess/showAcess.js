function showAcess() {
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
                  <button onclick="deleteAccess('${json[i].idOperation}')" class="btn-special">
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

          const divCheck = document.querySelector(".div-checkes");
          divCheck.innerHTML = "";
          for (var i = 0; i < json.length; i++) {
            divCheck.innerHTML += `
            <div class="pretty p-default p-default p-thick p-pulse manos-check">
                      <input type="checkbox" class="get-checkes" id="${json[i].idOperation}" />
                      <div class="state p-danger-o">
                        <label>${json[i].OperationName}</label>
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

  return false;
}
