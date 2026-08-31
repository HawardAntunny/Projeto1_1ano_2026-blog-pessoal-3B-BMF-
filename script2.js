// =====================================================
// INICIALIZAÇÃO
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

    prepararReacoes();
    prepararAnimacaoCards();
    criarBotaoTopo();

});


// =====================================================
// REAÇÕES DOS CARDS
// =====================================================

function prepararReacoes() {

    const artigos = document.querySelectorAll("article");

    artigos.forEach((artigo, indice) => {

        const botoes = artigo.querySelectorAll("button");

        if (botoes.length < 2) {
            return;
        }

        const botaoCoracao = botoes[0];
        const botaoCurtir = botoes[1];

        const contadorCoracao = botaoCoracao.querySelector("span");
        const contadorCurtir = botaoCurtir.querySelector("span");


        // ID ÚNICO PARA CADA CARD
        const idCard = `card-${indice + 1}`;


        // CHAVES DO LOCALSTORAGE
        const chaveCoracao = `${idCard}-coracao`;
        const chaveCurtir = `${idCard}-curtir`;

        const chaveUsuarioCoracao = `${idCard}-usuario-coracao`;
        const chaveUsuarioCurtir = `${idCard}-usuario-curtir`;


        // VALORES INICIAIS
        let totalCoracao =
            Number(localStorage.getItem(chaveCoracao)) || 0;

        let totalCurtir =
            Number(localStorage.getItem(chaveCurtir)) || 0;


        if (contadorCoracao) {
            contadorCoracao.textContent = totalCoracao;
        }

        if (contadorCurtir) {
            contadorCurtir.textContent = totalCurtir;
        }


        // VERIFICA SE JÁ REAGIU
        if (
            localStorage.getItem(chaveUsuarioCoracao) === "sim"
        ) {
            botaoCoracao.classList.add("selecionado");
        }

        if (
            localStorage.getItem(chaveUsuarioCurtir) === "sim"
        ) {
            botaoCurtir.classList.add("selecionado");
        }


        // =================================================
        // BOTÃO CORAÇÃO
        // =================================================

        botaoCoracao.addEventListener("click", () => {

            const jaReagiu =
                localStorage.getItem(
                    chaveUsuarioCoracao
                ) === "sim";


            if (jaReagiu) {

                totalCoracao =
                    Math.max(0, totalCoracao - 1);

                localStorage.setItem(
                    chaveUsuarioCoracao,
                    "nao"
                );

                botaoCoracao.classList.remove(
                    "selecionado"
                );

            } else {

                totalCoracao++;

                localStorage.setItem(
                    chaveUsuarioCoracao,
                    "sim"
                );

                botaoCoracao.classList.add(
                    "selecionado"
                );

            }


            localStorage.setItem(
                chaveCoracao,
                totalCoracao
            );

            if (contadorCoracao) {
                contadorCoracao.textContent =
                    totalCoracao;
            }

        });


        // =================================================
        // BOTÃO CURTIR
        // =================================================

        botaoCurtir.addEventListener("click", () => {

            const jaReagiu =
                localStorage.getItem(
                    chaveUsuarioCurtir
                ) === "sim";


            if (jaReagiu) {

                totalCurtir =
                    Math.max(0, totalCurtir - 1);

                localStorage.setItem(
                    chaveUsuarioCurtir,
                    "nao"
                );

                botaoCurtir.classList.remove(
                    "selecionado"
                );

            } else {

                totalCurtir++;

                localStorage.setItem(
                    chaveUsuarioCurtir,
                    "sim"
                );

                botaoCurtir.classList.add(
                    "selecionado"
                );

            }


            localStorage.setItem(
                chaveCurtir,
                totalCurtir
            );

            if (contadorCurtir) {
                contadorCurtir.textContent =
                    totalCurtir;
            }

        });

    });

}


// =====================================================
// ANIMAÇÃO DOS CARDS
// =====================================================

function prepararAnimacaoCards() {

    const artigos = document.querySelectorAll("article");

    if (!artigos.length) {
        return;
    }


    const observador =
        new IntersectionObserver(

            entradas => {

                entradas.forEach(
                    entrada => {

                        if (
                            entrada.isIntersecting
                        ) {

                            entrada.target.classList.add(
                                "visivel"
                            );

                            observador.unobserve(
                                entrada.target
                            );

                        }

                    }
                );

            },

            {
                threshold: 0.15
            }

        );


    artigos.forEach(artigo => {

        artigo.classList.add(
            "animar-card"
        );

        observador.observe(
            artigo
        );

    });

}


// =====================================================
// BOTÃO VOLTAR AO TOPO
// =====================================================

function criarBotaoTopo() {

    const botao =
        document.createElement("button");

    botao.id = "voltar-topo";

    botao.innerHTML = "↑";

    botao.title =
        "Voltar ao topo";

    botao.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );


    document.body.appendChild(botao);


    // MOSTRAR / ESCONDER
    window.addEventListener(
        "scroll",
        () => {

            if (
                window.scrollY > 300
            ) {

                botao.classList.add(
                    "mostrar"
                );

            } else {

                botao.classList.remove(
                    "mostrar"
                );

            }

        }
    );


    // SUBIR AO TOPO
    botao.addEventListener(
        "click",
        () => {

            window.scrollTo({

                top: 0,

                behavior: "smooth"

            });

        }
    );

}