function editMachine(idMachine) {
  showLoading();

  const machineNameVar = machine_name.value.trimStart().trimEnd();
  const machineClassroomVar = Number(
    machine_classroom.value.trimStart().trimEnd()
  );
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
  } else if (fkFamilyVar == "" || fkFamilyVar == undefined) {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Coleção não existe!");
    return false;
  } else {
    fetch(`${baseURL}/machine/editMachine/${idMachine}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        machineNameServer: machineNameVar,
        machineClassroomServer: machineClassroomVar,
        fkFamilyServer: fkFamilyVar,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showMachines();
          hideConfirm();
          setTimeout(() => {
            formView(false);
            hideLoading();
            showMessage("success", "Máquina editada com sucesso!");
          }, 200);
        } else if (result.status == 404) {
          window.alert("error 404!");
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            showMessage(
              "error",
              "Aconteceu algum erro enquanto editava uma máquina!"
            );
          }, 800);
        } else {
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            showMessage(
              "error",
              "Aconteceu algum erro enquanto editava uma máquina!"
            );
          }, 1000);
          throw "Delete has fail, result: " + result.status;
        }
      })
      .catch(function (result) {
        console.log(`#ERRO: ${result}`);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto editava uma máquina!"
          );
        }, 3000);
      });
  }
}
