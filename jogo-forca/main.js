
let jogoAutomatico = true;
let jogarNovamente = true;
let tentativas = 6;
let listaDinamica = [];
let palavraSecretaCategoria;
let palavraSecretaSorteada;
let palavras = [];

carregaListaAutomatica(); // método para carregar a lista.

//funcao para criar palava uma palavra aleatória
    palavraSecreta();
    function palavraSecreta(){
        const palavra = parseInt(Math.random() * palavras.length)
        palavraSecretaSorteada = palavras[palavra].nome
        palavraSecretaCategoria = palavras[palavra].categoria
    };

    montarPalavraTela();
    function montarPalavraTela(){
        const categoria = document.getElementById("categoria");
        categoria.innerHTML = palavraSecretaCategoria

        const palavraTela = document.getElementById("palavra-secreta");
        palavraTela.innerHTML = "";

        for ( let i = 0; i < palavraSecretaSorteada.length; i++){
            if(listaDinamica[i] == undefined) {
                if (palavraSecretaSorteada[i] == " "){
                    listaDinamica[i]= " ";
                    palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'> " + listaDinamica[i] +"</div>"
                }else{
                    listaDinamica[i] = "&nbsp;" //codigo que gera um espaço no HTML
                palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'> " + listaDinamica[i] +"</div>"
                }
            }
            else {
                if (palavraSecretaSorteada[i] == " "){
                    listaDinamica[i]= " ";
                    palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letrasEspaco'> " + listaDinamica[i] +"</div>"
                }
                else{
                    palavraTela.innerHTML = palavraTela.innerHTML + "<div class='letras'> " + listaDinamica[i] +"</div>"
                }
            }
        }
    }

    function verificaLetraEscolhida(letra){
        document.getElementById("tecla-" + letra).disabled = true; //trava a letra que ja foi escolhida
        if(tentativas > 0){
            mudarStyleLetra("tecla-" + letra, false)
            comparaListas(letra);
            montarPalavraTela();
        }
    }

    function mudarStyleLetra(tecla, condicao){
        if ( condicao == false ){
        document.getElementById(tecla).style.background="#FF0000";
        document.getElementById(tecla).style.color="#ffffff";
        }else{
            document.getElementById(tecla).style.background="#00FA9A";
            document.getElementById(tecla).style.color="#ffffff";
        } 
    }

    function comparaListas(letra) {
        const posicao = palavraSecretaSorteada.indexOf(letra)
        if(posicao < 0){
            tentativas--
            carregaImagem();

            if(tentativas == 0 ){
                abreModal("Ops!", "Você não conseguiu.. A palavra secreta era <br>" + palavraSecretaSorteada);
                botaoJogarNovamente(true);
            }
        }
        else {
            mudarStyleLetra("tecla-" + letra, true)
            for(i = 0; i < palavraSecretaSorteada.length; i++){
                if (palavraSecretaSorteada[i] == letra){
                    listaDinamica[i] = letra;
                }
            }
        }

        let vitoria = true;
        for (i = 0; i < palavraSecretaSorteada.length; i++){
            if(palavraSecretaSorteada[i] != listaDinamica[i]){
                vitoria = false;
            }
        }

        if(vitoria == true){
            abreModal("PARABÉNS", "VOCÊ CONSEGUIU!!");
            tentativas = 0;
            botaoJogarNovamente(true);     
        }
}
    async function atraso(tempo){
    return new Promise(x => setTimeout(x,tempo));
}

    function carregaImagem(){
        switch(tentativas){
            case 5:
                document.getElementById("imagem").style.background = "url('./img/forca1.png')";
                break;
            case 4:
                document.getElementById("imagem").style.background = "url('./img/forca2.png')"
                break;
            case 3:
                document.getElementById("imagem").style.background = "url('./img/forca3.png')"
                break;
            case 2:
                document.getElementById("imagem").style.background = "url('./img/forca4.png')"
                break;
            case 1:
                document.getElementById("imagem").style.background = "url('./img/forca5.png')"
                break;
            case 0:
                document.getElementById("imagem").style.background = "url('./img/forca6.png')"
                break;
            default:
                document.getElementById("imagem").style.background = "url('./img/forca.png')"
                break;                
        }

    }

    function abreModal(titulo, mensagem, imagem){
        let modalTitulo = document.getElementById("exampleModalLabel");
        modalTitulo.innerText = titulo;
        
        let modalBody = document.getElementById("modalBody");
        modalBody.innerHTML = mensagem;
        $("#myModal").modal({
            show: true
        });
    }

    let btnReiniciar = document.querySelector("#btnReiniciar")
    btnReiniciar.addEventListener("click", function(){
        location.reload();
    })

    function listaAutomatica(){ //desativa o modo automático
        if (jogoAutomatico == true){
            document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-play'></i>"
            palavras = [];
            jogoAutomatico = false;
            
            document.getElementById("abreModalAddPalavra").style.display = "block";
            document.getElementById("status").innerHTML = "MODO MANUAL";
        }else if(jogoAutomatico == false){ //ativa o modo manual
            document.getElementById("jogarAutomatico").innerHTML = "<i class='bx bx-pause' ></i>"
            jogoAutomatico = true;
            document.getElementById("abreModalAddPalavra").style.display = "none";
            document.getElementById("status").innerHTML = "MODO AUTOMÁTICO";
        }
    }
    const modal = document.getElementById("modal-alerta");
    
    const btnAbreModal = document.getElementById("abreModalAddPalavra");
    btnAbreModal.onclick = function(){
        modal.style.display = "block";
    }

    const btnFechaModal = document.getElementById("fecharModal");
    btnFechaModal.onclick = function(){
        modal.style.display = "none";
        document.getElementById("addPalavra").value = ""; //na hora que clicar em fechar o campo vai ficar vazio
        document.getElementById("addCategoria").value = "";
    }


    window.onclick = function(){ // para quando clicar fora do modal, fechar a janela
        if(event.target == modal){
        modal.style.display = "none";
        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = "";
        }
        
    }

    function carregaListaAutomatica(){
         palavras = [
            palavra001= {
                nome: "EQUADOR",
                categoria: "LUGARES"
            },
            palavra002= {
                nome: "PARIS",
                categoria: "LUGARES"
            },
            palavra003= {
                nome: "SAO PAULO",
                categoria: "LUGARES"
            },
            palavra004= {
                nome: "TOQUIO",
                categoria: "LUGARES"
            },
            palavra005= {
                nome: "SALGUEIRO",
                categoria: "LUGARES"
            },
            palavra006= {
                nome: "MACHU PIICHU",
                categoria: "LUGARES"
            },
            palavra007= {
                nome: "MARANHAO",
                categoria: "LUGARES"
            },
            palavra008= {
                nome: "ROMA",
                categoria: "LUGARES"
            },
            palavra009= {
                nome: "BARCELONA",
                categoria: "LUGARES"
            },
            palavra010= {
                nome: "RECIFE",
                categoria: "LUGARES"
            },
            palavra011= {
                nome: "PIZZA",
                categoria: "COMIDAS"
            },
            palavra012= {
                nome: "SUSHI",
                categoria: "COMIDAS"
            },
            palavra013= {
                nome: "PASTEL",
                categoria: "COMIDAS"
            },
            palavra014= {
                nome: "SALADA",
                categoria: "COMIDAS"
            },
            palavra015={
                nome: "PASTA",
                categoria: "COMIDAS"
            },
            palavra016= {
                nome: "TACOS",
                categoria: "COMIDAS"
            },
            palavra017={
                nome: "COXINHA",
                categoria: "COMIDAS"
            },
            palavra018= {
                nome: "SORVETE",
                categoria: "COMIDAS"
            },
            palavra019={
                nome: "SOPA",
                categoria: "COMIDAS"
            },
            palavra020= {
                nome: "CHURRASCO",
                categoria: "COMIDAS"
            },
            palavra021= {
                nome: "NOVA YORK",
                categoria: "CIDADES"
            },
            palavra022={
                nome: "TOQUIO",
                categoria: "CIDADES"
            },
            palavra023= {
                nome: "PARIS",
                categoria: "CIDADES"
            },
            palavra024= {
                nome: "LONDRES",
                categoria: "CIDADES"
            },
            palavra025= {
                nome: "ROMA",
                categoria: "CIDADES"
            },
            palavra026={
                nome: "RIO DE JANEIRO",
                categoria: "CIDADES"
            },
            palavra027= {
                nome: "SYDNEY",
                categoria: "CIDADES"
            },
            palavra028= {
                nome: "BARCELONA",
                categoria: "CIDADES"
            },
            palavra029= {
                nome: "CIDADE DO MEXICO",
                categoria: "CIDADES"
            },
            palavra030= {
                nome: "CAIRO",
                categoria: "CIDADES"
            },
            palavra031= {
                nome: "MAÇA",
                categoria: "FRUTAS"
            },
            palavra032= {
                nome: "BANANA",
                categoria: "FRUTAS"
            },
            palavra033= {
                nome: "LARANJA",
                categoria: "FRUTAS"
            },
            palavra034= {
                nome: "UVA",
                categoria: "FRUTAS"
            },
            palavra035= {
                nome: "MORANGO",
                categoria: "FRUTAS"
            },
            palavra036= {
                nome: "ABACAXI",
                categoria: "FRUTAS"
            },
            palavra037= {
                nome: "MELANCIA",
                categoria: "FRUTAS"
            },
            palavra038= {
                nome: "PERA",
                categoria: "FRUTAS"
            },
            palavra039= {
                nome: "CEREJA",
                categoria: "FRUTAS"
            },
            palavra040= {
                nome: "LIMÃO",
                categoria: "Frutas"
            },
            palavra041= {
                nome: "MICKEY MOUSE",
                categoria: "DESENHO ANIMADO"
            },
            palavra042= {
                nome: "BOB ESPONJA",
                categoria: "DESENHO ANIMADO"
            },
            palavra043= {
                nome: "PERNALONGA",
                categoria: "DESENHO ANIMADO"
            },
            palavra044= {
                nome: "SCOOBY-DOO",
                categoria: "DESENHO ANIMADO"
            },
            palavra045= {
                nome: "TOM E JERRY",
                categoria: "DESENHO ANIMADO"
            },
            palavra046= {
                nome: "ASTERIX",
                categoria: "DESENHO ANIMADO"
            },
            palavra047= {
                nome: "PATETA",
                categoria: "DESENHO ANIMADO"
            },
            palavra048= {
                nome: "POPEYE",
                categoria: "DESENHO ANIMADO"
            },
            palavra049= {
                nome: "GOKU",
                categoria: "DESENHO ANIMADO"
            },
            palavra050= {
                nome: "PIKACHU",
                categoria: "Desenho Animado"
            } ]
    }

    function adcionarPalavra(){
        let addPalavra = document.getElementById("addPalavra").value.toUpperCase();
        let addCategoria = document.getElementById("addCategoria").value.toUpperCase();
        
        if(isNullOrWhiteSpace(addPalavra) || isNullOrWhiteSpace(addCategoria) || addPalavra.length < 3 || addCategoria < 3) {
            abreModal("DESCULPE 😭", "PALAVRA E/OU CATEGORIA INVÁLIDA! <br> Tente Novamente.");
            return;
        }

        let palavra = {
            nome: addPalavra,
            categoria: addCategoria 
        }

        palavras.push(palavra);
        
        sortear();

        document.getElementById("addPalavra").value = "";
        document.getElementById("addCategoria").value = "";
    }

    
    //validações
    //verificar textos em brancos e valores nulos
    function isNullOrWhiteSpace(input) {
        return !input || !input.trim()
    }

    function sortear(){
        if(jogoAutomatico == true){
            location.reload();
            console.log("automatico")
        }else{
            if(palavras.length > 0){
                listaDinamica = [];
                palavraSecreta();
                resetaTeclas();
                montarPalavraTela();
                tentativas = 6;
                piscarBotaoJogarNovamente(false);
            }
        }
    }

    function resetaTeclas(){
        let teclas = document.querySelectorAll(".teclas > button")

        teclas.forEach((x) => {
            x.style.background = "#fff";
            x.style.color = "#8b008b";
            x.disabled = false;
        });
    }
