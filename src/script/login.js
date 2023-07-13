import { sync } from "../data/localStorage/empresas.js";

let emailLogado = document.getElementById("inputEmail");
let senhaLogado = document.getElementById("inputSenha");


let empresas = sync()

let botaoSubmit = document.getElementById("submit_botao");

botaoSubmit.addEventListener("submit", Logar()=> {

        for(i=0; i < empresas.length; i++){

        if(emailLogado.value == empresas[i].email && senhaLogado.value == empresas[i].senha){

            let userLogado = emailLogado.value
            localStorage.setItem('userLogado', JSON.stringify(empresas))
            window.location.href = "./index.html"
        }
        
    }

})


 