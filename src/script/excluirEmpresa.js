import { remove } from "../data/empresas.js";

import { sync, load } from "../data/locastorage.js";

export function excluirEmpresa(cnpj) {
  const empresas = sync("empresas");

  let jaExiste = false;

  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].cnpj === cnpj) {
      jaExiste = true;
    }
  }

  if (!jaExiste) {
    alert("Usuario não existe");
    return false;
  }

  remove(cnpj, empresas);
  load(empresas, "empresas");
  return true;
}
