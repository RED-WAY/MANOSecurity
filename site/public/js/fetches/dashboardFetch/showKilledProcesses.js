function showKilledProcesses(idMachine) {
  showLoading();

  const fkCompany = sessionStorage.COMPANY_USER;

  fetch(`/dash/showKilledProcesses/${fkCompany}/${idMachine}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        if (result.status == 200) {
          result.json().then((processes) => {
            if (typeof idMachine === "string") {
              processesDisplay.innerHTML = "";
              for (let i = 0; i < processes.length; i++) {
                processesDisplay.innerHTML += `
                <tr onclick="formView(true, '${processes[i].machineName}', 'machineDash', 'show', '${processes[i].fkMachine}'), 
                setTimeout(changeMachineDash('PROCESSOS', ${processes[i].fkMachine}), 4000)">
                  <td>${processes[i].operationName}</td>
                  <td>${processes[i].machineName}</td>
                  <td>${processes[i].dtAdded}</td>
                </tr> 
                `;
              }
            } else {
              machineProcessesDisplay.innerHTML = "";
              for (let i = 0; i < processes.length; i++) {
                machineProcessesDisplay.innerHTML += `
                <tr>
                  <td>${processes[i].operationName}</td>
                  <td>${processes[i].machineName}</td>
                  <td>${processes[i].dtAdded}</td>
                </tr> 
                `;
              }
            }

            typeof idMachine === "string" && paintRowsOnClick();
          });
        } else {
          processesDisplay.innerHTML = "";
          hideLoading();
          showMessage("warning", "Nenhum processo morto foi encontrado!");
        }
      } else {
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregavam os processos!"
        );
        throw "There was an error while loading machine killed processes";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregavam os usuários!"
      );
    });
  setTimeout(() => {
    hideLoading();
  }, 2000);
  return false;
}
