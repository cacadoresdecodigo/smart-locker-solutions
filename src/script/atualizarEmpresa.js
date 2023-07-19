import { update } from "../data/empresas.js";
import { load, sync } from "../data/locastorage.js";

export function atualizarEmpresa(dadosAtualizados) {
  const empresas = sync("empresas");

  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].cnpj === dadosAtualizados.cnpj) {
      update(empresas, dadosAtualizados);
      load(empresas, "empresas");
      return true;
    }
  }
}
