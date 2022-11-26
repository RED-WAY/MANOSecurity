function showKilledProcesses(idMachine) {
  showLoading();

  const fkCompany = sessionStorage.COMPANY_USER;

  fetch(`${baseURL}/dash/showKilledProcesses/${fkCompany}/${idMachine}`, {
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
              tablesBody.innerHTML = "";
              for (let i = 0; i < processes.length; i++) {
                tablesBody.innerHTML += `
                <tr onclick="formView(true, '${processes[i].machineName}', 'machineDash', 'show', '${processes[i].fkMachine}')" class="tables-column-killed-processes">
                  <td><p>${processes[i].operationName}</p></td>
                  <td><p>${processes[i].machineName}</p></td>
                  <td><p>${processes[i].dtAdded}</p></td>
                  <td><p>${processes[i].classroom}</p></td>
                  <td><p></p></td>
                </tr> 
                `;
              }
            } else {
              machineProcessesDisplay.innerHTML = "";
              for (let i = 0; i < processes.length; i++) {
                machineProcessesDisplay.innerHTML += `
                <tr class="tables-column-killed-processes-machine">
                  <td><p>${processes[i].operationName}</p></td>
                  <td><p>${processes[i].machineName}</p></td>
                  <td><p>${processes[i].dtAdded}</p></td>
                  <td><p></p></td>
                </tr> 
                `;
              }
            }

            typeof idMachine === "string" && paintRowsOnClick();
          });
        } else {
          tablesBody.innerHTML = "";
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
        "Aconteceu algum erro enquanto carregavam os processos!"
      );
    });
  setTimeout(() => {
    hideLoading();
  }, 2000);
  return false;
}
