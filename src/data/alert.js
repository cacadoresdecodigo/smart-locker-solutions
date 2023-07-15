function montarTitulo(tipo) {
  switch (tipo) {
    case "erro":
      return "<b>Erro!</b> <br />";
    case "sucesso":
      return "<b>Sucesso!</b> <br />";
    default:
      "";
  }
}

function mostrarMensagem(tipo, mensagem) {
  const elementoMensagem = document.getElementById("mensagem_conteudo");
  elementoMensagem.classList.add("mensagem", tipo);
  elementoMensagem.innerHTML = montarTitulo(tipo) + mensagem;
  elementoMensagem.style.display = "block";

  setTimeout(() => {
    elementoMensagem.style.display = "none";
  }, 4000);
}

export default mostrarMensagem;
