function paintUsersOnClick() {
  // users select interaction
  const rows = document.querySelector("tbody").children;
  for (const tr of rows) {
    tr.addEventListener("click", function () {
      // verify if it's the same selected
      if (!this.classList.contains("tr-clicked")) {
        // remove others selected
        for (const row of rows) {
          row.classList.remove("tr-clicked");
        }

        // add style to selected user
        return this.classList.add("tr-clicked");
      }

      // remove if selected is clicked twice + DISABLE BUTTONS
      userBtnAttributes(false);
      return this.classList.remove("tr-clicked");
    });
  }
}

function resetFields() {
  // resetting input values
  machine_name.value = "";
  family_name.value = "";
  access_name.value = "";
  access_path.value = "";
  user_name.value = "";
  user_email.value = "";
  user_password.value = "";

  [
    "userName",
    "userEmail",
    "userPassword",
    "accessName",
    "accessPath",
    "familyName",
    "machineName",
  ].map((id) => {
    document
      .querySelector(`label[for="${id}"]`)
      .classList.remove("move-up-label");
  });

  // changing all process checkboxes to false
  const divCheck = document.querySelector(".div-checks");
  Array.from(divCheck.children).map((access) => {
    const checkOpt = access.children[0];
    checkOpt.checked = false;
  });
}

function loadMachineInputs(machineId) {
  machine_name.value = document
    .querySelector(`#name_machine${machineId}`)
    .innerHTML.replace("Name: ", "")
    .trimStart()
    .trimEnd();
  const selectValue = document
    .querySelector(`#machine${machineId}`)
    .children[2].id.replace("family_machine", "");
  if (selectValue != "null") {
    machine_family_select.value = selectValue;
  } else {
    machine_family_select.value = "";
  }

  ["machineName"].map((id) => {
    document.querySelector(`label[for="${id}"]`).classList.add("move-up-label");
  });
}

function loadUserInputs(userId) {
  user_name.value = document.querySelector(
    `#user${userId}`
  ).children[0].innerHTML;
  user_email.value = document.querySelector(
    `#user${userId}`
  ).children[1].innerHTML;
  user_password.value = "";
  user_office.value = document.querySelector(
    `#user${userId}`
  ).children[2].innerHTML;

  ["userName", "userEmail", "userPassword"].map((id) => {
    document.querySelector(`label[for="${id}"]`).classList.add("move-up-label");
  });
}

function loadChecks(idFamily) {
  fetch(`/family/getSpecificFamily/${idFamily}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((json) => {
          // setting family name and level to old one
          family_level_select.value = json[0].familyLevel;
          family_name.value = json[0].familyName;

          if (json.length > 0) {
            // changing all process checkboxes to false
            const divCheck = document.querySelector(".div-checks");
            Array.from(divCheck.children).map((access) => {
              const checkOpt = access.children[0];
              checkOpt.checked = false;
            });

            // changing sector process checkboxes to true
            for (const register of json) {
              Array.from(divCheck.children).map((access) => {
                const checkOpt = access.children[0];
                if (checkOpt.id == register.idCompanyOperations) {
                  checkOpt.checked = true;
                }
              });
            }
          } else {
            // changing all process checkboxes to false
            const divCheck = document.querySelector(".div-checks");
            Array.from(divCheck.children).map((access) => {
              const checkOpt = access.children[0];
              checkOpt.checked = false;
            });
            divCheck.innerHTML = "SEM ACESSOS CADASTRADOS!";
          }
        });
      } else {
        result.text().then((err) => {
          console.error(err);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  ["familyName"].map((id) => {
    document.querySelector(`label[for="${id}"]`).classList.add("move-up-label");
  });

  return false;
}

// animate labels
addAnimatedLabelEvent([
  "userName",
  "userEmail",
  "userPassword",
  "accessName",
  "accessPath",
  "familyName",
  "machineName",
]);

(function initializeMachineDashButtons() {
  const buttons = document.querySelector(".sub-sections").children;
  for (const button of buttons) {
    button.addEventListener("click", () => {
      // remove class from other buttons
      Array.from(buttons).map((btn) => btn.classList.remove("sub-activated"));

      button.classList.add("sub-activated");
    });
  }
})();
