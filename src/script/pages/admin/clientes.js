import Modal from "../../components/Modal.js";
import Form from "../../components/Form.js";
import Table from "../../components/Table.js";

export function renderizarTabelaClientes(root, empresas) {
  root.innerHTML = "";
  const tabelaId = "tabela_clientes";
  const textoTitulo = "Meus Clientes";
  const btnConfig = {
    id: "btn_cadastrar_cliente",
    text: "Cadastrar Novo Cliente",
  };

  const headers = ["CNPJ", "Razão Social", "Endereço", "E-mail", "Telefone"];

  const title = document.createElement("h1");
  title.textContent = textoTitulo;

  const btnNovoCliente = document.createElement("button");
  btnNovoCliente.id = btnConfig.id;
  btnNovoCliente.classList.add("btn_primario");
  btnNovoCliente.textContent = btnConfig.text;
  root.appendChild(title);
  root.appendChild(btnNovoCliente);
  const container = document.createElement("div");
  container.id = "container";

  // Se não tiver elemento cria um elemento textual e retorna sem a tabela.
  if (empresas.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Não há empresas cadastrados no momento";
    container.appendChild(p);
  }

  const table = Table(empresas, tabelaId, headers);
  container.appendChild(table);

  root.appendChild(container);

  // ----- MODAL------
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
}

// function editarClientesFormHandler() {
//   const modalClientes = document.getElementById("modal_clientes");
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
//     atualizarEmpresa(dadosAtualizados);
//     mostrarMensagem("sucesso", "Cliente salvo.");
//     modalClientes.close();
//     setTimeout(() => (window.location.href = baseUrl + "/admin.html"), 1200);
//   });

//   const btnExcluirEmpresa = document.getElementById("btn_excluir");
//   btnExcluirEmpresa.addEventListener("click", (e) => {
//     if (confirm("Tem certeza que deseja excluir?")) {
//       e.preventDefault();
//       const form = modalClientes.lastChild;
//       const empresa = pegarDadosForm(form);
//       excluirEmpresa(empresa.cnpj);
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
