import Modal from "../../components/Modal.js";
import Form from "../../components/Form.js";
import Table from "../../components/Table.js";
import { select } from "../../../data/produtos.js";
import Button from "../../components/Button.js";

import { cadastrarProduto } from "../../cadastrarProduto.js";
import { atualizarProduto } from "../../atualizarProduto.js";
import { excluirProduto } from "../../excluirProduto.js";
import { pegarDadosForm } from "../../pegarDadosForm.js";
import mostrarMensagem from "../../../data/alert.js";
import { load } from "../../../data/locastorage.js";

import { popularForm } from "../../utils/popularForm.js";

const baseUrl = "http://127.0.0.1:5500/src/pages";

export function renderizarTabelaProdutos(root, produtos) {
  root.innerHTML = "";

  const title = document.createElement("h1");
  title.textContent = "Meus Produtos";
  root.appendChild(title);

  Button(
    root,
    "btn_cadastrar_produto",
    "btn_primario",
    "Cadastrar Novo Produto",
    (e) => {
      document.getElementById("modal_cadastrar").showModal();
    }
  );

  const container = document.createElement("div");
  container.id = "container";
  root.appendChild(container);

  Table(
    container,
    produtos,
    "tabela_produtos",
    ["Código", "Tamanho", "Dimensões"],
    (table) => {
      const bodyRow = table
        .getElementsByTagName("tbody")[0]
        .getElementsByTagName("tr");

      for (let i = 0; i < bodyRow.length; i++) {
        bodyRow[i].addEventListener("click", (e) => {
          const current = e.target.parentNode.childNodes[0].textContent;

          let localData = select(current, produtos);

          popularForm(localData, "form_editar");

          document.getElementById("modal_editar").showModal();
        });
      }
    }
  );

  // ----- MODAL CADASTRAR ------

  Modal(root, "modal_cadastrar", "Cadastrar Clientes");
  Form(
    "modal_cadastrar",
    "form_cadastrar",
    [
      ["Código", "codigo", "text", true],
      ["Tamanho", "tamanho", "text", true],
      ["Dimensões", "dimensoes", "text", true],
    ],
    [
      ["Cadastrar", "btn_primario", "btn_cadastrar_produto"],
      ["Cancelar", "btn_terciario", "btn_cadastrar_cancelar"],
    ],
    (form, e) => {
      if (e.submitter.id === "btn_cadastrar_produto") {
        const formData = pegarDadosForm(form);
        console.log(formData);
        const sucesso = cadastrarProduto(formData);
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
  Modal(root, "modal_editar", "Editar Produtos");
  Form(
    "modal_editar",
    "form_editar",
    [
      ["Código", "codigo_editar", "text", false],
      ["Tamanho", "tamanho_editar", "text", false],
      ["Dimensões", "dimensoes_editar", "text", true],
    ],
    [
      ["Salvar", "btn_primario", "btn_editar_salvar"],
      ["Cancelar", "btn_terciario", "btn_editar_cancelar"],
      ["Excluir", "btn_quartenario", "btn_editar_excluir"],
    ],
    (form, e) => {
      if (e.submitter.id === "btn_editar_salvar") {
        const formData = pegarDadosForm(form);
        const sucesso = atualizarProduto(formData);
        if (sucesso) {
          mostrarMensagem("sucesso", "Produto salvo.");
        }
        document.getElementById("modal_editar").close();
        setTimeout(
          () => (window.location.href = baseUrl + "/admin.html"),
          1200
        );
      }
      if (e.submitter.id === "btn_editar_excluir") {
        if (confirm("Tem certeza que deseja excluir?")) {
          const produto = pegarDadosForm(form);
          const sucesso = excluirProduto(produto.codigo);
          if (sucesso) {
            mostrarMensagem("sucesso", "Produto Excluido");
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
