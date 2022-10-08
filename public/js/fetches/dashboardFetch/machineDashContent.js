function machineDashContent(idMachine) {
  showLoading();
  fetch(`/dash/getMachineConstantHardware/${idMachine}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  })
    .then(function (result) {
      if (result.ok) {
        console.log(result);
        if (result.status !== "204") {
          // result.json().then((json) => {
          const json = [{
            machineName: "m1",
            operationalSystem: "WINDOWS",
            cpuName: "Intel(R) Core(TM) i5-9300H CPU @ 2.40GHz",
            cpuCore: 2,            
            ramUsable: 15.8,
            diskModel: "NVME Maluco doido",
            diskSize: 496.24,
          }]
            constant_title.innerHTML = json[0].machineName;
            operationalSystem.innerHTML = json[0].operationalSystem;
            cpuName.innerHTML = json[0].cpuName;
            cpuCore.innerHTML = json[0].cpuCore;
            ramSize.innerHTML = Math.ceil(json[0].ramUsable).toFixed(1);
            ramUsable.innerHTML = json[0].ramUsable;
            diskModel.innerHTML = json[0].diskModel;
            diskSize.innerHTML = json[0].diskSize;
          // });
        } else {
          console.log("NÃO TEM");
        }
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
  setTimeout(() => {
    hideLoading();
  }, 2000);
  return false;
}
