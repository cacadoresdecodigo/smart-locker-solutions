function sync() {
  const dadosProdutos = localStorage.getItem("produtos");
  if (!dadosProdutos) {
    return [];
  }
  const produtos = JSON.parse(dadosProdutos);
  return produtos;
}

function load(produtos) {
  const dadosProdutos = JSON.stringify(produtos);
  localStorage.setItem("produtos", dadosProdutos);
}

function create(produtos, produto) {
  produtos.push(produto);
}

function select(cod, produtos) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].cod === cod) {
      return produtos[i];
    }
  }
}

function update(produtos, produtoAtualizado) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].cod === produtoAtualizado.cod) {
      produtos[i] = produtoAtualizado;
    }
  }
}

function remove(cod, produtos) {
  for (let i = 0; i < produtos.length; i++) {
    if (produtos[i].cod === cod) {
      produtos.splice(index, 1);
    }
  }
}

export { sync, load, create, select, update, remove };
