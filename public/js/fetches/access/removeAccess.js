function deleteAccess(fkAccess) {
  const company = sessionStorage.COMPANY_USER;

  fetch(`/access/deleteAccessCompany/${company}/${fkAccess}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        deleteAccessFamily(fkAccess);
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

function deleteAccessFamily(fkAccess) {
  const company = sessionStorage.COMPANY_USER;

  fetch(`/access/deleteAccessFamily/${company}/${fkAccess}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        showCollections();
        showAccess();
        formView(false);
        verifyGlobalAccessUsing(fkAccess);
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

function verifyGlobalAccessUsing(idAccess) {
  if (idAccess == "") {
    console.log("idAccess is undefined");
  } else {
    fetch(`/access/verifyGlobalAccessUsing/${idAccess}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (result) {        
        if (result.ok) {
          result.json().then((data) => {
            data = JSON.parse(JSON.stringify(data));

            let isUsing = false;
            for (const register of data) {
              if (register.company != null || register.familiesUsing != null) {
                isUsing = true;
              }
            }
            
            if (!isUsing) {
              deleteAccessGlobal(idAccess);
            }
          });
        } else {
          throw "There was an error while getting global access use";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}

function deleteAccessGlobal(idAccess) {
  fetch(`/access/deleteAccessGlobal/${idAccess}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        console.log("ACCESS GLOBALY DELETED");
      } else if (result.status == 404) {
        window.alert("error 404!");
      } else {
        throw "Delete global access has fail, result: " + result.status;
      }
    })
    .catch(function (result) {
      console.log(`#ERRO: ${result}`);
    });
}
