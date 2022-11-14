function showUsers() {
  showLoading();

  const fkCompany = sessionStorage.COMPANY_USER;
  const idConsumer = sessionStorage.ID_USER;

  fetch(`/users/showConsumers/${fkCompany}/${idConsumer}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        usersDisplay.innerHTML = "";
        if (result.status == 200) {
          result.json().then((users) => {
            for (let i = 0; i < users.length; i++) {
              usersDisplay.innerHTML += `
              <tr onclick="userBtnAttributes(true, '${users[i].idConsumer}', '${
                users[i].fkManager
              }')" id="user${users[i].idConsumer}" class="tables-column-users">
                <td><p>${users[i].consumerName}</p></td>
                <td><p>${users[i].consumerEmail}</p></td>
                <td><p>${users[i].management}</p></td>
                <td><p>${users[i].dtAdded}</p></td>
                <td><p>${users[i].managerName || "USUÁRIO REMOVIDO"}</p></td>
              </tr> 
        `;
            }
            paintRowsOnClick();
          });
        } else {
          hideLoading();
          showMessage("warning", "Nenhum usuário foi cadastrado!");
        }
      } else {
        hideConfirm();
        showMessage(
          "error",
          "Aconteceu algum erro enquanto carregavam os usuários!"
        );
        throw "There was an error while showing the users";
      }
    })
    .catch((error) => {
      console.log(error);
      hideConfirm();
      showMessage(
        "error",
        "Aconteceu algum erro enquanto carregavam os usuários!"
      );
    });
  setTimeout(() => {
    hideLoading();
  }, 2000);
  return false;
}
