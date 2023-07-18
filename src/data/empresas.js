//Recebe um array de empresas e insere um elemento nele
function create(empresas, empresa) {
  if (empresa) {
    empresas.push(empresa);
    return empresa;
  }
}

//Recebe um array de empresas e percorre o array até achar o elemento com o mesmo cnpj retornando o elemento;
function select(cnpj, empresas) {
  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].cnpj === cnpj) {
      return empresas[i];
    }
  }
}

//Recebe um array de empresas e percorre o array até achar o elemento com o mesmo cnpj atribuindo a esse elemento o valor de dados atualizados
function update(empresas, empresaAtualizada) {
  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].cnpj === empresaAtualizada.cnpj) {
      empresas[i].telefone = empresaAtualizada.telefone;
      empresas[i].email = empresaAtualizada.email;
      empresas[i].endereco = empresaAtualizada.endereco;
      empresas[i].senha = empresaAtualizada.senha;
    }
  }
}

//Recebe um array de empresas e percorre o array até achar o elemento com o mesmo cnpj removendo esse elemento do array
function remove(email, empresas) {
  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].cnpj === email) {
      empresas.splice(i, 1);
    }
  }
}

export { create, select, update, remove };
