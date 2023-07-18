const empresas = [
  {
    cnpj: "12123456/0001-12",
    razaosocial: "Empresa 01",
    endereco: "Rua 1",
    telefone: "11-12345-1235",
    email: "empresa01@empresas.com",
    senha: "1234567",
  },
  {
    cnpj: "12123456/0001-13",
    razaosocial: "Empresa 02",
    endereco: "Rua 2",
    telefone: "11-12345-1236",
    email: "empresa02@empresas.com",
    senha: "1234567",
  },
  {
    cnpj: "12123456/0001-14",
    razaosocial: "Empresa 03",
    endereco: "Rua 3",
    telefone: "11-12345-1237",
    email: "empresa03@empresas.com",
    senha: "1234567",
  },
];

const produtos = [
  {
    codigo: "1",
    tamanho: "Pequeno",
    dimensoes: "22x12x50",
  },
  {
    codigo: "2",
    tamanho: "Médio",
    dimensoes: "50x20x50",
  },
  {
    codigo: "3",
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

