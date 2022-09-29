function addFamily() {
  showLoading();

  var familyNameVar = family_name.value;
  var familyLevelVar = family_level_select.value;
  var fkCompanyVar = sessionStorage.COMPANY_USER;

  const accessArray = [];
  const divCheck = document.querySelector(".div-checkes");
  Array.from(divCheck.children).map((access) => {
    const checkOpt = access.children[0];
    checkOpt.checked && accessArray.push(checkOpt.id);
  });

  if (familyNameVar == undefined) {
    console.log("familyNameVar is undefined!");
    return false;
  } else if (familyLevelVar == "") {
    console.log("familyLevelVar is undefined!");
    return false;
  } else if (fkCompanyVar == "") {
    console.log("fkCompanyVar is undefined!");
    return false;
  } else {
    fetch("/family/addFamily", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        familyNameServer: familyNameVar,
        familyLevelServer: familyLevelVar,
        fkCompanyServer: fkCompanyVar,
      }),
    })
      .then(function (result) {
        const idPromise = result.json();
        idPromise.then((res) => {
          if (result.ok) {
            if (accessArray.length > 0) {
              addFamilyAccess([accessArray, res.insertId]);
            }
            showFamilies();
            getFamily(fkCompanyVar);
            hideConfirm();
            setTimeout(() => {
              formView(false);
              hideLoading();
              showMessage('success', 'Coleção adicionada com sucesso!');
            }, 500);
          } else {
            hideConfirm();
            setTimeout(() => {
              hideLoading();
            }, 1000);
            throw "There was an error while you´re add a family!";
          }
        });
      })
      .catch((error) => {
        console.log(error);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
        }, 1000);
      });

    return false;
  }
}

function addFamilyAccess([accessArray, fkFamily]) {
  if (accessArray == undefined) {
    console.log("accessArray undefined at addFamilyAccess FETCH");
    return false;
  } else if (fkFamily == undefined) {
    console.log("fkFamily undefined at addFamilyAccess FETCH");
    return false;
  } else {
    fetch("/family/addFamilyAccess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accessArrayServer: accessArray,
        fkFamilyServer: fkFamily,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showFamilies();
        } else {
          throw "There was an error while you´re add a family access!";
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return false;
  }
}
