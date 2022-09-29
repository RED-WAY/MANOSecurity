function addUser() {
  showLoading();

  const consumerNameVar = user_name.value;
  const consumerEmailVar = user_email.value;
  const consumerPasswordVar = user_password.value;
  const managementVar = user_office.value.toUpperCase();
  const managerVar = sessionStorage.ID_USER;
  const companyVar = sessionStorage.COMPANY_USER;
  
  if (consumerNameVar == undefined) {
    console.log("consumerName is undefined");
  } else if (consumerEmailVar == undefined) {
    console.log("consumerEmail is undefined");
  } else if (consumerPasswordVar == undefined) {
    console.log("consumerPassword is undefined");
  } else if (managementVar == undefined) {
    console.log("management is undefined");
  } else if (managerVar == undefined) {
    console.log("manager is undefined");
  } else if (companyVar == undefined) {
    console.log("company is undefined");
  } else {
    fetch(`/users/addUser/${companyVar}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        consumerNameServer: consumerNameVar,
        consumerEmailServer: consumerEmailVar,
        consumerPasswordServer: consumerPasswordVar,
        managementServer: managementVar,
        managerServer: managerVar,
      }),
    })
      .then(function (result) {
        if (result.ok) {
          showUsers();
          hideConfirm();
          setTimeout(() => {
            formView(false);
            hideLoading();
            showMessage('success', 'Usuário adicionado com sucesso!');
          }, 500);
        } else {
          hideConfirm();
          setTimeout(() => {
            hideLoading();
          }, 1000);
          throw "There was an error while adding a user!";
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
}
