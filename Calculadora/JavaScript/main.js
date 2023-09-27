//Trabalhando com o dom, primeiro selecionei os elementos conectando o HTML com o JavaScript
const operacaoAnteriorText = document.querySelector("#operacaoAnterior")
const operacaoAtualText = document.querySelector("#operacaoAtual")
const buttons = document.querySelectorAll("#botoes-container button")

//trabalhando com orientação a objetos LOGICA

class Calculadora {
    constructor(operacaoAnteriorText, operacaoAtualText) {
        this.operacaoAnteriorText = operacaoAnteriorText;
        this.operacaoAtualText = operacaoAtualText;
        this.operacaoAtual = "";
    }

    //primeira ação - inserindo números
    addDigit(digit) {
        // Check if number already has a dot
        if (digit === "." && this.operacaoAtualText.innerText.includes(".")) {
          return;
        }
    
        this.operacaoAtual = digit;
        this.atualizarTela();
      }

    //metodo para processar todas as operações da calculadora
     processoOperacao(operacao){
    //checar se a operação atual é vazio
    if(this.operacaoAtualText.innerText === "" && operacao !== "C"){
        //mudar a operação
        if(this.operacaoAnteriorText.innerText !== "") {
               this.mudarOperacao(operacao);
            }
            return;
        }

        
    //pegar o valor anterior e atual
        let valorOperacao;
        let valorAnterior = +this.operacaoAnteriorText.innerText.split(" ")[0];
        let valorAtual = +this.operacaoAtualText.innerText;

        switch(operacao){
         case "+":
            valorOperacao = valorAnterior + valorAtual;
            this.atualizarTela(valorOperacao, operacao, valorAtual, valorAnterior);
            break;
         case "-":
            valorOperacao = valorAnterior - valorAtual;
            this.atualizarTela(valorOperacao, operacao, valorAtual, valorAnterior);
            break;    
        case "*":
            valorOperacao = valorAnterior * valorAtual;
            this.atualizarTela(valorOperacao, operacao, valorAtual, valorAnterior);
            break;
         case "/":
            valorOperacao = valorAnterior / valorAtual;
            this.atualizarTela(valorOperacao, operacao, valorAtual, valorAnterior);
            break;
         
         case "DEL":
            this.operadorDel();
            break;
        case "CE":
            this.operadorCe();
            break;
        case "C":
            this.operadorC();
            break;
        case "=":
            this.operadorIgual();
            break;
        default:
            return;
        }
     }

    //mudando valores da tela da calculadora
    atualizarTela(
        valorOperacao = null, 
        operacao = null,
        valorAtual = null,
        valorAnterior = null, 
        
    ) {
        if(valorOperacao === null) {
            this.operacaoAtualText.innerText += this.operacaoAtual;
        } else {
            //Checar se o valor é zero, se for, agregar valor atual
            if(valorAnterior === 0){
                valorOperacao = valorAtual;
            }
            //Jogando o valor de baixo para cima
            this.operacaoAnteriorText.innerText = `${valorOperacao} ${operacao}`;
            this.operacaoAtualText.innerText = "";
        }
    }
    //mudando operações matemáticas
    mudarOperacao(operacao) {
    const operacoesMatematicas = ["*", "-", "+", "/"];
    
    if(!operacoesMatematicas.includes(operacao)) {
        return;
    }

    this.operacaoAnteriorText.innerText = 
        this.operacaoAnteriorText.innerText.slice(0, -1) + operacao;
    }

    //deletar um digito
    operadorDel() {
    this.operacaoAtualText.innerText = 
        this.operacaoAtualText.innerText.slice(0, -1);
    }

    //limpar a operação atual
    operadorCe() {
        this.operacaoAtualText.innerText = "";
    }

    //limpar toda a operação
    operadorC() {
        this.operacaoAtualText.innerText = "";
        this.operacaoAnteriorText.innerText = "";
    }

    operadorIgual() {
     let operacao = this.operacaoAnteriorText.innerText.split(" ")[1];
     this.processoOperacao(operacao);  
    }
}

const calc = new Calculadora(operacaoAnteriorText, operacaoAtualText);

//ativando os eventos dos botoes
buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        
        if(+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processoOperacao(value);
        }
    });
});









