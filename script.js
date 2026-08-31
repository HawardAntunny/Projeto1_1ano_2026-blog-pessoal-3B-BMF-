document.addEventListener("DOMContentLoaded", () =>{
    prepararReacoes();
    prepararAnimacaoCards();
    criarBotaoTopo();
})


function prepararReacoes() {
    const artigos = document.querySelectorAll("article");

    artigos.forEach((artigo, indice) => {

        const botoes = artigo.querySelectorAll("button");

        if (botoes.lenght < 2) {
            return;
        }

        const botaoUM = botoes[0];
        const botaoDOIS = botoes[1];

        const contadorBotaoUM = botaoUM.querySelector("span");
        const contadorBotaoDOIS = botaoDOIS.querySelector("span");

        const idCard = `card-${indice + 1}`;

        const chaveBotaoUM = `${idCard}-botaoUM`;
        const chaveBotaoDOIS = `${idCard}-botaoDOIS`;

        let UM  = Number(localStorage.getItem(chaveBotaoUM)) || 0;
        let DOIS  = Number(localStorage.getItem(chaveBotaoDOIS)) || 0;
        
        contadorBotaoUM.textContent = UM;
        contadorBotaoDOIS.textContent = DOIS;

        botaoUM.addEventListener("click", () =>{
            UM++;
            contadorBotaoUM.textContent = UM;

            localStorage.setItem(
                chaveBotaoUM, UM
            );
        });

        botaoDOIS.addEventListener("click", () =>{
            DOIS++;
            contadorBotaoDOIS.textContent = DOIS;

            localStorage.setItem(
                chaveBotaoDOIS, DOIS
            );
        });

        })

}
