function addCollection() {
  showLoading();

  var collectionLevel = collection_level_select.value;
  var collectionName = collection_name.value;
  var company = sessionStorage.COMPANY_USER;

  const accessArray = [];
  const divCheck = document.querySelector(".div-checkes");
  Array.from(divCheck.children).map((access) => {
    const checkOpt = access.children[0];
    checkOpt.checked && accessArray.push(checkOpt.id);
  });

  if (collectionLevel == undefined) {
    console.log("collectionLevel is undefined!");
    return false;
  } else if (collectionName == "") {
    console.log("collectionName is undefined!");
    return false;
  } else {
    fetch("/collection/addCollection", {
      method: "POST",
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
        const idPromise = result.json();
        idPromise.then((res) => {
          if (result.ok) {
            if (accessArray.length > 0) {
              addCollectionAccess([accessArray, res.insertId]);
            }
            showCollections();
            getCollection(sessionStorage.COMPANY_USER);
            hideConfirm();
            setTimeout(() => {
              formView(false);
              hideLoading();
            }, 500);
          } else {
            hideConfirm();
            setTimeout(() => {
              hideLoading();
            }, 1000);
            throw "There was an error while you´re add a collection!";
          }
        });
      })
      .catch((error) => {
        console.log(error);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 1000);
      });

    return false;
  }
}

function addCollectionAccess([accessArray, fkCollection]) {
  if (accessArray == undefined) {
    console.log("accessArray undefined at addCollectionAccess FETCH");
    return false;
  } else if (fkCollection == undefined) {
    console.log("fkCollection undefined at addCollectionAccess FETCH");
    return false;
  } else {
    fetch("/collection/addCollectionAccess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessArrayServer: accessArray,
        fkCollectionServer: fkCollection,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showCollections();
        } else {
          throw "There was an error while you´re add a collection access!";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}
