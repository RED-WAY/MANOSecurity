function chartData(lbl) {
  lbl = lbl.toUpperCase();
  const data = {
    labels: [],
    datasets: [
      {
        label: customProps(lbl, "label"),
        fill: true,
        borderColor: styleVars("redAlt"),
        backgroundColor: styleVars("backColor"),
        tension: 0.3,
        pointRadius: 6,
        fill: true,
        data: [],
      },
    ],
  };
  return data;
}

function chartStyle() {
  let delayed;
  const styleSettings = {
    maintainAspectRatio: false,
    responsive: true,
    animation: {
      onComplete: () => {
        delayed = true;
      },
      delay: (context) => {
        let delay = 0;
        if (context.type === "data" && context.mode === "default" && !delayed) {
          delay = context.dataIndex * 55 + context.datasetIndex * 100;
        }
        return delay;
      },
    },
    // PARTE SUPERIOR
    plugins: {
      // TÍTULO NO GRÁFICO
      title: {
        display: true,
        padding: 0,
        text: "% de Utilização",
        color: styleVars("fontPrimary"),
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
          color: styleVars("fontPrimary"),
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
        backgroundColor: styleVars("tooltip"),
        caretSize: 12,
        caretPadding: 15,
        padding: 20,
        cornerRadius: 5,
        titleAlign: "center",
        titleColor: styleVars("grayLight"),
        titleFont: {
          size: 15,
          family: "Poppins",
        },
        titleMarginBottom: 10,
        bodyAlign: "center",
        bodyColor: styleVars("white"),
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
          color: styleVars("grid"),
        },
        // TITLE DO EIXO X
        title: {
          display: true,
          text: "Horário",
          color: styleVars("fontPrimary"),
          font: {
            size: 20,
            family: "Poppins",
          },
        },
        // ESTILO DAS DIMENSÕES
        ticks: {
          maxRotation: 90,
          minRotation: 60,
          color: styleVars("fontSecondary"),
          font: {
            size: 13,
            family: "Poppins",
          },
        },
      },
      // MÉTRICAS (Y-AXIS)
      y: {
        grid: {
          color: styleVars("grid"),
        },
        // ESTILO DAS DIMENSÕES
        min: 0,
        max: 100,
        ticks: {
          stepSize: 10,
          color: styleVars("fontSecondary"),
          font: {
            size: 15,
            family: "Poppins",
          },
          callback: function (value) {
            return +value + "%";
          },
        },
      },
    },
  };
  return styleSettings;
}
