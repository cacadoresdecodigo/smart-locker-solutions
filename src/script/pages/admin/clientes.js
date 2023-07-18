import Modal from "../../components/Modal.js";
import Form from "../../components/Form.js";
import Table from "../../components/Table.js";
import { select } from "../../../data/empresas.js";
import { cadastrarEmpresa } from "../../cadastrarEmpresa.js";
import { atualizarEmpresa } from "../../atualizarEmpresa.js";
import { excluirEmpresa } from "../../excluirEmpresa.js";
import { pegarDadosForm } from "../../pegarDadosForm.js";
import mostrarMensagem from "../../../data/alert.js";
import { load } from "../../../data/locastorage.js";

const baseUrl = "http://127.0.0.1:5500/src/pages";

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

  const table = Table(empresas, tabelaId, headers);
  container.appendChild(table);

  root.appendChild(container);

  // ----- MODAL EDITAR ------
  const camposEditar = [
    ["CNPJ", "cnpj", "text", false],
    ["Razão Social", "razaosocial", "text", false],
    ["Telefone", "telefone", "text", true],
    ["E-mail", "email", "email", true],
    ["Endereço", "endereco", "text", true],
    ["Senha", "senha", "password", true],
  ];

  const btnData = [
    ["Salvar", "btn_primario", "btn_salvar_cliente"],
    ["Cancelar", "btn_terciario", "btn_cancelar_cliente"],
    ["Excluir", "btn_quartenario", "btn_excluir_cliente"],
  ];
  const formEditar = Form(camposEditar, btnData);
  const modalEditar = Modal("modal_clientes", "Editar Clientes", formEditar);
  root.appendChild(modalEditar);

  // ABRIR MODAL EDITAR COM OS DADOS DO LOCAL STORAGE
  const tbody = table.getElementsByTagName("tbody")[0];
  const bodyRow = tbody.getElementsByTagName("tr");
  for (let i = 0; i < bodyRow.length; i++) {
    bodyRow[i].addEventListener("click", (e) => {
      const current = e.target.parentNode.childNodes[0].textContent;

      let localData = select(current, empresas);

      const inputs = formEditar.elements;

      for (let i = 0; i < inputs.length; i++) {
        if (inputs[i] instanceof HTMLInputElement) {
          inputs[i].value = localData[inputs[i].id];
        }
      }
      modalEditar.showModal();
    });
  }

  // FECHAR MODAL
  const btnCancelar = document.getElementById("btn_cancelar_cliente");
  btnCancelar.addEventListener("click", (e) => {
    e.preventDefault();
    modalEditar.close();
  });

  //SALVAR EMPRESA COM DADOS ATUALIZADOS
  const btnSalvar = document.getElementById("btn_salvar_cliente");
  btnSalvar.addEventListener("click", (e) => {
    e.preventDefault();
    const dadosAtualizados = pegarDadosForm(formEditar);
    atualizarEmpresa(dadosAtualizados);
    mostrarMensagem("sucesso", "Cliente salvo.");
    modalEditar.close();
    setTimeout(() => (window.location.href = baseUrl + "/admin.html"), 1200);
  });

  //EXCLUIR EMPRESA
  const btnExcluirEmpresa = document.getElementById("btn_excluir_cliente");
  btnExcluirEmpresa.addEventListener("click", (e) => {
    if (confirm("Tem certeza que deseja excluir?")) {
      e.preventDefault();
      const empresa = pegarDadosForm(formEditar);
      excluirEmpresa(empresa.cnpj);
      window.location.href = "./admin.html";
    }
  });

  //   // ----- MODAL CADASTRAR ------
  //   const camposCadastrar = [
  //     ["CNPJ", "cnpj", "text", true],
  //     ["Razão Social", "razaosocial", "text", true],
  //     ["Telefone", "telefone", "text", true],
  //     ["E-mail", "email", "email", true],
  //     ["Endereço", "endereco", "text", true],
  //     ["Senha", "senha", "password", true],
  //   ];

  //   const btnDataCadastrar = [
  //     ["Salvar", "btn_primario", "btn_cadastrar_empresa"],
  //     ["Cancelar", "btn_terciario", "btn_fechar_empresa"],
  //   ];
  //   const formCadastrar = Form(camposCadastrar, btnDataCadastrar);
  //   const modalCadastrar = Modal(
  //     "modal_clientes_cadastrar",
  //     "Cadastrar Novo Cliente",
  //     formCadastrar
  //   );
  //   root.appendChild(modalCadastrar);
  //   // ABRIR MODAL CADASTRAR
  //   const btnCadastrarModal = document.getElementById("btn_cadastrar_cliente");
  //   btnCadastrarModal.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     modalCadastrar.showModal();
  //   });

  //   // FECHAR MODAL CADASTRAR
  //   const btnFecharModal = document.getElementById("btn_fechar_empresa");
  //   btnFecharModal.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     modalCadastrar.close();
  //   });

  //   // CADASTRAR  NOVA EMPRESA
  //   const btnCadastrar = document.getElementById("btn_cadastrar_empresa");
  //   btnCadastrar.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     const dadosAtualizados = pegarDadosForm(formCadastrar);
  //     cadastrarEmpresa(dadosAtualizados);
  //     mostrarMensagem("sucesso", "Cliente salvo.");
  //     modalEditar.close();
  //     setTimeout(() => (window.location.href = baseUrl + "/admin.html"), 1200);
  //   });
}
