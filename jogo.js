
let altura = 0
let largura = 0
var vidas = 1
let pontos = 0
let tempo
let criaAlvoTempo 

//Recuperando o nível selecionado
let nivel = window.location.search
nivel = nivel.replace("?", "")

//Ajustando o tempo e velocidade de acordo com o nivel
if(nivel === "normal"){
    tempo = 35
    criaAlvoTempo = 1000

}
if(nivel === "dificil"){
    tempo = 35
    criaAlvoTempo = 800

}
if(nivel === "kaua"){
    tempo = 50
    criaAlvoTempo = 700

}

//Fazendo com que o jogo já comece com o tempo predefinido
document.getElementById("cronometro").innerHTML = tempo

let cronometro = setInterval(function() {
    tempo--
    if(tempo < 0){
        clearInterval(cronometro)
        clearInterval(criaAlvo)
        window.location.href = "vitoria.html"
    }else{
        document.getElementById("cronometro").innerHTML = tempo
    }
    
}, 1000)

//Criando o texto dos pontos
document.getElementById("pontuacao").textContent = "Pontuação: " + pontos

//Criando uma função para saber a alteração de largura e altura de forma responsiva
function ajustarTamanhoTela() {
    altura = window.innerHeight
    largura = window.innerWidth
    
}

ajustarTamanhoTela()


//função de criação e movimentação do alvo
function posicaoAleatorioAlvo() {

    //Removendo o alvo anterior (caso ele exista)
    if(document.getElementById("alvo")){
        document.getElementById("alvo").remove()

         
        if(vidas === 3){
            document.getElementById("v" + vidas).remove()
            window.location.href = "game_over.html"
        }else{
            document.getElementById("v" + vidas).remove()
            vidas++
        }

    }
    

    //Criando as posições de forma aleatória
    let posicaoX = Math.floor(Math.random() * largura) - 100
    let posicaoY = Math.floor(Math.random() * altura) - 100

    //Corrigindo chance das posições serem negativas
    posicaoX = posicaoX < 0 ? 0 : posicaoX
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    //Criando o nosso elemento que vai se movimentar
    var alvo = document.createElement("img")
    alvo.src = imagemAleatoriaAlvo()
    alvo.className = tamanhoAleatorioAlvo() + " " + ladoAleatorioAlvo()
    alvo.style.left = posicaoX + "px"
    alvo.style.top = posicaoY + "px"
    alvo.style.position = "absolute"
    alvo.id = "alvo"
    alvo.onclick = function() {
        this.remove()
        pontos++
        document.getElementById("pontuacao").textContent = "Pontuação: " + pontos
    }

    document.body.appendChild(alvo)

}

//função para alterar a imagem do alvo
function imagemAleatoriaAlvo() {
    let imagem = Math.round(Math.random() * 5)

    switch(imagem){
        case 0:
            return "imagens/Minion_Caster_Blue.jpg"
        
        case 1:
            return "imagens/Minion_Melee_Blue.jpg"

        case 2:
            return "imagens/Minion_Melee_Red.png"

        case 3:
            return "imagens/Minion_Siege_Blue.png"

        case 4:
            return "imagens/Minion_Caster_red.png"

        case 5:
            return "imagens/Minions_Siege_Red.png"
    }
}

//função para alterar o tamanho o alvo
function tamanhoAleatorioAlvo() {
    let classe = Math.round(Math.random() * 2)
    
    switch(classe){
        case 0:
            return "alvo1"
        
        case 1:
            return "alvo2"

        case 2:
            return "alvo3"
    }
}

//função para alterar o lado do alvo
function ladoAleatorioAlvo() {
    let classe = Math.round(Math.random())
    
    switch(classe){
        case 0:
            return "ladoA"
        
        case 1:
            return "ladoB"
    }
}

let criaAlvo = setInterval(function() {
    posicaoAleatorioAlvo()
}, criaAlvoTempo)


