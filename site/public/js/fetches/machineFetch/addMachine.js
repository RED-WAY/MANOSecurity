function addMachine() {
  showLoading();

  const machineNameVar = machine_name.value.trimStart().trimEnd();
  const machineClassroomVar = Number(
    machine_classroom.value.trimStart().trimEnd()
  );
  const fkConsumerVar = sessionStorage.ID_USER;
  const fkCompanyVar = sessionStorage.COMPANY_USER;
  const fkFamilyVar = machine_family_select.value;

  if (machineNameVar == "") {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Nome da máquina não foi definido!");
    return false;
  } else if (machineClassroomVar == "" || isNaN(machineClassroomVar)) {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Sala do dispositivo não digitada!");
    return false;
  } else if (fkConsumerVar == "" || fkConsumerVar == undefined) {
    hideLoading();
    hideConfirm();
    showMessage(
      "warning",
      "Usuário não identificado! Encerre a sessão e tente novamente"
    );
    return false;
  } else if (fkCompanyVar == "" || fkCompanyVar == undefined) {
    hideLoading();
    hideConfirm();
    showMessage(
      "warning",
      "Empresa do usuário não foi encontrada! Encerre a sessão e tente novamente"
    );
    return false;
  } else if (fkFamilyVar == "" || fkFamilyVar == undefined) {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Coleção não existe!");
    return false;
  } else {
    fetch(`${baseURL}/machine/addMachine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        machineNameServer: machineNameVar,
        machineClassroomServer: machineClassroomVar,
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
            showMessage("success", "Máquina adicionada com sucesso!");
          }, 200);
        } else {
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            showMessage(
              "error",
              "Aconteceu algum erro enquanto adicionava uma máquina!"
            );
          }, 1000);
          throw "There was an error while you´re add a machine!";
        }
      })
      .catch((error) => {
        console.log(error);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto adicionava uma máquina!"
          );
        }, 3000);
      });

    return false;
  }
}
