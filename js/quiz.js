
const lista = perguntas.adicao;

let indiceAtual = 0;
let pontuacao = 0;

const progresso = document.getElementById("progresso");
const enunciado = document.getElementById("enunciado");
const alternativas = document.getElementById("alternativas");
const feedback = document.getElementById("feedback");
const botaoProximo = document.getElementById("proximo");
const resultado = document.getElementById("resultado");

function mostrarPergunta() {
    const pergunta = lista[indiceAtual];

    progresso.textContent =
        `Pergunta ${indiceAtual + 1} de ${lista.length}`;

    enunciado.textContent = pergunta.enunciado;
    alternativas.innerHTML = "";
    feedback.textContent = "";
    botaoProximo.hidden = true;
    resultado.hidden = true;

    pergunta.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");

        botao.textContent = alternativa;
        botao.type = "button";

        botao.addEventListener("click", () => {
            verificarResposta(indice);
        });

        alternativas.appendChild(botao);
    });
}

function verificarResposta(indiceEscolhido) {
    const pergunta = lista[indiceAtual];
    const botoes = alternativas.querySelectorAll("button");

    botoes.forEach((botao) => {
        botao.disabled = true;
    });

    if (indiceEscolhido === pergunta.respostaCorreta) {
        pontuacao++;
        feedback.textContent =
            `Muito bem! Resposta correta. ${pergunta.explicacao}`;
    } else {
        feedback.textContent =
            `Não foi dessa vez. ${pergunta.explicacao}`;
    }

    botaoProximo.hidden = false;

    if (indiceAtual === lista.length - 1) {
        botaoProximo.textContent = "Ver resultado";
    }
}

botaoProximo.addEventListener("click", () => {
    if (indiceAtual < lista.length - 1) {
        indiceAtual++;
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
});

function mostrarResultado() {
    progresso.hidden = true;
    enunciado.hidden = true;
    alternativas.hidden = true;
    feedback.hidden = true;
    botaoProximo.hidden = true;

    resultado.hidden = false;
    resultado.textContent =
        `Você acertou ${pontuacao} de ${lista.length} perguntas!`;
}

mostrarPergunta();
