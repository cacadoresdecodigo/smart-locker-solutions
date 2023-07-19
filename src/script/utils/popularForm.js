export function popularForm(localData, formId) {
  const form = document.getElementById(formId);

  const inputs = form.elements;

  for (let i = 0; i < inputs.length; i++) {
    if (inputs[i] instanceof HTMLInputElement) {
      inputs[i].value = localData[inputs[i].id.split("_")[0]];
    }
  }
}
