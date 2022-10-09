let timeoutUpdate;

function getStartupData(column, fkMachine) {
  if (timeoutUpdate != undefined) {
    clearTimeout(timeoutUpdate);
  }
  fetch(`/dash/getStartupData/${column}/${fkMachine}`, { cache: "no-store" })
    .then(function (result) {
      if (result.ok) {
        result.json().then(function (result) {
          console.log(`Data received: ${JSON.stringify(result)}`);
          result.reverse();
          plotGraph(result, column, fkMachine);
        });
      } else {
        console.error("No data found at API!");
      }
    })
    .catch(function (error) {
      console.error(`Error at obtaining startup graph data: ${error.message}`);
    });
}

let configChart = {};
let chartMachine;
function plotGraph(initialData, column, fkMachine) {
  console.log("starting chart plotting...");

  const data = {
    labels: [],
    datasets: [
      {
        label: column,
        fill: true,
        borderColor: "#8008FF",
        backgroundColor: "#8008FF20",
        tension: 0.3,
        pointRadius: 5,
        fill: true,
        data: [],
      },
    ],
  };

  for (i = 0; i < initialData.length; i++) {
    data.labels.push("");
    data.datasets[0].data.push(initialData[i][column]);
  }
  console.log(JSON.stringify(data));

  let delayed;
  const styleSettings = {
    maintainAspectRatio: false,
    responsive: true,

    // animation: {
    //   onComplete: () => {
    //     delayed = true;
    //   },
    //   delay: (context) => {
    //     let delay = 0;
    //     if (context.type === "data" && context.mode === "default" && !delayed) {
    //       delay = context.dataIndex * 55 + context.datasetIndex * 100;
    //     }
    //     return delay;
    //   },
    // },
    // PARTE SUPERIOR
    plugins: {
      // TÍTULO NO GRÁFICO
      title: {
        display: true,
        padding: 0,
        text: "TEMPO REAL",
        color: "#5E2D92",
        font: {
          size: 30,
          family: "Poppins",
        },
      },
      // LEGENDA DOS DATASETS
      legend: {
        display: true,
        labels: {
          boxHeight: 3,
          boxWidth: 22,
          color: "#5E2D92",
          font: {
            size: 20,
            family: "Poppins",
          },
        },
      },
      // TOOLTIP
      tooltip: {
        enabled: true,
        displayColors: false,
        backgroundColor: "rgba(67, 27, 109, 0.9)",
        caretSize: 12,
        caretPadding: 15,
        padding: 20,
        cornerRadius: 20,
        titleAlign: "center",
        titleColor: "#e2c6ff",
        titleFont: {
          size: 15,
          family: "Quicksand_Book",
          style: "italic",
        },
        titleMarginBottom: 10,
        bodyAlign: "center",
        bodyColor: "white",
        bodyFont: {
          size: 15,
          family: "Poppins",
        },
      },
    },
    // LEGENDAS
    scales: {
      // DIMENSÕES (X-AXIS)
      x: {
        grid: {
          color: "#ac79e2",
        },
        // TITLE DO EIXO X
        title: {
          display: true,
          text: "Horário",
          color: "#1e0935",
          font: {
            size: 20,
            family: "Poppins",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          maxRotation: 90,
          minRotation: 60,
          color: "#1e0935",
          font: {
            size: 13,
            family: "Poppins",
          },
        },
      },
      // MÉTRICAS (Y-AXIS)
      y: {
        grid: {
          color: "#ac79e2",
        },
        // TITLE DO EIXO Y
        // title: {
        //   display: true,
        //   text: "Porcentagem",
        //   color: "#1e0935",
        //   font: {
        //     size: 20,
        //     family: "Poppins",
        //     style: "italic",
        //   },
        // },
        // ESTILO DAS DIMENSÕES
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          color: "#1e0935",
          font: {
            size: 15,
            family: "Poppins",
            style: "italic",
          },
          callback: function (value) {
            return +value + "%";
          },
        },
      },
    },
  };
  configChart = {
    type: "line",
    data: data,
    options: styleSettings,
  };

  chartMachine = new Chart(
    document.getElementById("machineCanvas"),
    configChart
  );

  setTimeout(() => updateChart(column, fkMachine, data), 2000);
}
let test = null;
function updateChart(column, fkMachine, data) {
  fetch(`/dash/getCurrentData/${column}/${fkMachine}`, { cache: "no-store" })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (newData) {
          console.log(`Dados recebidos: ${JSON.stringify(newData)}`);
          console.log(`Dados atuais do gráfico: ${data}`);

          // tirando e colocando valores no gráfico
          data.labels.shift(); // apagar o primeiro
          data.labels.push(""); // incluir um novo momento

          data.datasets[0].data.shift(); // apagar o primeiro de umidade
          data.datasets[0].data.push(newData[0][column]); // incluir uma nova medida de umidade

          chartMachine.update();

          // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
          timeoutUpdate = setTimeout(
            () => updateChart(column, fkMachine, data),
            5000
          );
        });
      } else {
        console.error("No data was found at the API!");
        // Altere aqui o valor em ms se quiser que o gráfico atualize mais rápido ou mais devagar
        timeoutUpdate = setTimeout(
          () => updateChart(column, fkMachine, data),
          5000
        );
      }
    })
    .catch(function (error) {
      console.error(`Error at obtaining new graph data: ${error.message}`);
    });
}
