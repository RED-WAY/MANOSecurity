const PLOT_DELAY = 2000;
let timeoutUpdate;
let timeoutPlot;

let savedStartup = [];
function getStartupData(column, fkMachine) {
  showLoading();
  savedStartup = [column, fkMachine];
  if (timeoutUpdate != undefined) {
    clearTimeout(timeoutUpdate);
  }
  fetch(`/dash/getStartupData/${column}/${fkMachine}/${selectQttData()}`, {
    cache: "no-store",
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then(function (result) {
          result.reverse();
          plotGraph(result, column, fkMachine);
        });
      } else {
        hideLoading();
        console.error("No data found at API!");
      }
    })
    .catch(function (error) {
      hideLoading();
      console.error(`Error at obtaining startup graph data: ${error.message}`);
    });
}

let configChart = {};
let chartMachine = null;
function plotGraph(startupData, column, fkMachine) {
  const data = chartData(column);
  for (i = 0; i < startupData.length; i++) {
    data.labels.push(startupData[i].dtAdded);
    data.datasets[0].data.push(startupData[i][column]);
  }
  configChart = {
    type: "line",
    data: data,
    options: chartStyle(),
  };
  chartMachine = new Chart(
    document.getElementById("machineCanvas"),
    configChart
  );
  setTimeout(() => {
    hideLoading();
  }, 500);
  timeoutPlot = setTimeout(
    () => updateChart(column, fkMachine, data),
    PLOT_DELAY
  );
}

function updateChart(column, fkMachine, data) {
  fetch(`/dash/getCurrentData/${column}/${fkMachine}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (newData) {
          data.labels.shift();
          data.labels.push(newData[0].dtAdded);
          data.datasets[0].data.shift();
          data.datasets[0].data.push(newData[0][column]);

          timeoutUpdate = setTimeout(() => {
            chartMachine.update();
            updateChart(column, fkMachine, data);
          }, PLOT_DELAY);
        });
      } else {
        console.error("No data was found at the API!");
        timeoutUpdate = setTimeout(
          () => updateChart(column, fkMachine, data),
          PLOT_DELAY
        );
      }
    })
    .catch(function (error) {
      console.error(`Error at obtaining new graph data: ${error.message}`);
    });
}

let isResizing = false;
window.addEventListener("resize", () => {
  if (chartMachine) {
    // verify if chart exists and if is current resizing
    if (chartMachine?.canvas != null && !isResizing) {
      chartMachine.destroy();
      // wait to adapt to user quickly
      setTimeout(() => {
        isResizing = true;
        getStartupData(...savedStartup, selectQttData());
        setTimeout(() => {
          isResizing = false;
        }, 1000);
      }, 500);
    }
  }
});

function selectQttData() {
  const width = window.screen.width;
  let qttData;
  if (width < 300) {
    qttData = 4;
  } else if (width < 400) {
    qttData = 5;
  } else if (width < 800) {
    qttData = 8;
  } else if (width < 1440) {
    qttData = 10;
  } else if (width < 2000) {
    qttData = 16;
  } else {
    qttData = 20;
  }
  return qttData;
}
