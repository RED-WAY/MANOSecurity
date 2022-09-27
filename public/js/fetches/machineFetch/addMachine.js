function addMachine() {
  showLoading();

  const machineNameVar = machine_name.value;
  const fkConsumerVar = sessionStorage.ID_USER;
  const fkCompanyVar = sessionStorage.COMPANY_USER;
  const fkFamilyVar = machine_collection_select.value;

  if (machineNameVar == "") {
    console.log("machineName is undefined!");
    return false;
  } else if (fkConsumerVar == "") {
    console.log("fkConsumerVar is undefined!");
    return false;
  } else if (fkCompanyVar == "") {
    console.log("fkCompanyVar is undefined!");
    return false;
  } else if (fkFamilyVar == "") {
    console.log("fkFamilyVar is undefined!");
    return false;
  } else {
    fetch("/machine/addMachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        machineNameServer: machineNameVar,
        fkConsumerServer: fkConsumerVar,
        fkCompanyServer: fkCompanyVar,
        fkFamilyServer: fkFamilyVar,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showMachines();
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            formView(false);
          }, 200);
        } else {
          hideConfirm();
          setTimeout(() => {
            hideLoading();
          }, 1000);
          throw "There was an error while you´re add a machine!";
        }
      })
      .catch((error) => {
        console.log(error);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 3000);
      });

    return false;
  }
}
