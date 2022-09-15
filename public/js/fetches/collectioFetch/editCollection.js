

function editCollection(idCollection){

      const newNameCollection = collection_name.value;
      const newCollectionLevel = collection_level_select.value;

    fetch(`/collection/editCollection/${idCollection}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newCollectionlevelServer: newCollectionLevel,
          newNameServer: newNameCollection
        }),
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