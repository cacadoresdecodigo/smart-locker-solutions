function pegarDadosFormCadastro() {
  let razaoSocial = document.getElementById("inpt_razaosocial").value
  let nomeFantasia = document.getElementById("inpt_nomefantasia").value
  let cnpj = document.getElementById("inpt_cnpj").value
  let telefone = document.getElementById("inpt_telefone").value
  let email = document.getElementById("inpt_email").value
  let senha = document.getElementById("inpt_senha").value

  return {
      razaoSocial,
      nomeFantasia,
      cnpj,
      telefone,
      email,
      senha
  }
}

let empresas = localStorage.getItem("empresas");
 
if (!empresas) {
    empresas = [];
  } else {
    empresas = JSON.parse(empresas);
  }

function cadastrar() {
  const dadosEmpresa = pegarDadosFormCadastro()

  const inputsValues = Object.values(dadosEmpresa)
  
  for (let i = 0; i < inputsValues.length; i++) {
    if (inputsValues[i] === "") {
      alert("ERRO! Confira os dados digitados")
      return
    }
  }

  const jaExiste = empresas.find((empresa) => empresa.email === inputsValues[4])
  if (jaExiste) {
    alert("E-mail já cadastrado")
    return
  }

  empresas.push(dadosEmpresa)
  localStorage.setItem("empresas", JSON.stringify(empresas));
  window.location.href = "/src/pages/index/index.html"
}

