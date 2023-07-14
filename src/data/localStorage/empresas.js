/*
let Empresa = {
    cnpj: string
    nome: string
    endereço: string
}
*/

// Retorna um array de empresas sincronizado com o local storage.
// Se não existir uma chave "empresas" no local storage retorna um aray vazio.
function sync() {
  const dadosEmpresas = localStorage.getItem("empresas");
  if (!dadosEmpresas) {
    return [];
  }
  const empresas = JSON.parse(dadosEmpresas);
  return empresas;
}

// Recebe um array de empresas e manda para o o local storage
function load(empresas) {
  const dadosEmpresas = JSON.stringify(empresas);
  localStorage.setItem("empresas", dadosEmpresas);
}

//Recebe um array de empresas e insere um elemento nele
function create(empresas, empresa) {
  empresas.push(empresa);
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
      empresas[i] = empresaAtualizada;
    }
  }
}

//Recebe um array de empresas e percorre o array até achar o elemento com o mesmo cnpj removendo esse elemento do array
function remove(cnpj, empresas) {
  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].cnpj === cnpj) {
      empresas.splice(i, 1);
    }
  }
}

export { sync, load, create, select, update, remove };
