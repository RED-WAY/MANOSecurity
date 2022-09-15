function getCollection(idCompany){

  const idCompanyVar = idCompany;

  
   
 if (idCompanyVar == undefined) {
    return false;
  } else {
    

    fetch(`/collection/getCollection/${idCompanyVar}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (result) {
        if (result.ok) {
          console.log(result);

          result.json().then((json) => {
            console.log(json);
            console.log(JSON.stringify(json));
          
            for(var i = 0; i < json.length; i++ ){
            machine_collection_select.innerHTML +=
             `<option value="${json[i].idSector}" selected>${json[i].sectorName}</option>`
            }
            setTimeout(function () {
            
             
            }, 500);
          });
        } else {
          result.text().then((err) => {
            console.error(err);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }


}