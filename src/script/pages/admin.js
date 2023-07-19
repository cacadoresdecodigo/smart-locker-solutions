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

const select = Select(
  ["Admin", "Clientes", "Produtos", "Sair"],
  (selected) => {
    if (selected === "Admin") {
      localStorage.setItem("selectedTab", "Admin");
      window.location.href = baseUrl + "/admin.html";
    }

    if (selected === "Clientes") {
      localStorage.setItem("selectedTab", "Clientes");
      window.location.href = baseUrl + "/admin.html";
    }

    if (selected === "Produtos") {
      localStorage.setItem("selectedTab", "Produtos");
      window.location.href = baseUrl + "/admin.html";
    }

    if (selected === "Sair") {
      localStorage.removeItem("session");
      localStorage.removeItem("selectedTab");
      window.location.href = baseUrl + "/";
    }
  },
  localStorage.getItem("selectedTab")
);

if (
  select.selectedOptions[0].value === "Admin" ||
  select.selectedOptions[0].value === "Clientes"
) {
  renderizarTabelaClientes(root, empresas);
} else {
  renderizarTabelaProdutos(root, produtos);
}
