function machineDashContent(idMachine) {
  showLoading();
  fetch(`/dash/getMachineConstantHardware/${idMachine}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((json) => {
          if (!Object.values(json[0]).includes(null)) {
            // const json = [
            //   {
            //     machineName: "m1",
            //     operationalSystem: "WINDOWS",
            //     cpuName: "Intel(R) Core(TM) i5-9300H CPU @ 2.40GHz",
            //     cpuCore: 2,
            //     ramUsable: 15.8,
            //     diskModel: "M.2 NVMe Heatsink",
            //     diskSize: 496.24
            //   },
            // ];
            constant_title.innerHTML = json[0].machineName;
            operationalSystem.innerHTML = json[0].operationalSystem;
            cpuName.innerHTML = json[0].cpuName;
            cpuCore.innerHTML = json[0].cpuCore;
            ramSize.innerHTML = Math.ceil(json[0].ramUsable).toFixed(1) + " GB";
            ramUsable.innerHTML = json[0].ramUsable + " GB";
            diskModel.innerHTML = json[0].diskModel;
            diskSize.innerHTML = json[0].diskSize + " GB";
          } else {
            formView(false);
            showMessage(
              "warning",
              "Essa instância não está conectada à uma máquina física!"
            );
          }
        });
      } else {
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregavam os dados da máquina!"
        );
        throw "There was an error while getting the machine constant hardware info";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregavam os dados da máquina!"
      );
    });
  // setTimeout(() => {
  hideLoading();
  // }, 2000);
  return false;
}
