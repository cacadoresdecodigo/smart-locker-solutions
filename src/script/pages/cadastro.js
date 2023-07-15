import { pegarDadosForm } from "../pegarDadosForm.js";
import { cadastrarEmpresa } from "../cadastrarEmpresa.js";
import mostrarMensagem from "../../data/alert.js";

const form = document.getElementById("form_cadastro");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const dadosEmpresa = pegarDadosForm(form);
  const cadastroEfetuado = cadastrarEmpresa(dadosEmpresa);

  if (cadastroEfetuado) {
    mostrarMensagem("sucesso", "Cadastro realizado, aguarde você será redirecionado.");
    setTimeout(() => {
      window.location.href = "./index.html";
    }, 4000);
  }
});
