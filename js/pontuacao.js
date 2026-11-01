let pontos = Number(localStorage.getItem("pontos")) || 0;

function consultarPontos(){
    return pontos;
}

function adicionarPontos(valor){
    pontos += valor;

    localStorage.setItem("pontos", pontos);
}
