function editFamily(idFamily) {
  showLoading();

  const familyNameVar = family_name.value.trimStart().trimEnd();
  const familyLevelVar = family_level_select.value;

  const accessArray = [];
  const divCheck = document.querySelector(".div-checks");
  Array.from(divCheck.children).map((access) => {
    const checkOpt = access.children[0];
    checkOpt.checked && accessArray.push(checkOpt.id);
  });

  if (familyNameVar == "") {
    hideLoading();
    hideConfirm();
    showMessage(
      "warning",
      "Nome da coleção não foi definido! Encerre a sessão e tente novamente"
    );
    return false;
  } else if (familyLevelVar == "") {
    hideLoading();
    hideConfirm();
    showMessage(
      "error",
      "Nível da coleção não foi encontrado! Contate o suporte pelo CHATBOT"
    );
    return false;
  } else {
    fetch(`/family/editFamily/${idFamily}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        familyNameServer: familyNameVar,
        familyLevelServer: familyLevelVar,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showFamilies();
          getFamily();
          removeFromFamilyOperations(idFamily, addFamilyAccess, [
            accessArray,
            idFamily,
          ]);
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            formView(false);
            showMessage("success", "Coleção editada com sucesso!");
          }, 500);
        } else {
          hideConfirm();
          setTimeout(() => {
            hideLoading();
            showMessage(
              "error",
              "Aconteceu algum erro enquanto editava uma coleção!"
            );
          }, 1000);
          throw "There was an error while editing a family!";
        }
      })
      .catch((error) => {
        console.log(error);
        hideConfirm();
        setTimeout(() => {
          hideLoading();
          showMessage(
            "error",
            "Aconteceu algum erro enquanto adicionava uma coleção!"
          );
        }, 700);
      });

    return false;
  }
}
