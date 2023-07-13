import { sync, load, remove } from "../data/localStorage/empresas.js";

export function excluirEmpresa(cnpj) {
  const empresas = sync();

  let jaExiste = false;

  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].cnpj === cnpj) {
      jaExiste = true;
    }
  }

  if (!jaExiste) {
    alert("Usuario não existe");
    return;
  }

  remove(cnpj, empresas);
  load(empresas);
}
