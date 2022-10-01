// CHANGE SECTIONS VISIBILITY
let actualSection = "#dispositivos";
function showSection(sectionClass) {
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
  const form = document.querySelector("#aside_forms");

  // display with fade
  if (isOpening) {
    // changing form title
    const title = document.querySelector("#form_title");
    title.textContent = formTitle;
    // change inputs
    verifyInputs(formParam, mode, editId, formTitle);
    form.style.display = "flex";
    setTimeout(() => {
      form.style.opacity = "1";
    }, 0);
  } else {
    form.style.opacity = "0";
    setTimeout(() => {
      form.style.display = "none";
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
    loadCheckes(editId);
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
      showMessage('success', 'Token copiado para sua Área de Transferência!');
    } catch (error) {
      console.log(error);
      showMessage('error', 'Não foi possível copiar o Token')
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
