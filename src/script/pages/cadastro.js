import { pegarDadosForm } from "../pegarDadosForm.js";
import { cadastrarEmpresa } from "../cadastrarUsuario.js";

const form = document.getElementById("form_cadastro");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dadosEmpresa = pegarDadosForm(form);
  cadastrarEmpresa(dadosEmpresa);
  window.location.href = "./index.html";
});
