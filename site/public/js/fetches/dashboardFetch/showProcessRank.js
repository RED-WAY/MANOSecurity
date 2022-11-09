function showProcessRank(order, sortOption) {
  showLoading();

  const fkCompany = sessionStorage.COMPANY_USER;

  fetch(`/dash/showProcessRank/${fkCompany}`, {
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

              if ((i + 1) % 3 === 0) {
                rank.push({
                  ...obj,
                  machine: el.data,
                });
                obj = {};
              } else {
                if (obj.process === undefined) {
                  obj = {
                    process: el.operationName,
                    classroom: el.data,
                  };
                } else {
                  obj.detections = el.data;
                }
              }
            }

            rank.sort((a, b) => {
              return order === "asc"
                ? a[sortOption || "detections"] -
                    b[sortOption || "detections"]
                : b[sortOption || "detections"] -
                    a[sortOption || "detections"];
            });

            mainDisplay.innerHTML = "";
            for (const el of rank) {
              mainDisplay.innerHTML += `
                <tr class="tables-column-process-ranking">
                  <td><p>${el.process}</p></td>
                  <td><p>${el.detections}</p></td>
                  <td><p>${el.classroom}</p></td>
                  <td><p>${el.machine}</p></td>
                </tr>
                `;
            }
          });
        } else {
          mainDisplay.innerHTML = "";
          hideLoading();
          showMessage("warning", "Nenhum processo foi encontrada!");
        }
      } else {
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregava o ranking dos processos!"
        );
        throw "There was an error while loading processes ranking";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregava o ranking dos processos!"
      );
    });
  setTimeout(() => {
    hideLoading();
  }, 2000);
  return false;
}
