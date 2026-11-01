
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const conteudo = conteudos[id];

if (conteudo) {
    document.getElementById("titulo").textContent = conteudo.titulo;
    document.getElementById("descricao").textContent = conteudo.descricao;
    document.getElementById("exemplo").textContent = conteudo.exemplo;
    document.getElementById("explicacao").textContent = conteudo.explicacao;
} else {
    document.getElementById("titulo").textContent = "Conteúdo não encontrado";
    document.getElementById("descricao").textContent =
        "Volte para Matemática e escolha uma lição disponível.";
}
