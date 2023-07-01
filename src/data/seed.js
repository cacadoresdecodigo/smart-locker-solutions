const empresas = [
  {
    cnpj: "08.613.321/0001-73",
    nome: "FLORIPA SHOPPING CENTER",
    endereço: "ROD VIRGILIO VARZEA, 587, AREA 2",
  },
  {
    cnpj: "79.931.937/0001-30",
    nome: "BEIRAMAR EMPRESA DE SHOPPING CENTER LTDA",
    endereço: "RUA BOCAIUVA, 2468",
  },
  {
    cnpj: "09.477.652/0048-50",
    nome: "FORT ATACADISTA",
    endereço: "ROD FRANCISCO MAGNO VIEIRA, S/Nº 405",
  },
  {
    cnpj: "83.816.694/0001-67",
    nome: "CONDOMINIO SHOPPING CENTER ITAGUACU",
    endereço: "R GERONCIO THIEVES, 1079",
  },
];

localStorage.clear();
localStorage.setItem("empresas", JSON.stringify(empresas));
