function addMachine() {
  showLoading();

  // const token = machine_token.value;
  const collectionVar = machine_collection.value;
  const nameVar = machine_name.value;
  const nameUser = sessionStorage.NAME_USER;
  const idUser = sessionStorage.ID_USER;
  const companyVar = sessionStorage.COMPANY_USER;

  if (nameVar == "" || collectionVar == "") {
    console.log("deu ruim no addMachine");
    return false;
  } else {
    console.log(collectionVar);
    console.log(nameVar);
    console.log(nameUser);
    console.log(idUser);

    fetch("/machine/addMachine", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        collectionServer: collectionVar,
        nameServer: nameVar,
        nameUserServer: nameUser,
        idUserServer: idUser,
        companyServer: companyVar,
      }),
    })
      .then(function (result) {
        console.log("resposta: ", result);

        if (result.ok) {
          console.log("maquina adicionada com sucesso!");
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            formView(false);
            showDevices();
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
