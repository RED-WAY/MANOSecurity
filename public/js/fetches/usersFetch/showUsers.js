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


          
          usersDysplay.innerHTML = "";
          
          for (var i = 0; i < json.length; i++) {
            usersDysplay.innerHTML += `
             
            
        
             
              <tr onclick="userBtnAttributes(true, '${json[i].idConsumer}')">
                <td>${json[i].consumerName}</td>
                <td>${json[i].consumerEmail}</td>
                <td>${json[i].responsability}</td>
                <td>10/03/2004</td>
                <td></td>
                
            
            
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