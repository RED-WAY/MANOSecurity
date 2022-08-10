function publicar() {
  var idUsuario = sessionStorage.ID_USUARIO;

  var corpo = {
    titulo: form_postagem.titulo.value,
    descricao: form_postagem.descricao.value,
  };

  fetch(`/avisos/publicar/${idUsuario}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(corpo),
  })
    .then(function (resposta) {
      console.log("resposta: ", resposta);

      if (resposta.ok) {
        window.alert(
          "Post realizado com sucesso pelo usuario de ID: " + idUsuario + "!"
        );
        window.location = "/dashboard/mural.html";
        limparFormulario();
        finalizarAguardar();
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
      finalizarAguardar();
    });

  return false;
}
