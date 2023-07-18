import Modal from "../../components/Modal.js";
import Form from "../../components/Form.js";
import Table from "../../components/Table.js";
import { select } from "../../../data/produtos.js";
import { atualizarProduto } from "../../atualizarProduto.js";
import { excluirProduto } from "../../excluirProduto.js";
import { pegarDadosForm } from "../../pegarDadosForm.js";
import mostrarMensagem from "../../../data/alert.js";

const baseUrl = "http://127.0.0.1:5500/src/pages";

export function renderizarTabelaProdutos(root, produtos) {
  root.innerHTML = "";
  const tabelaId = "tabela_produtos";
  const textoTitulo = "Meus Produtos";
  const btnConfig = {
    id: "btn_cadastrar_produto",
    text: "Cadastrar Novo Produto",
  };

  const headers = ["Código", "Tamanho", "Dimensões"];

  const title = document.createElement("h1");
  title.textContent = textoTitulo;

  const btnNovoProduto = document.createElement("button");
  btnNovoProduto.id = btnConfig.id;
  btnNovoProduto.classList.add("btn_primario");
  btnNovoProduto.textContent = btnConfig.text;
  root.appendChild(title);
  root.appendChild(btnNovoProduto);
  const container = document.createElement("div");
  container.id = "container";

  // Se não tiver elemento cria um elemento textual e retorna sem a tabela.
  if (produtos.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Não há produtos cadastrados no momento";
    container.appendChild(p);
  }

  const table = Table(produtos, tabelaId, headers);
  container.appendChild(table);

  root.appendChild(container);

  // ----- MODAL------
  const btnData = [
    ["Salvar", "btn_primario", "btn_salvar_produto"],
    ["Cancelar", "btn_terciario", "btn_cancelar_produto"],
    ["Excluir", "btn_quartenario", "btn_excluir_produto"],
  ];
  const campos = [
    ["Código", "codigo", "text", false],
    ["Tamanho", "tamanho", "text", true],
    ["Dimensões", "dimensoes", "text", true],
  ];
  const form = Form(campos, btnData);
  const modal = Modal("modal_produtos", "Editar Produtos", form);
  root.appendChild(modal);

  const tbody = table.getElementsByTagName("tbody")[0];
  const bodyRow = tbody.getElementsByTagName("tr");

  // ABRIR MODAL COM OS DADOS DO LOCAL STORAGE
  for (let i = 0; i < bodyRow.length; i++) {
    bodyRow[i].addEventListener("click", (e) => {
      const current = e.target.parentNode.childNodes[0].textContent;

      let localData = select(current, produtos);

      const inputs = form.elements;

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] instanceof HTMLInputElement) {
          inputs[i].value = localData[inputs[i].id];
        }
      }
      modal.showModal();
    });
  }

  // FECHAR MODAL
  const btnCancelar = document.getElementById("btn_cancelar_produto");
  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    modal.close();
  });

  //SALVAR PRODUTO COM DADOS ATUALIZADOS
  const btnSalvar = document.getElementById("btn_salvar_produto");
  btnSalvar.addEventListener("click", (e) => {
    e.preventDefault();
    const dadosAtualizados = pegarDadosForm(form);
    atualizarProduto(dadosAtualizados);
    mostrarMensagem("sucesso", "Produto salvo.");
    modal.close();
    setTimeout(() => (window.location.href = baseUrl + "/admin.html"), 1200);
  });

  //EXCLUIR PRODUTO
  const btnExcluir = document.getElementById("btn_excluir_produto");
  btnExcluir.addEventListener("click", (e) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      e.preventDefault();
      const produto = pegarDadosForm(form);
      excluirProduto(produto.codigo);
      window.location.href = "./admin.html";
    }
  });
}
