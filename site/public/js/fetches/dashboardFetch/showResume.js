function showResume() {
  showLoading();
  document.querySelector(
    ".resume-header h1"
  ).innerHTML = `Resumo (${new Date().toLocaleDateString("pt-BR")})`;
  fetchMachines();
}

function fetchMachines() {
  fetch(`/dash/showMachineRank/${sessionStorage.COMPANY_USER}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resultMachine) {
      if (resultMachine.ok) {
        if (resultMachine.status == 200) {
          resultMachine.json().then((listMachine) => {
            const machine = getAverage(sorts(fillMachineArray(listMachine)));
            plotData(machine);
            fetchClassroom();
          });
        } else {
          showMessage(
            "warning",
            "Nenhum dado das máquinas foi encontrado para um resumo!"
          );
        }
      } else {
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregava o resumo das máquinas!"
        );
        throw "There was an error while loading machine resume";
      }
    })
    .catch((error) => {
      console.log(error);
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregava o resumo das máquinas!"
      );
    })
    .finally(() => {
      hideLoading();
    });
}

function fetchClassroom() {
  fetch(`/dash/showClassroomRank/${sessionStorage.COMPANY_USER}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then(function (resultClassroom) {
    if (resultClassroom.ok) {
      if (resultClassroom.status == 200) {
        resultClassroom.json().then((listClassroom) => {
          const classroom = getAverage(
            sorts(fillClassroomArray(listClassroom))
          );
          plotData(classroom);
        });
      }
    } else {
      throw "There was an error while loading classrooms resume";
    }
  });
}

const fillClassroomArray = (list) => {
  const mountedRank = [];
  let obj = {};
  for (let i = 0; i < list.length; i++) {
    const el = list[i];

    if (
      i > 0 &&
      obj.classroom !== undefined &&
      el.classroom !== obj.classroom
    ) {
      obj.processKilled = obj.processKilled || 0;
      obj.cpuAvg = obj.cpuAvg || 0;
      obj.ramAvg = obj.ramAvg || 0;
      mountedRank.push(obj);
      obj = {
        classroom: el.classroom,
        machines: el.data1,
      };
    } else {
      if (obj.classroom === undefined) {
        obj = {
          classroom: el.classroom,
          machines: el.data1,
        };
      } else if (el.data2 === "processKilled") {
        obj.processKilled = el.data1;
      } else {
        obj.processKilled = obj.processKilled || 0;
        mountedRank.push({
          ...obj,
          cpuAvg: el.data1,
          ramAvg: Number(el.data2),
        });
        obj = {};
      }
    }
  }

  obj.processKilled = obj.processKilled || 0;
  obj.cpuAvg = obj.cpuAvg || 0;
  obj.ramAvg = obj.ramAvg || 0;
  obj.classroom && mountedRank.push(obj);

  return mountedRank;
};

const fillMachineArray = (list) => {
  const mountedRank = [];
  let obj = {};
  for (let i = 0; i < list.length; i++) {
    const el = list[i];
    if (i > 0 && obj.machine !== undefined && el.machineName !== obj.machine) {
      obj.processKilled = obj.processKilled || 0;
      obj.cpuAvg = obj.cpuAvg || 0;
      obj.ramAvg = obj.ramAvg || 0;
      mountedRank.push(obj);
      obj = {
        machine: el.machineName,
        classroom: el.data1,
      };
    } else {
      if (obj.machine === undefined) {
        obj = {
          machine: el.machineName,
          classroom: el.data1,
        };
      } else if (el.data2 === "processKilled") {
        obj.processKilled = el.data1;
      } else {
        obj.processKilled = obj.processKilled || 0;
        mountedRank.push({
          ...obj,
          cpuAvg: el.data1,
          ramAvg: Number(el.data2),
        });
        obj = {};
      }
    }
  }

  obj.processKilled = obj.processKilled || 0;
  obj.cpuAvg = obj.cpuAvg || 0;
  obj.ramAvg = obj.ramAvg || 0;
  obj.machine && mountedRank.push(obj);

  return mountedRank;
};

const sorts = (array) => {
  const removeDuplicate = (array) => {
    const getId = (obj) => Object.keys(obj)[0];
    return array.filter(
      (v, i, a) => a.findIndex((v2) => v2[getId(v2)] === v[getId(v)]) === i
    );
  };

  return {
    objs: removeDuplicate([
      [...array].sort((a, b) => b["processKilled"] - a["processKilled"]).at(0),
      [...array].sort((a, b) => b["cpuAvg"] - a["cpuAvg"]).at(0),
      [...array].sort((a, b) => b["ramAvg"] - a["ramAvg"]).at(0),
    ]),
    processKilled: array.reduce((acc, obj) => {
      return acc + obj.processKilled;
    }, 0),
  };
};

const getProcessKilledPercent = (processKilled) => {
  const processKilledWeight = 0.7;
  return Math.round(
    (Math.round((processKilled * 100) / totalProcessKilled) / 100) *
      processKilledWeight *
      10
  );
};

const getAvgPercent = (avg, weight) => {
  return Number((((avg * (weight * 100)) / 100 / 100) * 10).toFixed(2));
};

const addTotal = (array) => {
  const cpuAvgWeight = 0.2;
  const ramAvgWeight = 0.1;

  for (const obj of array) {
    const total = Number(
      (
        getProcessKilledPercent(obj.processKilled) +
        (obj.cpuAvg ? getAvgPercent(obj.cpuAvg, cpuAvgWeight) : 0) +
        (obj.ramAvg ? getAvgPercent(obj.ramAvg, ramAvgWeight) : 0)
      ).toFixed(2)
    );
    obj.total = total;
  }

  return array;
};

const getTop = (array) => {
  return addTotal(array).sort((a, b) => {
    return b.total - a.total;
  });
};

const getAverage = ({ objs, processKilled }) => {
  totalProcessKilled = processKilled;

  return getTop(objs);
};

const plotData = (objs) => {
  const type = Object.keys(objs.at(0))[0];
  const value = Object.values(objs.at(0));
  const processKilled =
    type === "classroom"
      ? totalProcessKilled
      : objs.reduce(
          (acc, obj) =>
            (acc +=
              obj.classroom === objs[0].classroom ? obj.processKilled : 0),
          0
        );

  [
    "resume",
    "sub_resume",
    "processKilled_resume",
    "cpuAvg_resume",
    "ramAvg_resume",
    "total_resume",
  ].map((htmlId, i) => {
    document.querySelector(`#${type}_${htmlId}`).innerHTML =
      value[i] + (i === 2 ? `/${processKilled}` : "");
  });

  Object.keys(objs[0])[0] === "machine" && plotStatus(objs);
};

let totalProcessKilled = 0;
function plotStatus(array) {
  const getZoneData = (type, from, to, level) => {
    const dangerZone = () => {
      return array.filter(
        (el) => el[`${type}Avg`] > from && el[`${type}Avg`] < to
      );
    };

    return {
      type: type.toUpperCase(),
      array: dangerZone(type.toLowerCase(), from, to),
      size: function () {
        return this.array.length;
      },
      percent: function () {
        return (this.size() * 100) / totalMachines;
      },
      plotCard: function (display) {
        display.innerHTML += `
        <div class="resume-machine-card">
          <h3>${level} de ${this.type}</h3>
          <h1>${this.size()}</h1>
          <div>
            <h4>0%</h4>
            <div class="resume-progress">
              <div style="width: ${Math.round(
                this.percent()
              )}% !important"></div>
            </div>
            <h4>100%</h4>
          </div>
        </div>
        `;
      },
    };
  };

  const totalMachines = array.length;
  const status = {
    totalProcessKilled,
    totalMachines,
    zones: {
      warningCpuMachines: {
        ...getZoneData("cpu", 50, 90, "Alerta"),
      },
      dangerCpuMachines: {
        ...getZoneData("cpu", 89, 101, "Perigo"),
      },
      warningRamMachines: {
        ...getZoneData("ram", 70, 90, "Alerta"),
      },
      dangerRamMachines: {
        ...getZoneData("ram", 89, 101, "Perigo"),
      },
    },
    getMacroSituation: function () {
      return Object.keys(this.zones).reduce(
        (acc, zone) => (acc += Math.round(this.zones[zone].percent())),
        0
      );
    },
    plotMachineCards: function () {
      const display = document.querySelector("#status_resume_cards");
      display.innerHTML = "";
      Object.keys(this.zones).map((zone) => {
        this.zones[zone].plotCard(display);
      });
    },
    plotCards: function () {
      document.querySelector("#resume-general-machines").innerHTML =
        totalMachines;

      document.querySelector("#resume-general-processKilled").innerHTML =
        totalProcessKilled;

      const statusText = document.querySelector("#resume-general-status");
      const value = this.getMacroSituation();
      if (value > 60) {
        statusText.innerHTML = "PERIGO";
      } else if (value > 40) {
        statusText.innerHTML = "ALERTA";
      } else {
        statusText.innerHTML = "OK";
      }

      this.plotMachineCards();
    },
  };

  status.plotCards();
  test = status;
}
