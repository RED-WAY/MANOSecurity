function addMachine() {
  const collectionVar = machine_collection_select.value;
  const machineNameVar = machine_name.value;
  const nameUser = sessionStorage.NAME_USER;
  const idUser = sessionStorage.ID_USER;
  const companyVar = sessionStorage.COMPANY_USER;

  if (machineNameVar == "") {
    console.log("machineName is undefined!");
    return false;
  } else if (nameUser == "") {
    console.log("nameUser is undefined!");
    return false;
  } else if (idUser == "") {
    console.log("idUser is undefined!");
    return false;
  } else if (companyVar == "") {
    console.log("companyVar is undefined!");
    return false;
  } else if (collectionVar == "") {
    console.log("collectionVar is undefined!");
    return false;
  } else {
    fetch("/machine/addMachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionServer: collectionVar,
        nameServer: machineNameVar,
        nameUserServer: nameUser,
        idUserServer: idUser,
        companyServer: companyVar,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showDevices();
          setTimeout(() => {
            formView(false);
          }, 500);
        } else {
          throw "There was an error while you´re add a machine!";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}
