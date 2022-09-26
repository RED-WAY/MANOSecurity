function showUsers() {
  const fkCompany = sessionStorage.COMPANY_USER;

  fetch(`/users/showConsumers/${fkCompany}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (result) {
      if (result.ok) {
        result.json().then((users) => {
          usersDisplay.innerHTML = "";
          for (var i = 0; i < users.length; i++) {
            usersDisplay.innerHTML += `
              <tr onclick="userBtnAttributes(true, '${users[i].idConsumer}')" id="user${users[i].idConsumer}">
                <td>${users[i].consumerName}</td>
                <td>${users[i].consumerEmail}</td>
                <td>${users[i].management}</td>
                <td>${users[i].dtAdded}</td>
                <td>${users[i].managerName}</td>
              </tr> 
         `;
          }
          paintUsersOnClick();
        });
      } else {
        throw "There was an error while showing the users";
      }
    })
    .catch((error) => {
      console.log(error);
    });

  return false;
}
