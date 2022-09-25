function deleteAccess(fkAcess) {
  fetch(`/access/deleteAcessCompany/${fkAcess}`, {
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
        throw "Delete company access has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
    });
}

function deleteAccessFamily(fkAcess) {
  fetch(`/access/deleteAccessFamily/${fkAcess}`, {
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
        throw "Delete family access has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
    });
}

function verifyGlobalAccessUsing(fkAcess) {
  fetch(`/access/deleteAccess/${fkAcess}`, {
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
        throw "Delete has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
    });
}
