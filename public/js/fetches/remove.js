function remove() {
  fetch(`/avisos/deletar/${idAviso}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resposta) {
      if (resposta.ok) {
        window.alert(
          "Post deletado com sucesso pelo usuario de email: " +
            sessionStorage.getItem("EMAIL_USUARIO") +
            "!"
        );
        window.location = "/dashboard/mural.html";
      } else if (resposta.status == 404) {
        window.alert("Deu 404!");
      } else {
        throw (
          "Houve um erro ao tentar realizar a postagem! Código da resposta: " +
          resposta.status
        );
      }
    })
    .catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });
}
