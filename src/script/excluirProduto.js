import { remove } from "../data/produtos.js";

import { sync, load } from "../data/locastorage.js";

export function excluirProduto(codigo) {
  const produtos = sync("produtos");

  let jaExiste = false;

  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].codigo === codigo) {
      jaExiste = true;
    }
  }

  if (!jaExiste) {
    alert("Produto não existe");
    return;
  }

  remove(codigo, produtos);
  load(produtos, "produtos");
}
