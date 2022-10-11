function closeMachineDash() {
  clearTimeout(timeoutPlot);
  clearTimeout(timeoutUpdate);
  chartMachine.destroy();
}
