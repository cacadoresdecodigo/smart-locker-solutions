const empresas = [
  {
    cnpj: "33.014.556/0001-96",
    razaosocial: "LOJAS AMERICANAS S.A.",
    endereco: "Rua Sacadura Cabral, 102",
    telefone: "11-12345-1235",
    email: "empresa01@empresas.com",
    senha: "1234567",
  },
  {
    cnpj: "60.701.190/0001-04",
    razaosocial: "ITAÚ UNIBANCO S.A.",
    endereco: "Praça Alfredo Egydio, 23",
    telefone: "11-12345-1236",
    email: "empresa02@empresas.com",
    senha: "1234567",
  },
  {
    cnpj: "01.438.784/0001-05",
    razaosocial: "LEROY MERLIN COMPANHIA BRASILEIRA",
    endereco: "Rua Pascoal Pais, 525",
    telefone: "11-12345-1237",
    email: "empresa03@empresas.com",
    senha: "1234567",
  },
];

const produtos = [
  {
    codigo: "101",
    tamanho: "Pequeno",
    dimensoes: "22x12x50",
  },
  {
    codigo: "102",
    tamanho: "Médio",
    dimensoes: "50x20x50",
  },
  {
    codigo: "103",
    tamanho: "Grande",
    dimensoes: "80x60x50",
  },
];

const admins = [
  {
    email: "admin@admin.com",
    senha: "123456",
  },
];

localStorage.setItem("empresas", JSON.stringify(empresas));
localStorage.setItem("produtos", JSON.stringify(produtos));
localStorage.setItem("admins", JSON.stringify(admins));

