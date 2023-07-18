import { ehAdmin } from "../utils/ehAdmin.js";

export function autorizar() {
  const paginaAtual = window.location.href;
  const baseUrl = "http://127.0.0.1:5500/src/pages";

  let path = paginaAtual
    .slice(paginaAtual.lastIndexOf("/"))
    .replace(/\.html$/, "");

  console.log(path);

  const sessionData = localStorage.getItem("session");
  const session = JSON.parse(sessionData);

  if (!session) {
    const permissoes = ["/", "/cadastro", "/produtos", "/sobre", "/login"];
    if (!permissoes.includes(path)) {
      window.location.href = baseUrl + "/";
    }
  }

  if (session) {
    const admin = ehAdmin(session.email);

    if (admin) {
      const permissoes = ["/", "/cadastro", "/produtos", "/sobre", "/admin"];
      if (!permissoes.includes(path)) {
        window.location.href = baseUrl + "/";
      }

      return session;
    }

    if (!admin) {
      const permissoes = [
        "/",
        "/cadastro",
        "/produtos",
        "/sobre",
        "/editar-cadastro",
        "/escolher-produtos",
      ];
      if (!permissoes.includes(path)) {
        window.location.href = baseUrl + "/";
      }
      return session;
    }
  }
}
