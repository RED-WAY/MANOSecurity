function changeMachineDash(component, fkMachine) {
  const button = document.querySelector(`#${component}`);
  if (!button.classList.contains("sub-activated")) {
    // remove class from other buttons
    Array.from(document.querySelector(".sub-sections").children).map((btn) =>
      btn.classList.remove("sub-activated")
    );
    button.classList.add("sub-activated");

    closeMachineDash();
    getStartupData(component, fkMachine);
  }
}
