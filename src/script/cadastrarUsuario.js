import { sync, load, create } from "../data/localStorage/empresas.js";

export function cadastrarEmpresa(empresa) {
  const empresas = sync();

  let msgErro = "";

  for (let i = 0; i < empresas.length; i++) {
    if (empresas[i].email === empresa.email) {
      msgErro += "Email já cadastrado!\n";
    }
    if (empresas[i].cnpj === empresa.cnpj) {
      msgErro += "Cnpj já cadastrado!\n";
    }
  }

  if (msgErro) {
    alert(msgErro);
    return;
  }

  create(empresas, empresa);
  load(empresas);
}
