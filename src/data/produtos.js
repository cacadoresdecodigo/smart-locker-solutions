function create(produtos, produto) {
  if (produto) {
    produtos.push(produto);
    return produto;
  }
}

function select(codigo, produtos) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].codigo === codigo) {
      return produtos[i];
    }
  }
}

function update(produtos, produtoAtualizado) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].codigo === produtoAtualizado.codigo) {
      produtos[i] = produtoAtualizado;
    }
  }
}

function remove(codigo, produtos) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].codigo === codigo) {
      produtos.splice(i, 1);
    }
  }
}

export { create, select, update, remove };
