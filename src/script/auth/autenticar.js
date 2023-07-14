import { sync } from "../../data/locastorage.js";

export function autenticar(credenciais, chave) {
  const local = sync(chave);
  console.log(credenciais);

  for (let i = 0; i < local.length; i++) {
    if (
      local[i].email === credenciais.inputEmail &&
      local[i].senha === credenciais.inputSenha
    ) {
      return true;
    } else {
      return false;
    }
  }
}
