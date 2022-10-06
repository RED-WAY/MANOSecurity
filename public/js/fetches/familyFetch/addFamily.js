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
              showMessage("success", "Coleção adicionada com sucesso!");
            }, 500);
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
        });
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
