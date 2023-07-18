import { sync, load } from "../../data/locastorage.js";
import { autorizar } from "../auth/autorizar.js";
import Select from "../components/Select.js";
import { renderizarTabelaClientes } from "./admin/clientes.js";
import { renderizarTabelaProdutos } from "./admin/produtos.js";

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
    renderizarTabelaClientes(root, empresas);
  }

  if (selected === "Produtos") {
    renderizarTabelaProdutos(root, produtos);
  }

  if (selected === "Sair") {
    localStorage.removeItem("session");
    window.location.href = baseUrl + "/";
  }
});

renderizarTabelaClientes(root, empresas);
