function editCollection(idCollection) {
  showLoading();

  const collectionLevel = collection_level_select.value;
  const collectionName = collection_name.value;
  const company = sessionStorage.COMPANY_USER;

  const accessArray = [];
  const divCheck = document.querySelector(".div-checkes");
  Array.from(divCheck.children).map((access) => {
    const checkOpt = access.children[0];
    checkOpt.checked && accessArray.push(checkOpt.id);
  });

  if (collectionLevel == undefined) {
    console.log("collection level is not defined");
    return false;
  } else if (collectionName == "") {
    console.log("collection name is undefined");
    return false;
  } else {
    fetch(`/collection/editCollection/${idCollection}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionLevelServer: collectionLevel,
        collectionNameServer: collectionName,
        companyServer: company,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showCollections();
          getCollection();
          removeFromOperationLog(idCollection, addCollectionAccess, [
            accessArray,
            idCollection,
          ]);
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            formView(false);
          }, 500);
        } else {
          setTimeout(() => {
            hideLoading();
            formView(false);
          }, 500);
          throw "There was an error while editing a collection!";
        }
      })
      .catch((error) => {
        console.log(error);
        setTimeout(() => {
          hideLoading();
          formView(false);
        }, 500);
      });

    return false;
  }
}
