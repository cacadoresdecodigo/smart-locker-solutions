import { update } from "../data/produtos.js";
import { load, sync } from "../data/locastorage.js";

export function atualizarProduto(dadosAtualizados) {
  const produtos = sync("produtos");

  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].codigo === dadosAtualizados.codigo) {
      update(produtos, dadosAtualizados);
    }
  }

  load(produtos, "produtos");
}
