function showMachineRank(order, sortOption) {
  showLoading();

  const fkCompany = sessionStorage.COMPANY_USER;

  fetch(`/dash/showMachineRank/${fkCompany}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        if (result.status == 200) {
          result.json().then((list) => {
            const rank = [];
            let obj = {};
            for (let i = 0; i < list.length; i++) {
              const el = list[i];
              if (
                i > 0 &&
                obj.machineName !== undefined &&
                el.machineName !== obj.machineName &&
                obj.cpuAvg === undefined
              ) {
                rank.push(obj);
                obj = {
                  machineName: el.machineName,
                  classroom: el.data1,
                  processKilled: el.data2,
                };
              } else {
                if (obj.machineName === undefined) {
                  obj = {
                    machineName: el.machineName,
                    classroom: el.data1,
                    processKilled: el.data2,
                  };
                } else {
                  rank.push({
                    ...obj,
                    cpuAvg: el.data1,
                    ramAvg: el.data2,
                  });
                  obj = {};
                }
              }
            }

            rank.sort((a, b) => {
              return order === "asc"
                ? a[sortOption || "processKilled"] -
                    b[sortOption || "processKilled"]
                : b[sortOption || "processKilled"] -
                    a[sortOption || "processKilled"];
            });

            const noData =
              "<span style='color: var(--red-alt) !important'>SEM DADOS NAS ÚLTIMAS 24 HORAS</span>";
            mainDisplay.innerHTML = "";
            for (const el of rank) {
              mainDisplay.innerHTML += `
                <tr class="tables-column-machine-ranking">
                  <td><p>${el.machineName}</p></td>
                  <td><p>${el.classroom}</p></td>
                  <td><p>${el.processKilled}</p></td>
                  <td><p>${el.cpuAvg ? el.cpuAvg + "%" : noData}</p></td>
                  <td><p>${el.ramAvg ? el.ramAvg + "%" : noData}</p></td>
                </tr>
                `;
            }
          });
        } else {
          mainDisplay.innerHTML = "";
          hideLoading();
          showMessage(
            "warning",
            "Nenhuma máquina com histórico foi encontrada!"
          );
        }
      } else {
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregava o ranking das máquinas!"
        );
        throw "There was an error while loading machine ranking";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregava o ranking das máquinas!"
      );
    });
  setTimeout(() => {
    hideLoading();
  }, 2000);
  return false;
}
