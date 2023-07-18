import { selectPorEmail } from "../../data/empresas.js";
import { atualizarEmpresa } from "../atualizarEmpresa.js";
import { pegarDadosForm } from "../pegarDadosForm.js";

import mostrarMensagem from "../../data/alert.js";
import { sync } from "../../data/locastorage.js";
import { autorizar } from "../auth/autorizar.js";
import Select from "../components/Select.js";
import { excluirEmpresa } from "../excluirEmpresa.js";

const baseUrl = "http://127.0.0.1:5500/src/pages";
const section = autorizar();
console.log(section);

if (section) {
  const loginBtn = document.getElementById("btn_login");
  loginBtn.hidden = true;
  Select(
    [
      `${section.email.split("@")[0]}`,
      "Editar Cadastro",
      "Escolher Locker",
      "Sair",
    ],

    (selected) => {
      if (selected === "Editar Cadastro") {
        window.location.href = baseUrl + "/editar-cadastro.html";
      }
      if (selected === "Escolher Locker") {
        window.location.href = baseUrl + "/escolher-produtos.html";
      }
      if (selected === "Sair") {
        localStorage.removeItem("session");
        window.location.href = baseUrl + "/";
      }
    }
  );
}

const empresas = sync("empresas");
const localData = selectPorEmail(section.email, empresas);
const form = document.getElementsByTagName("form")[0];
const inputs = form.elements;

for (let i = 0; i < inputs.length; i++) {
  if (inputs[i] instanceof HTMLInputElement) {
    inputs[i].value = localData[inputs[i].id];
  }
}

const btnSalvar = document.getElementById("btn_salvar");
btnSalvar.addEventListener("click", (e) => {
  e.preventDefault();
  const dadosAtualizados = pegarDadosForm(form);
  console.log(dadosAtualizados);
  atualizarEmpresa(dadosAtualizados);
  mostrarMensagem("sucesso", "Dados atualizados.");
  setTimeout(() => {
    window.location.href = baseUrl + "/editar-cadastro.html";
  }, 1200);
});

const btnExcluirEmpresa = document.getElementById("btn_excluir");
btnExcluirEmpresa.addEventListener("click", (e) => {
  if (confirm("Tem certeza que deseja excluir?")) {
    e.preventDefault();
    const dadosForm = pegarDadosForm(form);
    excluirEmpresa(dadosForm.cnpj);
    setTimeout(() => {
      localStorage.removeItem("session");
      window.location.href = baseUrl + "/editar-cadastro.html";
    }, 1200);
  }
});
