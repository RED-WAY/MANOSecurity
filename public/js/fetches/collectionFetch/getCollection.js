function getCollection() {
  const idCompanyVar = sessionStorage.COMPANY_USER;

  if (idCompanyVar == undefined) {
    return false;
  } else {
    fetch(`/collection/getFamily/${idCompanyVar}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(function (result) {
        if (result.ok) {
          result.json().then((json) => {
            machine_collection_select.innerHTML =
              "<option value='' disabled selected>selecionar grupo</option>";
            for (var i = 0; i < json.length; i++) {
              machine_collection_select.innerHTML += `<option value="${json[i].idFamily}">${json[i].familyName}</option>`;
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
}
