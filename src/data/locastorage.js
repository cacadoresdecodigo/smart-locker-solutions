// Retorna um array de empresas sincronizado com o local storage.
// Se não existir uma chave "empresas" no local storage retorna um aray vazio.
function sync(chave) {
  const dados = localStorage.getItem(chave);
  if (!dados) {
    return [];
  }
  const objeto = JSON.parse(dados);
  return objeto;
}

// Recebe um array de empresas e manda para o o local storage
function load(dados, chave) {
  const json = JSON.stringify(dados);
  localStorage.setItem(chave, json);
}

export { sync, load };
