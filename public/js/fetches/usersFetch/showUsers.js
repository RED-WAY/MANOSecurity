function showUsers() {
  const fkCompany = sessionStorage.COMPANY_USER;
  const idConsumer = sessionStorage.ID_USER;

  fetch(`/users/showConsumers/${fkCompany}/${idConsumer}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((users) => {
          usersDisplay.innerHTML = "";
          
          for (var i = 0; i < json.length; i++) {
            usersDisplay.innerHTML += `
             
            
            
              <tr onclick="userBtnAttributes(true, '${json[i].idConsumer}')">
                <td>${json[i].consumerName}</td>
                <td>${json[i].consumerEmail}</td>
                <td>${json[i].responsability}</td>
                <td>${json[i].dia}/${json[i].mes}/${json[i].ano}</td>
                <td>${json[i].gerente}</td>
              </tr>
              
           
            
         `

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