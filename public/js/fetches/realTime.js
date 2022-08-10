function obterdados(idAquario) {
  fetch(`/medidas/tempo-real/${idAquario}`)
    .then((resposta) => {
      if (resposta.ok) {
        resposta.json().then((resposta) => {
          console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);

          var dados = {
            temperatura: resposta[0].temperatura,
          };

          alertar(resposta[0].temperatura, idAquario);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(
        `Erro na obtenção dos dados do aquario p/ gráfico: ${error.message}`
      );
    });
}
