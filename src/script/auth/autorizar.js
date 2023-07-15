import { ehAdmin } from "../utils/ehAdmin.js";

export function autorizar() {
  const paginaAtual = window.location.href;

  let path = paginaAtual
    .slice(paginaAtual.lastIndexOf("/"))
    .replace(/\.html$/, "");

  const sessionData = localStorage.getItem("session");
  const session = JSON.parse(sessionData);

  if (!session) {
    const permissoes = ["/", "/cadastro", "/produtos", "/sobre", "/login"];
    if (permissoes.includes(path)) {
      console.log("tem permissão");
    } else {
      console.log("não tem permissão");
    }
  }

  if (session) {
    const admin = ehAdmin(session.email);
    if (admin) {
      const permissoes = ["/", "/cadastro", "/produtos", "/sobre", "/admin"];
      if (permissoes.includes(path)) {
        console.log("tem permissão");
      } else {
        console.log("não tem permissão");
      }
    }

    if (!admin) {
      const permissoes = [
        "/",
        "/cadastro",
        "/produtos",
        "/sobre",
        "/editar-cadastro",
        "escolher-produtos",
      ];
      if (permissoes.includes(path)) {
        console.log("tem permissão");
      } else {
        console.log("não tem permissão");
      }
    }
  }
}
