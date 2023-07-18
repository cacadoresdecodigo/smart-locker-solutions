import Modal from "../../components/Modal.js";
import Form from "../../components/Form.js";
import Table from "../../components/Table.js";

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
  const campos = [
    ["Código", "codigo", "text", false],
    ["Tamanho", "tamanho", "text", false],
    ["Dimensões", "dimensoes", "text", true],
  ];
  const form = Form(campos);
  const modal = Modal("modal_produtos", "Editar Produtos", form);
  root.appendChild(modal);
}
// function editarProdutoFormHandler() {
//   const modalClientes = document.getElementById("modal_produtos");
//   const btnCancelar = document.getElementById("btn_cancelar");
//   btnCancelar.addEventListener("click", (e) => {
//     e.preventDefault();
//     modalClientes.close();
//   });

//   const btnSalvar = document.getElementById("btn_salvar");
//   btnSalvar.addEventListener("click", (e) => {
//     e.preventDefault();
//     const form = modalClientes.lastChild;
//     const dadosAtualizados = pegarDadosForm(form);
//     atualizarProduto(dadosAtualizados);
//     mostrarMensagem("sucesso", "Produto salvo.");
//     modalClientes.close();
//     setTimeout(() => (window.location.href = baseUrl + "/admin.html"), 1200);
//   });

//   const btnExcluir = document.getElementById("btn_excluir");
//   btnExcluir.addEventListener("click", (e) => {
//     if (confirm("Tem certeza que deseja excluir?")) {
//       e.preventDefault();
//       const form = modalClientes.lastChild;
//       const produto = pegarDadosForm(form);
//       console.log(produto.codigo);
//       excluirProduto(produto.codigo);
//       window.location.href = "./admin.html";
//     }
//   });
// }

// function openModal(idTabela, idModal) {
//   const tabela = document.getElementById(idTabela);
//   const modal = document.getElementById(idModal);

//   const tbody = tabela.getElementsByTagName("tbody")[0];
//   const bodyRow = tbody.getElementsByTagName("tr");

//   for (let i = 0; i < bodyRow.length; i++) {
//     bodyRow[i].addEventListener("click", (e) => {
//       const current = e.target.parentNode.childNodes[0].textContent;
//       console.log(current);

//       let localData;

//       const inputs = modal.lastChild.elements;

//       if (tabela.id === "tabela_clientes") {
//         localData = selectEmpresa(current, empresas);
//         console.log(localData);
//       }

//       if (tabela.id === "tabela_produtos") {
//         localData = selectProduto(current, produtos);
//         console.log(localData);
//       }
//       for (let i = 0; i < inputs.length; i++) {
//         if (inputs[i] instanceof HTMLInputElement) {
//           inputs[i].value = localData[inputs[i].id];
//         }
//       }
//       modal.showModal();
//     });
//   }
// }
