import mostrarMensagem from "../data/alert.js";
import { create } from "../data/produtos.js";
import { sync, load } from "../data/locastorage.js";

export function cadastrarProduto(produto) {
  const produtos = sync("produtos");

  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].codigo === produto.codigo) {
      mostrarMensagem("erro", "Produto Já Cadastrado");
      return false;
    }
  }

  create(produtos, produto);
  load(produtos, "produtos");
  return true;
}
