console.log('[TeuzinYTBR] Flappy Bird');
console.log('Inscreva-se no canal :D https://www.youtube.com/TeuzinYTBR');

const som_HIT = new Audio();
som_HIT.src = './efeitos/hit.wav';

const sprites = new Image();
sprites.src = './img/sprites.png';

const canvas = document.querySelector('canvas');
const contexto = canvas.getContext('2d');

function fazColisao(flappyBird, chao) {
    const flappyBirdY = flappyBird.y + flappyBird.altura;
    const chaoY = chao.y;

    if(flappyBirdY >= chaoY) {
        return true;
    }

    return false;
}

function criaFlappyBird(){
    const flappyBird = {
    spriteX: 0,
    spriteY: 0,
    largura: 33,
    altura: 24,
    x: 10,
    y: 50,
    pulo: 4.6,
    pula(){
       console.log("devo pular") ;
       flappyBird.velocidade = -flappyBird.pulo;
    },
    gravidade: 0.25,
    velocidade: 0,
    atualiza() {
        if(fazColisao(flappyBird, chao)) {
            console.log("fez colisao");
            som_HIT.play();

            mudaParaTela(Telas.INICIO);
            return;
        }

        flappyBird.velocidade = flappyBird.velocidade + flappyBird.gravidade;
        //console.log(flappyBird.y);
        flappyBird.y = flappyBird.y + flappyBird.velocidade;
    },
    desenha() {
        contexto.drawImage(
            sprites,
            flappyBird.spriteX, flappyBird.spriteY,
            flappyBird.largura, flappyBird.altura, // tamanho do recorte do sprit
            flappyBird.x, flappyBird.y,
            flappyBird.largura, flappyBird.altura
        );
    }
}
return flappyBird;
};
// flappybird

// chao 
const chao = {
    spriteX: 0,
    spriteY: 610,
    largura: 224,
    altura: 112,
    x: 0,
    y: canvas.height - 112,
    desenha() {
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura, // tamanho do recorte do sprit
            chao.x, chao.y,
            chao.largura, chao.altura
        );
        contexto.drawImage(
            sprites,
            chao.spriteX, chao.spriteY,
            chao.largura, chao.altura, // tamanho do recorte do sprit
            (chao.x + chao.largura), chao.y,
            chao.largura, chao.altura
        );
    }
}

//background
const planoDeFundo = {
    spriteX: 390,
    spriteY: 0,
    largura: 275,
    altura: 204,
    x: 0,
    y: canvas.height - 204,
    desenha() {
        contexto.fillStyle = '#70c5ce';
        contexto.fillRect(0, 0, canvas.width, canvas.height)

        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte do sprit
            planoDeFundo.x, planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );
        contexto.drawImage(
            sprites,
            planoDeFundo.spriteX, planoDeFundo.spriteY,
            planoDeFundo.largura, planoDeFundo.altura, // tamanho do recorte do sprit
            (planoDeFundo.x + planoDeFundo.largura), planoDeFundo.y,
            planoDeFundo.largura, planoDeFundo.altura
        );
    }
}

/// mensagemGetReady
const mensagemGetReady = {
    sX: 134,
    sY: 0,
    w: 174,
    h: 152,
    x: (canvas.width / 2) - 174 / 2,
    y: 50,
    desenha() {
        contexto.drawImage(
            sprites,
            mensagemGetReady.sX, mensagemGetReady.sY,
            mensagemGetReady.w, mensagemGetReady.h,
            mensagemGetReady.x, mensagemGetReady.y,
            mensagemGetReady.w, mensagemGetReady.h,
        );
    }
}

//
//telas
//
const globais = {};
let telaAtiva = {};
function mudaParaTela(novaTela) {
    telaAtiva = novaTela;

    if(telaAtiva.inicializa){
        telaAtiva.inicializa();    
    }
}
const Telas = {
    INICIO: {
        inicializa() {
            globais.flappyBird = criaFlappyBird();
        },
        desenha() {
            
            planoDeFundo.desenha();
            globais.flappyBird.desenha();
            chao.desenha();
            mensagemGetReady.desenha();
        },
        click() {
            mudaParaTela(Telas.JOGO);
        },
        atualiza() {

        }
    }
};

Telas.JOGO = {

    desenha() {
        planoDeFundo.desenha();
        chao.desenha();
        globais.flappyBird.desenha();
    },
    click() {
        globais.flappyBird.pula();
    },
    atualiza() {
        globais.flappyBird.atualiza();
    }
};

function loop() {

    telaAtiva.desenha();
    telaAtiva.atualiza();

    requestAnimationFrame(loop);
}

window.addEventListener('click', function () {
    if (telaAtiva.click) {
        telaAtiva.click();
    }
});

mudaParaTela(Telas.INICIO);
loop();