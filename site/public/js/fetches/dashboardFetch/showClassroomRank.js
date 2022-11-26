let cr;
function showClassroomRank(order, sortOption) {
  showLoading();

  const fkCompany = sessionStorage.COMPANY_USER;

  fetch(`${baseURL}/dash/showClassroomRank/${fkCompany}`, {
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
                obj.classroom !== undefined &&
                el.classroom !== obj.classroom
              ) {
                obj.processKilled = obj.processKilled || 0;
                obj.cpuAvg = obj.cpuAvg || undefined;
                obj.ramAvg = obj.ramAvg || undefined;
                rank.push(obj);
                obj = {
                  classroom: el.classroom,
                  machines: el.data1,
                };
              } else {
                if (obj.classroom === undefined) {
                  obj = {
                    classroom: el.classroom,
                    machines: el.data1,
                  };
                } else if (el.data2 === "processKilled") {
                  obj.processKilled = el.data1;
                } else {
                  obj.processKilled = obj.processKilled || 0;
                  rank.push({
                    ...obj,
                    cpuAvg: el.data1,
                    ramAvg: Number(el.data2),
                  });
                  obj = {};
                }
              }
            }

            obj.processKilled = obj.processKilled || 0;
            obj.cpuAvg = obj.cpuAvg || undefined;
            obj.ramAvg = obj.ramAvg || undefined;
            obj.classroom && rank.push(obj);

            rank.sort((a, b) => {
              return order === "asc"
                ? a[sortOption || "processKilled"] -
                    b[sortOption || "processKilled"]
                : b[sortOption || "processKilled"] -
                    a[sortOption || "processKilled"];
            });

            const noData =
              "<span style='color: var(--red-alt) !important'>SEM DADOS NAS ÚLTIMAS 24 HORAS</span>";
            tablesBody.innerHTML = "";
            for (const el of rank) {
              tablesBody.innerHTML += `
                <tr class="tables-column-classroom-ranking">
                  <td><p>${el.classroom}</p></td>
                  <td><p>${el.machines}</p></td>
                  <td><p>${el.processKilled}</p></td>
                  <td><p>${el.cpuAvg ? el.cpuAvg + "%" : noData}</p></td>
                  <td><p>${el.ramAvg ? el.ramAvg + "%" : noData}</p></td>
                </tr>
                `;
            }
          });
        } else {
          tablesBody.innerHTML = "";
          hideLoading();
          showMessage("warning", "Nenhuma sala foi encontrada!");
        }
      } else {
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregava o ranking das salas!"
        );
        throw "There was an error while loading classrooms ranking";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregava o ranking das salas!"
      );
    });
  setTimeout(() => {
    hideLoading();
  }, 2000);
  return false;
}
