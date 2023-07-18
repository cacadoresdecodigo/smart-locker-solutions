export default function Form(campos, btnData) {
  const form = document.createElement("form");

  const linha = document.createElement("div");
  linha.classList.add("formulario_linha");

  for (let i = 0; i < campos.length; i++) {
    const campo = document.createElement("div");
    campo.classList.add("campo");
    const label = document.createElement("label");
    label.textContent = campos[i][0];
    label.htmlFor = campos[i][1];
    const input = document.createElement("input");
    input.type = campos[i][2];
    input.id = campos[i][1];
    if (campos[i][3] === false) {
      input.setAttribute("disabled", "true");
    }
    campo.appendChild(label);
    campo.appendChild(input);
    linha.appendChild(campo);
  }

  form.appendChild(linha);

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");

  for (let i = 0; i < btnData.length; i++) {
    const button = document.createElement("button");
    button.classList.add(btnData[i][1]);
    button.textContent = btnData[i][0];
    button.id = btnData[i][2];
    acoes.appendChild(button);
  }

  form.appendChild(acoes);
  return form;
}
