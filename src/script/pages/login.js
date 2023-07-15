import mostrarMensagem from "../../data/alert.js";
import { load, sync } from "../../data/locastorage.js";
import { autenticar } from "../auth/autenticar.js";
import { pegarDadosForm } from "../pegarDadosForm.js";

let form = document.getElementById("form_login");

form.addEventListener("submit", (e) => {
  e.preventDefault();
 
  
  const credenciais = pegarDadosForm(form);

  if (ehAdmin(credenciais.inputEmail)) {
    const autenticado = autenticar(credenciais, "admins");
    if (autenticado) {
      load(
        {
          email: credenciais.inputEmail,
          tipo: "admin",
          timestamp: new Date(),
        },
        "session"
      );
      window.location.href = "./index.html";
    } else {
      mostrarMensagem("erro","E-mail ou Senha estão incorretos");
    }
  } else {
    const autenticado = autenticar(credenciais, "empresas");
    if (autenticado) {
      load(
        {
          email: credenciais.inputEmail,
          tipo: "empresa",
          timestamp: new Date(),
        },
        "session"
      );
      window.location.href = "./index.html";
    } else {
      mostrarMensagem("erro","E-mail ou Senha estão incorretos");
    }
  }
});

function ehAdmin(email) {
  const [parte1, parte2] = email.split("@");
  return parte2 === "admin.com" ? true : false;
}
