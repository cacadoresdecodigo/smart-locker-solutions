import { sync as sincronizarEmpresas, select as selectEmpresa } from "../../data/localStorage/empresas.js";
import { sync as sincronizarProdutos, select as selectProduto } from "../../data/localStorage/produtos.js";

const containerClientes = document.getElementById("container_clientes");
const containerProdutos = document.getElementById("container_produtos");
const main = document.getElementById("content");

const empresas = sincronizarEmpresas();
const produtos = sincronizarProdutos();

console.log(empresas);
console.log(produtos);

renderizarTabelaClientes(empresas, containerClientes);
renderizarModalEditarClientes();

renderizarTabelaProdutos(produtos, containerProdutos);
renderizarModalEditarProdutos();

const tableClientes = document.getElementById("tabela_clientes");

if (tableClientes) {
  const tbodyClientes = tableClientes.getElementsByTagName("tbody")[0];
  const bodyRowClientes = tbodyClientes.getElementsByTagName("tr");
  const modalClientes = document.getElementById("editar_clientes");

  for (let i = 0; i < bodyRowClientes.length; i++) {
    bodyRowClientes[i].addEventListener("click", (e) => {
      const cnpjEmpresa = e.target.parentNode.childNodes[1].textContent;

      const empresa = selectEmpresa(cnpjEmpresa, empresas);
      const inputs = modalClientes.lastChild.elements;
      inputs[0].value = empresa.razaosocial;
      inputs[1].value = empresa.nomefantasia;
      inputs[2].value = empresa.cnpj;
      inputs[3].value = empresa.telefone;
      inputs[4].value = empresa.email;
      inputs[5].value = empresa.endereco;
      inputs[6].value = empresa.senha;
      modalClientes.showModal();
    });
  }
}

const tableProdutos = document.getElementById("tabela_produtos");

if (tableProdutos) {
  const tbodyProdutos = tableProdutos.getElementsByTagName("tbody")[0];
  const bodyRowProdutos = tbodyProdutos.getElementsByTagName("tr");
  const modalProdutos = document.getElementById("editar_produtos");

  for (let i = 0; i < bodyRowProdutos.length; i++) {
    bodyRowProdutos[i].addEventListener("click", (e) => {
      const codProduto = e.target.parentNode.childNodes[0].textContent;
      const produto = selectProduto(codProduto, produtos);
      const inputs = modalProdutos.lastChild.elements;
      inputs[0].value = produto.codigo;
      inputs[1].value = produto.tamanho;
      inputs[2].value = produto.dimensoes;
      modalProdutos.showModal();
    });
  }
}

function renderizarTabelaClientes(empresas, root) {
  if (empresas.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Não há empresas cadastrados no momento";
    root.appendChild(p);
  } else {
    const table = document.createElement("table");
    table.setAttribute("id", "tabela_clientes");
    const thead = document.createElement("thead");
    thead.classList.add("tabela_header");
    const headerRow = document.createElement("tr");

    const tableHeaders = ["Nome Fantasia", "CNPJ", "Endereço", "E-mail", "Telefone"];
    for (let i = 0; i < tableHeaders.length; i++) {
      const th = document.createElement("th");
      th.textContent = tableHeaders[i];
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (let i = 0; i < empresas.length; i++) {
      const bodyRow = document.createElement("tr");
      bodyRow.classList.add("body_row");
      bodyRow.insertCell().textContent = empresas[i].nomefantasia;
      bodyRow.insertCell().textContent = empresas[i].cnpj;
      bodyRow.insertCell().textContent = empresas[i].endereco;
      bodyRow.insertCell().textContent = empresas[i].email;
      bodyRow.insertCell().textContent = empresas[i].telefone;
      tbody.appendChild(bodyRow);
    }
    table.appendChild(tbody);
    root.appendChild(table);
  }
}

function renderizarTabelaProdutos(produtos, root) {
  if (produtos.length === 0) {
    const p = document.createElement("p");
    p.textContent = "Não há produtos cadastrados no momento";
    root.appendChild(p);
  } else {
    const table = document.createElement("table");
    table.setAttribute("id", "tabela_produtos");
    const thead = document.createElement("thead");
    thead.classList.add("tabela_header");
    const headerRow = document.createElement("tr");

    const tableHeaders = ["Código", "Tamanho", "Dimensões"];
    for (let i = 0; i < tableHeaders.length; i++) {
      const th = document.createElement("th");
      th.textContent = tableHeaders[i];
      headerRow.appendChild(th);
    }

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");

    for (let i = 0; i < produtos.length; i++) {
      const bodyRow = document.createElement("tr");
      bodyRow.classList.add("body_row");
      bodyRow.insertCell().textContent = produtos[i].codigo;
      bodyRow.insertCell().textContent = produtos[i].tamanho;
      bodyRow.insertCell().textContent = produtos[i].dimensoes;
      tbody.appendChild(bodyRow);
    }
    table.appendChild(tbody);
    root.appendChild(table);
  }

  document.querySelector;
}

function renderizarModalEditarClientes() {
  const dialog = document.createElement("dialog");
  dialog.id = "editar_clientes";
  dialog.classList.add("modal");
  const title = document.createElement("h1");
  title.id = "titulo";
  title.textContent = "Editar Cliente";
  dialog.appendChild(title);

  const form = document.createElement("form");

  const linha = document.createElement("div");
  linha.classList.add("formulario_linha");

  const campos = [
    ["Razão Social", "razaoSocial", "text"],
    ["Nome Fantasia", "nomFantasia", "text"],
    ["CNPJ", "cnpj", "text"],
    ["Telefone", "telefone", "text"],
    ["E-mail", "email", "email"],
    ["Endereço", "endereco", "text"],
    ["Senha", "password", "password"],
  ];

  for (let i = 0; i < campos.length; i++) {
    const campo = document.createElement("div");
    campo.classList.add("campo");
    const label = document.createElement("label");
    label.textContent = campos[i][0];
    label.htmlFor = campos[i][0];
    const input = document.createElement("input");
    input.type = campos[i][2];
    input.id = campos[i][1];
    campo.appendChild(label);
    campo.appendChild(input);
    linha.appendChild(campo);
  }

  form.appendChild(linha);

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");

  const btnData = [
    ["Salvar", "btn_primario"],
    ["Cancelar", "btn_terciario"],
    ["Excluir", "btn_quartenario"],
  ];

  for (let i = 0; i < btnData.length; i++) {
    const button = document.createElement("button");
    button.classList.add(btnData[i][1]);
    button.textContent = btnData[i][0];
    acoes.appendChild(button);
  }

  form.appendChild(acoes);
  dialog.appendChild(form);
  main.appendChild(dialog);
}

function renderizarModalEditarProdutos() {
  const dialog = document.createElement("dialog");
  dialog.id = "editar_produtos";
  dialog.classList.add("modal");
  const title = document.createElement("h1");
  title.id = "titulo";
  title.textContent = "Editar Produto";
  dialog.appendChild(title);

  const form = document.createElement("form");

  const linha = document.createElement("div");
  linha.classList.add("formulario_linha");

  const campos = [
    ["Código", "codigo", "text"],
    ["Nome", "nome", "text"],
    ["Dimensoes", "dimensoes", "text"],
  ];

  for (let i = 0; i < campos.length; i++) {
    const campo = document.createElement("div");
    campo.classList.add("campo");
    const label = document.createElement("label");
    label.textContent = campos[i][0];
    label.htmlFor = campos[i][0];
    const input = document.createElement("input");
    input.type = campos[i][2];
    input.id = campos[i][1];
    campo.appendChild(label);
    campo.appendChild(input);
    linha.appendChild(campo);
  }

  form.appendChild(linha);

  const acoes = document.createElement("div");
  acoes.classList.add("acoes");

  const btnData = [
    ["Salvar", "btn_primario"],
    ["Cancelar", "btn_terciario"],
    ["Excluir", "btn_quartenario"],
  ];

  for (let i = 0; i < btnData.length; i++) {
    const button = document.createElement("button");
    button.classList.add(btnData[i][1]);
    button.textContent = btnData[i][0];
    acoes.appendChild(button);
  }

  form.appendChild(acoes);
  dialog.appendChild(form);
  main.appendChild(dialog);
}
