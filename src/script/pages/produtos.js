import { autorizar } from "../auth/autorizar.js";
import Select from "../components/Select.js";

const baseUrl = "http://127.0.0.1:5500/src/pages";
const section = autorizar();
console.log(section);

if (section) {
  const loginBtn = document.getElementById("btn_login");
  loginBtn.hidden = true;

  if (section.tipo === "empresa") {
    Select(
      [
        `${section.email.split("@")[0]}`,
        "Editar Cadastro",
        "Escolher Locker",
        "Sair",
      ],
      (selected) => {
        if (selected === "Editar Cadastro") {
          window.location.href = baseUrl + "/editar-cadastro.html";
        }
        if (selected === "Escolher Locker") {
          window.location.href = baseUrl + "/escolher-produtos.html";
        }
        if (selected === "Sair") {
          localStorage.removeItem("session");
          window.location.href = baseUrl + "/";
        }
      }
    );
  } else {
    Select(["Admin", "Clientes", "Produtos", "Sair"], (selected) => {
      if (selected === "Sair") {
        localStorage.removeItem("session");
        window.location.href = baseUrl + "/";
      }
      window.location.href = baseUrl + "/admin.html";
    });
  }
}
