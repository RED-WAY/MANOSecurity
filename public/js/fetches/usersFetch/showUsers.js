function showUsers(){

   const idCompany = sessionStorage.COMPANY_USER;

   fetch(`/users/showUsers/${idCompany}`, {
  
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


          
          usersDisplay.innerHTML = "";
          
          for (var i = 0; i < json.length; i++) {
            usersDisplay.innerHTML += `
             
            
            
               <tr onclick="userBtnAttributes(true, '${json[i].idConsumer}')">
                 <td onclick="userBtnAttributes(true, '${json[i].idConsumer}')">${json[i].consumerName}</td>
                 <td onclick="userBtnAttributes(true, '${json[i].idConsumer}')">${json[i].consumerEmail}</td>
                 <td onclick="userBtnAttributes(true, '${json[i].idConsumer}')">${json[i].responsability}</td>
                 <td onclick="userBtnAttributes(true, '${json[i].idConsumer}')">${json[i].dia}/${json[i].mes}/${json[i].ano}</td>
                 <td onclick="userBtnAttributes(true, '${json[i].idConsumer}')">${json[i].gerente}</td>
  
              
               <tr>
            
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