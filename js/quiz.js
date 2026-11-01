
// Identifica o conteúdo selecionado na URL
const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

// Banco de perguntas


// Seleciona as perguntas do conteúdo
const lista = perguntas[id];

if (!lista || lista.length === 0) {
    document.getElementById("enunciado").textContent =
        "Nenhuma pergunta cadastrada para este conteúdo.";

    document.getElementById("alternativas").innerHTML = "";

    throw new Error("Questionário não encontrado: " + id);
}

let indiceAtual = 0;
let pontuacao = 0;
let respondida = false;

const progresso = document.getElementById("progresso");
const enunciado = document.getElementById("enunciado");
const alternativas = document.getElementById("alternativas");
const feedback = document.getElementById("feedback");
const botaoProximo = document.getElementById("proximo");
const resultado = document.getElementById("resultado");

function mostrarPergunta() {
    const pergunta = lista[indiceAtual];
    respondida = false;

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
    if (respondida){
        return
    };

    respondida = true;

    const pergunta = lista[indiceAtual];
    const botoes = alternativas.querySelectorAll("button");

    botoes.forEach((botao) => {
        botao.disabled = true;
    });

    

    if (indiceEscolhido === pergunta.respostaCorreta) {
        pontuacao++;
        adicionarPontos(10);

        feedback.textContent =
            `Muito bem! Resposta correta. ${pergunta.explicacao}`;
    } else {
        feedback.textContent =
            `Não foi dessa vez. ${pergunta.explicacao}`;
    }

    botaoProximo.hidden = false;

    if (indiceAtual === lista.length - 1) {
        botaoProximo.textContent = "Ver resultado";
    } else {
        botaoProximo.textContent = "Próxima pergunta";
    }
}

botaoProximo.addEventListener("click", () => {
    if (!respondida) {
        return;
    }

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

    const percentual = Math.round(
        (pontuacao / lista.length) * 100
    );

    document.getElementById("pontuacao-final").textContent =
        `Você acertou ${pontuacao} de ${lista.length} perguntas!`;

    document.getElementById("porcentagem").textContent =
        `Seu desempenho: ${percentual}%`;

    let mensagem;

    if (percentual === 100) {
        mensagem = "Excelente! Você acertou todas as perguntas!";
    } else if (percentual >= 60) {
        mensagem = "Muito bem! Continue praticando!";
    } else {
        mensagem = "Continue estudando! Você pode tentar novamente.";
    }

    document.getElementById("mensagem-resultado").textContent =
        mensagem;
}

document.getElementById("tentar-novamente")
    .addEventListener("click", () => {
        indiceAtual = 0;
        pontuacao = 0;

        progresso.hidden = false;
        enunciado.hidden = false;
        alternativas.hidden = false;
        feedback.hidden = false;

        mostrarPergunta();
});
mostrarPergunta();

