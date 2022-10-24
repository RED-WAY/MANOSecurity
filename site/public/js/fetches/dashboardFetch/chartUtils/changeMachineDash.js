function changeMachineDash(component, fkMachine) {
  const button = document.querySelector(`#${component}`);
  if (!button.classList.contains("sub-activated")) {
    // remove class from other buttons
    Array.from(document.querySelector(".sub-sections").children).map((btn) =>
      btn.classList.remove("sub-activated")
    );
    button.classList.add("sub-activated");

    closeMachineDash();
    if (button.id !== "PROCESSOS") {
      machineCanvas.style.display = "flex";
      machine_processes.style.display = "none";
      getStartupData(component, fkMachine);
    } else {
      machineCanvas.style.display = "none";
      machine_processes.style.display = "flex";
      showKilledProcesses(fkMachine);      
    }
  }
}
