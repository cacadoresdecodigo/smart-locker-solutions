import Modal from "../../components/Modal.js";
import Form from "../../components/Form.js";
import Table from "../../components/Table.js";
import { select } from "../../../data/empresas.js";
import Button from "../../components/Button.js";

import { cadastrarEmpresa } from "../../cadastrarEmpresa.js";
import { atualizarEmpresa } from "../../atualizarEmpresa.js";
import { excluirEmpresa } from "../../excluirEmpresa.js";
import { pegarDadosForm } from "../../pegarDadosForm.js";
import mostrarMensagem from "../../../data/alert.js";

import { popularForm } from "../../utils/popularForm.js";

const baseUrl = "http://127.0.0.1:5500/src/pages";

export function renderizarTabelaClientes(root, empresas) {
  root.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Meus Clientes";
  root.appendChild(title);

  Button(
    root,
    "btn_cadastrar_cliente",
    "btn_primario",
    "Cadastrar Novo Cliente",
    (e) => {
      document.getElementById("modal_cadastrar").showModal();
    }
  );

  const container = document.createElement("div");
  container.id = "container";
  root.appendChild(container);

  const headers = ["CNPJ", "Razão Social", "Endereço", "Telefone", "E-mail"];

  Table(container, empresas, "tabela_clientes", headers, (table) => {
    const bodyRow = table
      .getElementsByTagName("tbody")[0]
      .getElementsByTagName("tr");

    for (let i = 0; i < bodyRow.length; i++) {
      bodyRow[i].addEventListener("click", (e) => {
        const current = e.target.parentNode.childNodes[0].textContent;

        let localData = select(current, empresas);

        popularForm(localData, "form_editar");

        document.getElementById("modal_editar").showModal();
      });
    }
  });

  // ----- MODAL CADASTRAR ------

  Modal(root, "modal_cadastrar", "Cadastrar Clientes");
  Form(
    "modal_cadastrar",
    "form_cadastrar",
    [
      ["CNPJ", "cnpj", "text", true],
      ["Razão Social", "razaosocial", "text", true],
      ["Telefone", "telefone", "text", true],
      ["E-mail", "email", "email", true],
      ["Endereço", "endereco", "text", true],
      ["Senha", "senha", "password", true],
    ],
    [
      ["Cadastrar", "btn_primario", "btn_cadastrar_cliente"],
      ["Cancelar", "btn_terciario", "btn_cadastrar_cancelar"],
    ],
    (form, e) => {
      if (e.submitter.id === "btn_cadastrar_cliente") {
        const formData = pegarDadosForm(form);
        console.log(formData);
        const sucesso = cadastrarEmpresa(formData);
        if (sucesso) {
          mostrarMensagem("sucesso", "Cliente salvo.");
        }
        document.getElementById("modal_cadastrar").close();
        setTimeout(
          () => (window.location.href = baseUrl + "/admin.html"),
          1200
        );
      }

      if (e.submitter.id === "btn_cadastrar_cancelar") {
        document.getElementById("modal_cadastrar").close();
      }
    }
  );

  // ----- MODAL EDITAR ------
  Modal(root, "modal_editar", "Editar Clientes");
  Form(
    "modal_editar",
    "form_editar",
    [
      ["CNPJ", "cnpj_editar", "text", false],
      ["Razão Social", "razaosocial_editar", "text", false],
      ["Telefone", "telefone_editar", "text", true],
      ["E-mail", "email_editar", "email", true],
      ["Endereço", "endereco_editar", "text", true],
      ["Senha", "senha_editar", "password", true],
    ],
    [
      ["Salvar", "btn_primario", "btn_editar_salvar"],
      ["Cancelar", "btn_terciario", "btn_editar_cancelar"],
      ["Excluir", "btn_quartenario", "btn_editar_excluir"],
    ],
    (form, e) => {
      if (e.submitter.id === "btn_editar_salvar") {
        const formData = pegarDadosForm(form);
        const sucesso = atualizarEmpresa(formData);
        if (sucesso) {
          mostrarMensagem("sucesso", "Cliente salvo.");
        }
        document.getElementById("modal_editar").close();
        setTimeout(
          () => (window.location.href = baseUrl + "/admin.html"),
          1200
        );
      }
      if (e.submitter.id === "btn_editar_excluir") {
        if (confirm("Tem certeza que deseja excluir?")) {
          const empresa = pegarDadosForm(form);
          const sucesso = excluirEmpresa(empresa.cnpj);
          if (sucesso) {
            mostrarMensagem("sucesso", "Cliente Excluido");
          }
          document.getElementById("modal_editar").close();
          setTimeout(
            () => (window.location.href = baseUrl + "/admin.html"),
            1200
          );
        }
      }

      if (e.submitter.id === "btn_editar_cancelar") {
        document.getElementById("modal_editar").close();
      }
    }
  );
}
