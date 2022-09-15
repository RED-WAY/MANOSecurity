function showCollections(){


    const companyVar = sessionStorage.COMPANY_USER;



    fetch(`/collection/showCollection/${companyVar}`, {
  
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
  
  
            
            colecoes_content.innerHTML = "";
            
            for (var i = 0; i < json.length; i++) {
                colecoes_content.innerHTML += `
               
              <div class="card-info" id="${json[i].idSector}">
              <ion-icon name="layers-outline"></ion-icon>
              <div class="card-buttons">
                <button
                  onclick="formView(true, 'Editar coleção', 'collection', 'edit', '${json[i].idSector}')"
                  class="btn-special"
                >
                  <ion-icon name="create-outline"></ion-icon>
                  <p>EDITAR</p>
                </button>
                <button
                  onclick="removeCollection('${json[i].idSector}')"
                  class="btn-special"
                >
                  <ion-icon name="trash-outline"></ion-icon>
                  <p>REMOVER</p>
                </button>
              </div>
              <h3 id="level_collection1">LEVEL: ${json[i].sectorLevel}</h3>
              <h2 id="name_collection1">Name: ${json[i].sectorName}</h2>
              <p>
                - Lorem ipsum dolor sit, amet consectetur<br />
                - Lorem ipsum dolor sit, amet consectetur<br />
                - Lorem ipsum dolor sit, amet consectetur<br />
          
              </p>
            </div>
          
              
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