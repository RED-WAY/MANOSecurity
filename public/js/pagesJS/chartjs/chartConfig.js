function UMI_line_graph() {
  var ctx = document.getElementById("UMI_ChartLINE").getContext("2d");

  const hour = [
    "00h",
    "01h",
    "02h",
    "03h",
    "04h",
    "05h",
    "06h",
    "07h",
    "08h",
    "09h",
    "10h",
    "11h",
    "12h",
    "13h",
    "14h",
    "15h",
    "16h",
    "17h",
    "18h",
    "19h",
    "20h",
    "21h",
    "22h",
    "23h",
  ];

  var dataPoints = [
    40, 46, 35, 48, 54, 62, 49, 38, 43, 39, 34, 29, 35, 31, 24, 15, 17, 20, 24,
    33, 33, 39, 45, 50,
  ];

  gradient = ctx.createLinearGradient(0, 0, 0, 450);
  gradient.addColorStop(0, "rgba(157, 66, 255, 1)");
  gradient.addColorStop(1, "rgba(157, 66, 255, 0.0)");

  const dataLINE = {
    labels: hour,
    datasets: [
      {
        // LIMITE MÁXIMO
        data: [
          60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60, 60,
          60, 60, 60, 60, 60, 60, 60,
        ],
        label: "PERIGO",
        backgroundColor: "rgb(230, 0, 0)",
        borderColor: "rgb(230, 0, 0)",
        pointRadius: 0,
        pointHitRadius: 0,
      },
      {
        // MEDIDAS DO SENSOR
        data: dataPoints,
        label: "DHT11",
        fill: true,
        backgroundColor: gradient,
        tension: 0.5,
        pointRadius: 5,
        borderColor: "#8008FF",
        pointBackgroundColor: "#8008FF",
      },
    ],
  };

  let delayed;
  const settingsLINE = {
    maintainAspectRatio: false,
    responsive: true,

    // // ANIMAÇÃO (RETIRAR)
    // animation: {
    //     onComplete: () => {
    //         delayed = true;
    //     },
    //     delay: (context) => {
    //         let delay = 0;
    //         if (context.type === "data" && context.mode === "default" && !delayed) {
    //             delay = context.dataIndex * 20 + context.datasetIndex * 100;
    //         }
    //         return delay;
    //     },
    // },
    // PARTE SUPERIOR
    plugins: {
      // SUBTÍTULO NO GRÁFICO
      subtitle: {
        display: true,
        padding: 10,
        text: "| HOJE |",
        color: "#5E2D92",
        font: {
          size: 15,
          family: "Quicksand_Bold",
        },
      },
      // LEGENDA DOS DATASETS
      legend: {
        display: true,
        labels: {
          boxHeight: 1,
          boxWidth: 22,
          color: "#5E2D92",
          font: {
            size: 15,
            family: "Quicksand_Bold",
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
          family: "Quicksand_Bold",
        },
      },
    },
    // LEGENDAS
    scales: {
      // DIMENSÕES (X-AXIS)
      x: {
        // LINHAS VERTICAIS
        grid: {
          color: "#CEA0FF",
        },
        // TITLE DO EIXO X
        title: {
          display: true,
          text: "Horário",
          color: "#1e0935",
          font: {
            size: 20,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          maxRotation: 90,
          minRotation: 40,
          color: "#1e0935",
          font: {
            size: 15,
            family: "Quicksand_Bold",
          },
        },
      },
      // MÉTRICAS (Y-AXIS)
      y: {
        // LINHAS HORIZONTAIS
        grid: {
          color: "#CEA0FF",
        },
        // TITLE DO EIXO Y
        title: {
          display: true,
          text: "Umidade",
          color: "#1e0935",
          font: {
            size: 20,
            family: "Quicksand_Bold",
            style: "italic",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          color: "#1e0935",
          font: {
            size: 15,
            family: "Quicksand_Bold",
            style: "italic",
          },
          callback: function (value) {
            return +value + "%";
          },
        },
      },
    },
  };

  configLINE = {
    type: "line",
    data: dataLINE,
    options: settingsLINE,
  };

  var ChartLINE = new Chart(
    document.getElementById("UMI_ChartLINE"),
    configLINE
  );
}
