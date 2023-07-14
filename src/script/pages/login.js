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
    } else {
      alert("E-mail ou Senha estão incorretos");
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
    } else {
      alert("E-mail ou Senha estão incorretos");
    }
  }

  //   for (let i = 0; i < empresas.length; i++) {
  //     if (
  //       emailLogado.value == empresas[i].email &&
  //       senhaLogado.value == empresas[i].senha
  //     ) {
  //       let userLogado = emailLogado.value;
  //       localStorage.setItem("userLogado", JSON.stringify(userLogado));
  //       console.log(userLogado, JSON.parse(localStorage.getItem("userLogado")));
  //       window.location.href = "./index.html";
  //     }
  //   }
});

function ehAdmin(email) {
  const [parte1, parte2] = email.split("@");
  return parte2 === "admin.com" ? true : false;
}
