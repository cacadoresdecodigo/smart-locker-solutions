import mostrarMensagem from "../data/alert.js";
import { create } from "../data/empresas.js";
import { sync, load } from "../data/locastorage.js";

export function cadastrarEmpresa(empresa) {
  const empresas = sync("empresas");

  let msgErro = "";

  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].email === empresa.email) {
      msgErro += "- Email já cadastrado!<br />";
    }
    if (empresas[i].cnpj === empresa.cnpj) {
      msgErro += "- CNPJ já cadastrado!";
    }
  }

  if (msgErro) {
    mostrarMensagem('erro', msgErro);
    return false;
  }

  create(empresas, empresa);
  load(empresas, "empresas");
  return true
}
