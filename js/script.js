
const botoesDisciplina = document.querySelectorAll(
    "[data-disciplina]"
);

botoesDisciplina.forEach((botao) => {
    botao.addEventListener("click", () => {
        const disciplina = botao.dataset.disciplina;

        alert(
            `Você selecionou ${disciplina}. ` +
            "Os conteúdos serão disponibilizados nesta área."
        );
    });
});
