import { excluirEmpresa } from "../excluirEmpresa.js";
import { excluirProduto } from "../excluirProduto.js";
import { sync, load } from "../../data/locastorage.js";
import { select as selectEmpresa } from "../../data/empresas.js";
import { select as selectProduto } from "../../data/produtos.js";
import { atualizarEmpresa } from "../atualizarEmpresa.js";
import { atualizarProduto } from "../atualizarProduto.js";
import { pegarDadosForm } from "../pegarDadosForm.js";
import mostrarMensagem from "../../data/alert.js";
import { autorizar } from "../auth/autorizar.js";
import Select from "../components/Select.js";
import Table from "../components/Table.js";
import Modal from "../components/Modal.js";
import Form from "../components/Form.js";

const baseUrl = "http://127.0.0.1:5500/src/pages";
const root = document.getElementById("content");
const empresas = sync("empresas");
const produtos = sync("produtos");

const section = autorizar();
console.log(section);

const btnLogin = document.getElementById("btn_login");
btnLogin.hidden = true;

Select(["Admin", "Clientes", "Produtos", "Sair"], (selected) => {
  if (selected === "Admin") {
    window.location.href = baseUrl + "/admin.html";
  }

  if (selected === "Clientes") {
    renderTable(
      "tabela_clientes",
      "Clientes",
      { id: "btn_cadastrar_cliente", text: "Cadastrar Novo Cliente" },
      ["CNPJ", "Razão Social", "Endereço", "E-mail", "Telefone"],
      empresas
    );

    const campos = [
      ["CNPJ", "cnpj", "text", false],
      ["Razão Social", "razaosocial", "text", false],
      ["Telefone", "telefone", "text", true],
      ["E-mail", "email", "email", true],
      ["Endereço", "endereco", "text", true],
      ["Senha", "senha", "password", true],
    ];

    const form = Form(campos);
    const modal = Modal("modal_clientes", "Editar Clientes", form);
    root.appendChild(modal);
    openModal("tabela_clientes", "modal_clientes");
    editarClientesFormHandler();
  }

  if (selected === "Produtos") {
    renderTable(
      "tabela_produtos",
      "Produtos",
      { id: "btn_cadastrar_produto", text: "Cadastrar Novo Produto" },
      ["Código", "Tamanho", "Dimensões"],
      produtos
    );

    const campos = [
      ["Código", "codigo", "text", false],
      ["Tamanho", "tamanho", "text", true],
      ["Dimensões", "dimensoes", "text", true],
    ];

    const form = Form(campos);
    const modal = Modal("modal_produtos", "Editar Produtos", form);
    root.appendChild(modal);
    openModal("tabela_produtos", "modal_produtos");
    editarProdutoFormHandler();
  }

  if (selected === "Sair") {
    localStorage.removeItem("session");
    window.location.href = baseUrl + "/";
  }
});

function editarClientesFormHandler() {
  const modalClientes = document.getElementById("modal_clientes");
  const btnCancelar = document.getElementById("btn_cancelar");
  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    modalClientes.close();
  });

  const btnSalvar = document.getElementById("btn_salvar");
  btnSalvar.addEventListener("click", (e) => {
    e.preventDefault();
    const form = modalClientes.lastChild;
    const dadosAtualizados = pegarDadosForm(form);
    atualizarEmpresa(dadosAtualizados);
    mostrarMensagem("sucesso", "Cliente salvo.");
    modalClientes.close();
    setTimeout(() => (window.location.href = baseUrl + "/admin.html"), 1200);
  });

  const btnExcluirEmpresa = document.getElementById("btn_excluir");
  btnExcluirEmpresa.addEventListener("click", (e) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      e.preventDefault();
      const form = modalClientes.lastChild;
      const empresa = pegarDadosForm(form);
      excluirEmpresa(empresa.cnpj);
      window.location.href = "./admin.html";
    }
  });
}

function editarProdutoFormHandler() {
  const modalClientes = document.getElementById("modal_produtos");
  const btnCancelar = document.getElementById("btn_cancelar");
  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    modalClientes.close();
  });

  const btnSalvar = document.getElementById("btn_salvar");
  btnSalvar.addEventListener("click", (e) => {
    e.preventDefault();
    const form = modalClientes.lastChild;
    const dadosAtualizados = pegarDadosForm(form);
    atualizarProduto(dadosAtualizados);
    mostrarMensagem("sucesso", "Produto salvo.");
    modalClientes.close();
    setTimeout(() => (window.location.href = baseUrl + "/admin.html"), 1200);
  });

  const btnExcluir = document.getElementById("btn_excluir");
  btnExcluir.addEventListener("click", (e) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      e.preventDefault();
      const form = modalClientes.lastChild;
      const produto = pegarDadosForm(form);
      console.log(produto.codigo);
      excluirProduto(produto.codigo);
      window.location.href = "./admin.html";
    }
  });
}

function openModal(idTabela, idModal) {
  const tabela = document.getElementById(idTabela);
  const modal = document.getElementById(idModal);

  const tbody = tabela.getElementsByTagName("tbody")[0];
  const bodyRow = tbody.getElementsByTagName("tr");

  for (let i = 0; i < bodyRow.length; i++) {
    bodyRow[i].addEventListener("click", (e) => {
      const current = e.target.parentNode.childNodes[0].textContent;
      console.log(current);

      let localData;

      const inputs = modal.lastChild.elements;

      if (tabela.id === "tabela_clientes") {
        localData = selectEmpresa(current, empresas);
        console.log(localData);
      }

      if (tabela.id === "tabela_produtos") {
        localData = selectProduto(current, produtos);
        console.log(localData);
      }
      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] instanceof HTMLInputElement) {
          inputs[i].value = localData[inputs[i].id];
        }
      }
      modal.showModal();
    });
  }
}

function renderTable(...params) {
  const [tableId, textoTitulo, button, headers, data] = params;

  root.innerHTML = "";
  const title = document.createElement("h1");
  title.textContent = textoTitulo;

  const btnNovoCliente = document.createElement("button");
  btnNovoCliente.id = button.id;
  btnNovoCliente.classList.add("btn_primario");
  btnNovoCliente.textContent = button.text;
  root.appendChild(title);
  root.appendChild(btnNovoCliente);

  const container = document.createElement("div");
  container.id = "container";
  if (data.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Não há dados cadastrados no momento";
    container.appendChild(p);
  } else {
    const table = Table(data, tableId, headers);
    container.appendChild(table);
  }

  root.appendChild(container);
}
