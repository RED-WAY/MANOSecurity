function getFamily() {
  const idCompanyVar = sessionStorage.COMPANY_USER;

  if (idCompanyVar == undefined) {
    hideLoading();
    hideConfirm();
    showMessage(
      "warning",
      "ID da empresa não foi definida!"
    );
    return false;
  } else {
    fetch(`/family/getFamily/${idCompanyVar}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (result) {
        if (result.ok) {
          result.json().then((json) => {
            machine_family_select.innerHTML =
              "<option value='' disabled selected>selecionar grupo</option>";
            for (var i = 0; i < json.length; i++) {
              machine_family_select.innerHTML += `<option value="${json[i].idFamily}">${json[i].familyName}</option>`;
            }
          });
        } else {
          result.text().then((err) => {
            console.error(err);
            hideLoading();
            hideConfirm();
            showMessage(
              "error",
              "Aconteceu algum erro enquanto removia uma coleção!"
            );
          });
        }
      })
      .catch((error) => {
        console.log(error);
        hideLoading();
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto removia uma coleção!"
        );
      });

    return false;
  }
}
