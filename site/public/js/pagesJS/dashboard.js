// CHANGE SECTIONS VISIBILITY
let actualSection = "#resume";
function showSection(sectionClass) {
  if (sessionStorage.OFFICE_USER !== "MASTER" && sectionClass === "#usuarios") {
    throw "Not allowed to access this section!";
  }

  const section = document.querySelector(sectionClass);
  const sectionNow = document.querySelector(actualSection);

  // CHANGE OPACITY FIRST
  // CHANGE DISPLAY LATER
  if (section != sectionNow) {
    sectionNow.style.opacity = "0";
    setTimeout(() => {
      sectionNow.style.display = "none";
      section.style.display = "grid";
      setTimeout(() => {
        section.style.opacity = "1";
      }, 200);
    }, 200);
    actualSection = `#${section.id}`;
  }
  hideMenu();
}

// CHANGE FORM VISIBILITY
function formView(isOpening, formTitle, formParam, mode, editId) {
  const hiddenDiv = document.querySelector("#aside_forms");
  const formOrDash = document.querySelector(
    `#${mode === "show" ? "dash_card" : "form_card"}`
  );

  // display with fade
  if (isOpening) {
    formOrDash.style.display = "flex";

    // changing form title
    const title = document.querySelector("#form_title");
    title.textContent = formTitle;

    // change inputs
    verifyInputs(formParam, mode, editId, formTitle);
    hiddenDiv.style.display = "flex";
    setTimeout(() => {
      hiddenDiv.style.opacity = "1";
    }, 0);
  } else {
    hiddenDiv.style.opacity = "0";
    setTimeout(() => {
      hiddenDiv.style.display = "none";
      formOrDash.style.display = "none";
      document.querySelector("#dash_card").style.display = "none";
    }, 500);
  }
}

// ADAPT INPUTS ACCORDINGLY WITH SECTION
function verifyInputs(formParam, mode, editId, confirmTitle) {
  // formParam: machine, family, access
  const form = document.querySelector("#form_inputs");
  const button = document.querySelector("#button_form");

  // display or not inputs
  for (const child of form.children) {
    if (child.className.indexOf(formParam) != -1) {
      child.style.display = "flex";
    } else {
      child.style.display = "none";
    }
  }

  if (mode != "show") {
    // if editing, just show editable inputs
    if (mode == "edit") {
      for (const child of form.children) {
        if (child.className.indexOf(mode) == -1) {
          child.style.display = "none";
        }
      }
    }

    // add correct function to add
    formParam = formParam.replace(formParam[0], formParam[0].toUpperCase());
    button.textContent = mode == "add" ? "ADICIONAR" : "EDITAR";
    button.setAttribute(
      "onclick",
      `setYes('${confirmTitle}', '${mode + formParam}', ${editId})`
    );

    if (mode == "add") {
      resetFields();
    } else if (mode + formParam == "editMachine") {
      loadMachineInputs(editId);
    } else if (mode + formParam == "editUser") {
      loadUserInputs(editId);
    } else if (mode + formParam == "editFamily") {
      loadChecks(editId);
    }
  } else {
    machineDashContent(editId);
  }
}

// ENABLE USERS BUTTONS
function userBtnAttributes(isEnabling, idUser, fkManager) {
  const editBtn = document.querySelector("#userEditButton");
  const removeBtn = document.querySelector("#userRemoveButton");
  if (isEnabling) {
    editBtn.disabled = false;
    removeBtn.disabled = false;

    // SET ATTRIBUTE HERE
    editBtn.setAttribute(
      "onclick",
      `formView(true, "Editar usuário", "user", "edit", ${idUser})`
    );
    removeBtn.setAttribute(
      "onclick",
      `setYes('Remover usuário', 'deleteUser', ['${idUser}', '${fkManager}'])`
    );
  } else {
    editBtn.disabled = true;
    removeBtn.disabled = true;
  }
}

// CONFIRMATION MESSAGE
function setYes(msg, func, params) {
  // set question
  confirm_message.innerHTML = msg + "?";

  // show confirm buttons
  const confirmDiv = document.querySelector(".confirmation-back");
  opacityPointer(confirmDiv, "show");

  // set YES button onclick function
  const yesButton = document.querySelector("#yes_button");
  yesButton.setAttribute("onclick", `${func}(${params})`);
}
// hide confirm buttons
function hideConfirm() {
  const confirmDiv = document.querySelector(".confirmation-back");
  opacityPointer(confirmDiv, "hide");
}

// TOKEN
function copyToken(idMachine) {
  const isShowing = visibleToken(idMachine);

  if (isShowing) {
    const token = document.querySelector(`#token${idMachine}`);

    // HIGHLIGHT
    highlightToken(token);

    try {
      navigator.clipboard.writeText(token.textContent);
      showMessage("success", "Token copiado para sua Área de Transferência!");
    } catch (error) {
      console.log(error);
      showMessage("error", "Não foi possível copiar o Token");
    }
  }
}

function visibleToken(idMachine) {
  const border = document.querySelector(`#token${idMachine}`).parentElement;
  const token = document.querySelector(`#token${idMachine}`);
  const key = document.querySelector(`#key${idMachine}`);

  if (token.classList.contains("token-blur")) {
    token.classList.remove("token-blur");
    border.style.borderColor = "var(--font1)";
    key.classList.add("red-key");
    return true;
  } else {
    token.classList.add("token-blur");
    border.style.borderColor = "var(--gray-light)";
    key.classList.remove("red-key");
    return false;
  }
}

function highlightToken(element) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(element);
  selection.removeAllRanges();
  selection.addRange(range);
}

function changeDashTable(direction) {
  const arrow = (dir, func, params) => {
    return `
            <ion-icon 
              name="chevron-${dir}-outline" 
              class="td-arrow" 
              onclick="${func}(${params.join(", ")})"
            ></ion-icon>
          `;
  };

  const tables = [
    {
      title: "Processos Mortos",
      func: ["showKilledProcesses", "('idMachine')"],
      tbody: function () {
        eval(this.func.join(""));
      },
      thead: `
        <td><p>Processo</p></td>
        <td><p>Máquina</p></td>
        <td><p>Horário (Últimos 7 dias)</p></td>
        <td><p>Sala</p></td>
        <td class="lastTdBorder"><p></p></td>
      `,
      columns: "tables-column-killed-processes",
    },
    {
      title: "Rank de Máquinas",
      func: ["showMachineRank", "('desc', 'processKilled')"],
      tbody: function () {
        eval(this.func.join(""));
      },
      thead: `
        <td><p>Máquina</p></td>
        <td><p>Sala</p></td>
        <td>
          ${arrow("up", "showMachineRank", ["'asc', 'processKilled'"])}
          <p style="cursor: pointer" onclick="showMachineRank('desc', 'processKilled')">Processos Mortos</p>
          ${arrow("down", "showMachineRank", ["'desc', 'processKilled'"])}
        </td>
        <td>
          ${arrow("up", "showMachineRank", ["'asc', 'cpuAvg'"])}
          <p style="cursor: pointer" onclick="showMachineRank('desc', 'cpuAvg')">Média da CPU (24h)</p>
          ${arrow("down", "showMachineRank", ["'desc', 'cpuAvg'"])}
        </td>
        <td class="lastTdBorder">        
          ${arrow("up", "showMachineRank", ["'asc', 'ramAvg'"])}
          <p style="cursor: pointer" onclick="showMachineRank('desc', 'ramAvg')">Média da RAM (24h)</p>
          ${arrow("down", "showMachineRank", ["'desc', 'ramAvg'"])}
        </td>
      `,
      columns: "tables-column-machine-ranking",
      a: this.tbody,
    },
    {
      title: "Rank de Salas",
      func: ["showClassroomRank", "('desc', 'processKilled')"],
      tbody: function () {
        eval(this.func.join(""));
      },
      thead: `
        <td><p>Sala</p></td>
        <td><p>Máquinas</p></td>
        <td>
          ${arrow("up", "showClassroomRank", ["'asc', 'processKilled'"])}
          <p style="cursor: pointer" onclick="showClassroomRank('desc', 'processKilled')">Processos Mortos</p>
          ${arrow("down", "showClassroomRank", [
            "'desc', 'processKilled'",
          ])}        
        </td>
        <td>
          ${arrow("up", "showClassroomRank", ["'asc', 'cpuAvg'"])}
          <p style="cursor: pointer" onclick="showClassroomRank('desc', 'cpuAvg')">Média da CPU (24h)</p>
          ${arrow("down", "showClassroomRank", ["'desc', 'cpuAvg'"])}        
        </td>
        <td class="lastTdBorder">
          ${arrow("up", "showClassroomRank", ["'asc', 'ramAvg'"])}
          <p style="cursor: pointer" onclick="showClassroomRank('desc', 'ramAvg')">Média da RAM (24h)</p>
          ${arrow("down", "showClassroomRank", ["'desc', 'ramAvg'"])}        
        </td>
      `,
      columns: "tables-column-classroom-ranking",
    },
    {
      title: "Rank de Processos",
      func: ["showProcessRank", "('desc', 'detections')"],
      tbody: function () {
        eval(this.func.join(""));
      },
      thead: `        
        <td><p>Processo</p></td>
        <td>
          ${arrow("up", "showProcessRank", ["'asc', 'detections'"])}
          <p style="cursor: pointer" onclick="showProcessRank('desc', 'detections')">Detecções</p>
          ${arrow("down", "showProcessRank", ["'desc', 'detections'"])}        
        </td>
        <td><p>Sala Crítica</p></td>
        <td><p>Máquina Crítica</p></td>
        <td class="lastTdBorder"><p></p></td>
      `,
      columns: "tables-column-process-ranking",
    },
  ];
  const title = document.querySelector("#tables_title");
  const thead_tds = document.querySelector("#tables_thead_tds");
  const reloadButton = document.querySelector("#reload_button");

  for (let i = 0; i < tables.length; i++) {
    const table = tables[i];

    if (table.title.match(title.innerHTML)) {
      let index = i;
      switch (direction) {
        case "right":
          index = i + 1 >= tables.length ? 0 : i + 1;
          break;
        case "left":
          index = i - 1 < 0 ? tables.length - 1 : i - 1;
          break;
      }

      title.innerHTML = tables[index].title;
      thead_tds.innerHTML = tables[index].thead;
      thead_tds.className = tables[index].columns;
      reloadButton.setAttribute("onclick", tables[index].func.join(""));
      tablesBody.innerHTML = "";
      tables[index].tbody();
      break;
    }
  }
}
