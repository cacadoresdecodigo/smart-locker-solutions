import Button from "./Button.js";

export default function Form(rootId, formId, campos, btnData, handler) {
  const root = document.getElementById(rootId);
  const form = document.createElement("form");
  form.id = formId;

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
    Button(acoes, btnData[i][2], btnData[i][1], btnData[i][0]);
  }

  form.appendChild(acoes);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    handler(form, e);
  });

  root.appendChild(form);
}
