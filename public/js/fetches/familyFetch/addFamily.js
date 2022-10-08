function addFamily() {
  showLoading();

  const familyNameVar = family_name.value.trimStart().trimEnd();
  const familyLevelVar = family_level_select.value;
  const fkCompanyVar = sessionStorage.COMPANY_USER;

  const accessArray = [];
  const divCheck = document.querySelector(".div-checks");
  Array.from(divCheck.children).map((access) => {
    const checkOpt = access.children[0];
    checkOpt.checked && accessArray.push(checkOpt.id);
  });

  if (familyNameVar == "") {
    hideLoading();
    hideConfirm();
    showMessage("warning", "Nome da coleção não foi definido!");
    return false;
  } else if (familyLevelVar == "") {
    hideLoading();
    hideConfirm();
    showMessage(
      "error",
      "Nível da coleção não foi encontrado! Contate o suporte pelo CHATBOT"
    );
    return false;
  } else if (fkCompanyVar == "" || fkCompanyVar == undefined) {
    hideLoading();
    hideConfirm();
    showMessage(
      "error",
      "Empresa do usuário não identificada! Encerre a sessão e tente novamente"
    );
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
        if (result.ok) {
          if (accessArray.length > 0) {
            getFamilyId(
              familyNameVar,
              familyLevelVar,
              fkCompanyVar,
              accessArray
            );
          } else {
            showFamilies();
            hideConfirm();
            setTimeout(() => {
              formView(false);
              hideLoading();
              showMessage("success", "Coleção adicionada com sucesso!");
            }, 500);
          }
          getFamily(fkCompanyVar);
        } else {
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            showMessage(
              "error",
              "Aconteceu algum erro enquanto adicionava uma coleção!"
            );
          }, 1000);
          hideLoading();
          hideConfirm();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto adicionava uma coleção!"
          );
          throw "There was an error while you´re add a family!";
        }
      })
      .catch((error) => {
        console.log(error);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          hideConfirm();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto adicionava uma coleção!"
          );
        }, 1000);
      });

    return false;
  }
}

function getFamilyId(familyNameVar, familyLevelVar, fkCompanyVar, accessArray) {
  fetch(
    `/family/getFamilyId/${familyNameVar}/${familyLevelVar}/${fkCompanyVar}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then(function (result) {
      if (result.ok) {
        result.json().then((data) => {
          addFamilyAccess([accessArray, data[0].idFamily]);
        });
      } else {
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto adicionava uma coleção!"
        );
        throw "There was an error while getting the specific family id";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      setTimeout(() => {
        hideLoading();
      }, 3000);
    });
  return false;
}

function addFamilyAccess([accessArray, fkFamily]) {
  if (accessArray == undefined) {
    console.log("accessArray undefined at addFamilyAccess FETCH");
    hideLoading();
    hideConfirm();
    showMessage(
      "error",
      "Aconteceu algum erro enquanto adicionava uma coleção!"
    );
    return false;
  } else if (fkFamily == undefined) {
    console.log("fkFamily undefined at addFamilyAccess FETCH");
    hideLoading();
    hideConfirm();
    showMessage(
      "error",
      "Aconteceu algum erro enquanto adicionava uma coleção!"
    );
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
          hideConfirm();
          setTimeout(() => {
            formView(false);
            hideLoading();
            showMessage("success", "Coleção adicionada com sucesso!");
          }, 500);
        } else {
          hideLoading();
          hideConfirm();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto adicionava uma coleção!"
          );
          throw "There was an error while you´re add a family access!";
        }
      })
      .catch((error) => {
        console.log(error);
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto adicionava uma coleção!"
        );
      });

    return false;
  }
}
