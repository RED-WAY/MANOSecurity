const data = [];
function getMachinesData() {
  const fkCompanyVar = sessionStorage.COMPANY_USER;

  fetch(`${baseURL}/machine/getMachinesData/${fkCompanyVar}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((json) => {
          for (let i = 0; i < json.length; i++) {
            const reg = json[i];
            if (i === 0) {
              data.push(reg);
              continue;
            }
            if (reg.fkMachine !== json[i - 1].fkMachine) {
              data.push(reg);
            }
          }

          for (let i = 0; i < data.length; i++) {
            const reg = data[i];

            for (const card of dispositivos_content.children) {
              if (Number(card.id.replace("machine", "")) === reg.fkMachine) {
                const divMiniHard = card.children[0].children;
                divMiniHard[0].classList.remove("mini-hard-disabled");
                divMiniHard[1].classList.remove("mini-hard-disabled");

                let strCpu;
                switch (true) {
                  case reg.cpu <= 50:
                    strCpu = "success";
                    break;
                  case reg.cpu < 90:
                    strCpu = "warning";
                    break;
                  default:
                    strCpu = "danger";
                    break;
                }
                divMiniHard[0].classList.add("mini-hard-" + strCpu);

                let strRam;
                switch (true) {
                  case reg.ram <= 70:
                    strRam = "success";
                    break;
                  case reg.ram < 90:
                    strRam = "warning";
                    break;
                  default:
                    strRam = "danger";
                    break;
                }
                divMiniHard[1].classList.add("mini-hard-" + strRam);
                break;
              }
            }
          }

          // check if it's on machine section to keep pull
          setTimeout(() => {
            if (dispositivos.style.display == "grid") {
              getMachinesData(fkCompanyVar);
            }
          }, 10000);
        });
      } else {
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregavam os mini-dados das máquinas!"
        );
        throw "There was an error while getting the machines mini-data";
      }
    })
    .catch((error) => {
      console.log(error);
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregavam os mini-dados das máquinas!"
      );
    });
  return false;
}
