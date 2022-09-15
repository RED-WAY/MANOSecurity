
function removeCollection(idCollection){


  fetch(`/collection/deleteCollection/${idCollection}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      
    })
      .then(function (result) {
        if (result.ok) {
            showCollections();
            formView(false);
  
        } else if (result.status == 404) {
          window.alert("error 404!");
        } else {
          throw (
            "Delete has fail, result: " +
            result.status
          );
        }
      })
      .catch(function (result) {
        console.log(`#ERRO: ${result}`);
      });
}