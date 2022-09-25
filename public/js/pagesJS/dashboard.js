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
    verifyInputs(formParam, mode, editId);
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
function verifyInputs(formParam, mode, editId) {
  // formParam: machine, collection, access
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
  button.setAttribute("onclick", `${mode + formParam}(${editId})`);

  if (mode == "add") {
    resetFields();
  } else if (mode + formParam == "editCollection") {
    loadCheckes(editId);
  }
}

// ENABLE USERS BUTTONS
function userBtnAttributes(isEnabling, idUser) {
  const editBtn = document.querySelector("#userEditButton");
  const removeBtn = document.querySelector("#userRemoveButton");
  if (isEnabling) {
    editBtn.disabled = false;
    removeBtn.disabled = false;

    // SET ATTRIBUTE HERE
  } else {
    editBtn.disabled = true;
    removeBtn.disabled = true;

    // UNSET ATTRIBUTE HERE
  }
}
