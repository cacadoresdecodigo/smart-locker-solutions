import { pegarDadosForm } from "./pegarDadosForm.js";
import { sync, load, create } from "../data/localStorage/empresas.js";

const empresas = sync();
console.log(empresas);

const form = document.getElementById("form_cadastro");

form.addEventListener("submit", (e) => {
  const dadosForm = pegarDadosForm(form);

  const emailExistente = empresas.find((empresa) => empresa.email === dadosForm.email);
  const cnpjExistente = empresas.find((empresa) => empresa.cnpj === dadosForm.cnpj);

  if (emailExistente || cnpjExistente) {
    alert("Usuário com mesmo cnpj ou e-mail já cadastrado");
    return;
  }

  create(empresas, dadosForm);

  load(empresas);
});
