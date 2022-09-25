function addAccess() {
  const typeVar = access_type_select.value;
  const nameVar = access_name.value;
  const processVar = access_path.value;

  if (typeVar == "") {
    console.log("typeVar is undefined");
  } else if (nameVar == "") {
    console.log("nameVar is undefined");
  } else if (processVar == "") {
    console.log("processVar is undefined");
  } else {
    fetch(`/acess/checkAccessGlobaly/${typeVar}/${nameVar}/${processVar}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (result) {
        if (result.ok) {
          result.json().then((data) => {
            if (data.length == 0) {
              addAccessGlobal(typeVar, nameVar, processVar);
            } else {
              addAccessCompany(data[0].idOperation);
            }
          });
        } else {
          throw "There was an error while getting the specific process";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}

function addAccessGlobal(typeVar, nameVar, processVar) {
  fetch("/acess/addAccessGlobal", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      typeServer: typeVar,
      nameServer: nameVar,
      processServer: processVar,
    }),
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((res) => {
          setTimeout(() => {
            addAccessCompany(res.insertId);
          }, 500);
        });
      } 
      else {
        throw "There was an error while adding operation global!";
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
}

function addAccessCompany(operationId) {
  const operationIdVar = operationId;
  const companyVar = sessionStorage.COMPANY_USER;

  console.log(`
  ${operationIdVar}\n
  ${companyVar}
  `);

  if (operationIdVar == undefined) {
    console.log("operationIdVar is undefined");
  } else if (companyVar == undefined) {
    console.log("companyVar is undefined");
  } else {
    fetch("/acess/addAccessCompany", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        operationIdServer: operationIdVar,
        companyServer: companyVar,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showAcess();
          formView(false);
        } else {
          throw "There was an error while adding company operation!";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}
