import { sync } from "../../data/locastorage.js";

export function autenticar(credenciais, chave) {
  const local = sync(chave);

  for (let element of local) {
    if (
      element.email == credenciais.inputEmail &&
      element.senha == credenciais.inputSenha
    ) {
      return true;
    } else {
      return false;
    }
  }
}
