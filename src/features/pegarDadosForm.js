export function pegarDadosForm(form) {
  if (!(form instanceof HTMLFormElement)) throw new Error("Elemento não é um formulário");

  const inputs = Array.from(form.elements);

  const dadosForm = {};

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] instanceof HTMLInputElement) {
      dadosForm[inputs[i].labels[0].htmlFor] = inputs[i].value;
    }
  }

  return dadosForm;
}
