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

function resetFields() {
  machine_token.value = "";
  machine_name.value = "";
  collection_name.value = "";
  access_name.value = "";
  access_path.value = "";

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
          collection_level_select.value = json[0].sectorLevel;
          collection_name.value = json[0].sectorName;

          const divCheck = document.querySelector(".div-checkes");
          Array.from(divCheck.children).map((access) => {
            const checkOpt = access.children[0];
            checkOpt.checked = false;
          });

          for (const register of json) {
            Array.from(divCheck.children).map((access) => {
              const checkOpt = access.children[0];
              if (checkOpt.id == register.fkOperation) {
                checkOpt.checked = true;
              }
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
