function addCollection() {
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
    console.log("deu ruim no addCollection");
    return false;
  } else if (collectionName == "") {
    console.log("collection needs name");
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
            setTimeout(() => {
              if (accessArray.length > 0) {
                addCollectionAccess([accessArray, res.insertId]);
              }
              formView(false);
              showCollections();
              getCollection(sessionStorage.COMPANY_USER);
            }, 500);
          } else {
            throw "There was an error while you´re add a collection!";
          }
        });
      })
      .catch((error) => {
        console.log(error);
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
        if (!result.ok) {
          throw "There was an error while you´re add a collection access!";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}
