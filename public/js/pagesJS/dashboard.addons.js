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
  // reseting input values
  machine_token.value = "";
  machine_name.value = "";
  collection_name.value = "";
  access_name.value = "";
  access_path.value = "";

  // changing all process checkboxes to false
  const divCheck = document.querySelector(".div-checkes");
  Array.from(divCheck.children).map((access) => {
    const checkOpt = access.children[0];
    checkOpt.checked = false;
  });
}

function loadCheckes(idCollection) {
  fetch(`/collection/getSpecificCollection/${idCollection}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((json) => {
          // setting collection name and level to old one
          collection_level_select.value = json[0].sectorLevel;
          collection_name.value = json[0].sectorName;

          if (json.length > 0) {
            // changing all process checkboxes to false
            const divCheck = document.querySelector(".div-checkes");
            Array.from(divCheck.children).map((access) => {
              const checkOpt = access.children[0];
              checkOpt.checked = false;
            });

            // changing sector process checkboxes to true
            for (const register of json) {
              Array.from(divCheck.children).map((access) => {
                const checkOpt = access.children[0];
                if (checkOpt.id == register.fkOperation) {
                  checkOpt.checked = true;
                }
              });
            }
          } else {
            // changing all process checkboxes to false
            const divCheck = document.querySelector(".div-checkes");
            Array.from(divCheck.children).map((access) => {
              const checkOpt = access.children[0];
              checkOpt.checked = false;
            });
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

  return false;
}
