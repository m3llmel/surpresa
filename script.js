// ==========================================
// ELEMENTOS
// ==========================================

const pages = document.querySelectorAll(".page");

const btnComecar = document.getElementById("btnComecar");
const btnContinuar = document.getElementById("btnContinuar");

const musica = document.getElementById("musica");
const playPause = document.getElementById("playPause");

const fotos = document.querySelectorAll(".foto");
const dots = document.querySelectorAll(".dot");

const prev = document.getElementById("prev");
const next = document.getElementById("next");

const simBtn = document.getElementById("simBtn");
const naoBtn = document.getElementById("naoBtn");

const contador = document.getElementById("contador");

const chuva = document.getElementById("chuvaCoracoes");
const irCoracao = document.getElementById("irCoracao");

const heartButton = document.getElementById("heartButton");
const porcentagem = document.getElementById("porcentagem");
const progresso = document.getElementById("progresso");
const textoBarra = document.getElementById("textoBarra");

const carta = document.getElementById("carta");
const abrirCarta = document.getElementById("abrirCarta");

const voltarInicio = document.getElementById("voltarInicio");
// ==========================================
// TROCA DE PÁGINAS
// ==========================================

function abrirPagina(numero){

    pages.forEach(page=>{

        page.classList.remove("active");

    });

    document
    .getElementById("page"+numero)
    .classList.add("active");

}

// ==========================================
// BOTÃO COMEÇAR
// ==========================================

btnComecar.addEventListener("click", () => {

    abrirPagina(2);

    musica.play();

    tocando = true;

    playPause.innerHTML = "❚❚";

});

// ==========================================
// PLAYER
// ==========================================

let tocando = false;

playPause.addEventListener("click", () => {

    if (tocando) {

        musica.pause();

        playPause.innerHTML = "▶";

        tocando = false;

    } else {

        musica.play();

        playPause.innerHTML = "❚❚";

        tocando = true;

    }

});

// ==========================================
// CARROSSEL
// ==========================================

let fotoAtual=0;

function mostrarFoto(indice){

    fotos.forEach(f=>{

        f.classList.remove("ativa");

    });

    dots.forEach(d=>{

        d.classList.remove("active");

    });

    fotos[indice].classList.add("ativa");

    dots[indice].classList.add("active");

}

next.addEventListener("click",()=>{

    fotoAtual++;

    if(fotoAtual>=fotos.length){

        fotoAtual=0;

    }

    mostrarFoto(fotoAtual);

});

prev.addEventListener("click",()=>{

    fotoAtual--;

    if(fotoAtual<0){

        fotoAtual=fotos.length-1;

    }

    mostrarFoto(fotoAtual);

});


// ==========================================
// IR PARA O JOGO
// ==========================================

btnContinuar.addEventListener("click",()=>{

    abrirPagina(3);

    iniciarJogo();

});

// ==========================================
// VARIÁVEIS DO JOGO
// ==========================================

let tempo=15;

let jogoLiberado=false;

let intervalo;

let amor = 0;

// ==========================================
// CONTADOR
// ==========================================

function iniciarJogo(){

    tempo=15;

    jogoLiberado=false;

    contador.innerHTML=
    "😏";

    simBtn.style.left="30px";
    simBtn.style.top="90px";

    naoBtn.innerHTML="NÃO ✖";
    naoBtn.classList.remove("novoSim");
    virouSim = false;

    clearInterval(intervalo);

    intervalo=setInterval(()=>{

        tempo--;

        contador.innerHTML=
        "Responde... "+tempo+"s";

        if(tempo<=0){

            clearInterval(intervalo);

            jogoLiberado=true;

            contador.innerHTML=
            "Agora tenta clicar no NÃO 😏";

        }

    },1000);

}
// ==========================================
// BOTÃO SIM FUGINDO
// ==========================================

function moverBotao() {

    const area = document.querySelector(".buttons-area");

    const largura = area.clientWidth - simBtn.offsetWidth;
    const altura = area.clientHeight - simBtn.offsetHeight;

    const x = Math.random() * largura;
    const y = Math.random() * altura;

    simBtn.style.left = x + "px";
    simBtn.style.top = y + "px";

}

["mouseenter", "pointerenter", "touchstart"].forEach(evento => {

    simBtn.addEventListener(evento, moverBotao);

});

// ==========================================
// BOTÃO NÃO VIRANDO SIM
// ==========================================

let virouSim = false;

naoBtn.addEventListener("click", () => {

    if (!jogoLiberado) return;

    // Primeiro clique
    if (!virouSim) {

        virouSim = true;

        naoBtn.innerHTML = "SIM ❤️";
        naoBtn.classList.add("novoSim");

        contador.innerHTML = "Agora clica novamente ❤️";

        return;
    }

    // Segundo clique
    abrirPagina(4);
    criarChuva();

});

// ==========================================
// CHUVA DE CORAÇÕES
// ==========================================

function criarChuva() {

    chuva.innerHTML = "";

    for (let i = 0; i < 70; i++) {

        const coracao = document.createElement("div");

        coracao.classList.add("coracao");

        coracao.innerHTML = "❤️";

        coracao.style.left = Math.random() * 100 + "%";

        coracao.style.top = "-30px";

        coracao.style.animationDelay = (Math.random() * 5) + "s";

        coracao.style.animationDuration =
            (4 + Math.random() * 4) + "s";

        coracao.style.fontSize =
            (18 + Math.random() * 25) + "px";

        chuva.appendChild(coracao);

    }

}

// ==========================================
// IR PARA A PÁGINA DO CORAÇÃO
// ==========================================

irCoracao.addEventListener("click", () => {

    amor = 0;

    porcentagem.innerHTML = "0%";

    progresso.style.width = "0%";

    textoBarra.innerHTML = "Clique no coração ❤️";

    carta.classList.remove("subir");

    abrirPagina(5);

});

// ==========================================
// CORAÇÃO
// ==========================================

heartButton.addEventListener("click", () => {

    if (amor >= 100) return;

    amor++;
    const tamanho = 180 + amor * 1.2;

heartButton.style.width = tamanho + "px";
heartButton.style.height = tamanho + "px";

    porcentagem.innerHTML = amor + "%";

    progresso.style.width = amor + "%";

    heartButton.animate([
        { transform: "scale(1)" },
        { transform: "scale(1.2)" },
        { transform: "scale(1)" }
    ], {
        duration: 180
    });

    if (navigator.vibrate) {

        navigator.vibrate(20);

    }

    criarMiniCoracao();

    if (amor >= 100) {

        textoBarra.innerHTML = "Meu coração é completamente seu ❤️";

        setTimeout(() => {

            carta.classList.add("subir");

        }, 700);

    }

});

// ==========================================
// MINI CORAÇÕES
// ==========================================

function criarMiniCoracao() {

    const mini = document.createElement("div");

    mini.innerHTML = "❤️";

    mini.style.position = "fixed";
    mini.style.left = (window.innerWidth / 2 + (Math.random() * 120 - 60)) + "px";
    mini.style.top = (window.innerHeight / 2) + "px";

    mini.style.fontSize = (20 + Math.random() * 20) + "px";

    mini.style.pointerEvents = "none";

    mini.style.transition = "1s";

    document.body.appendChild(mini);

    setTimeout(() => {

        mini.style.top = (window.innerHeight / 2 - 220) + "px";

        mini.style.opacity = "0";

    }, 30);

    setTimeout(() => {

        mini.remove();

    }, 1000);

}

// ==========================================
// SUPORTE A GESTOS NO CARROSSEL
// ==========================================

let inicioX = 0;

const carousel = document.querySelector(".carousel-container");

carousel.addEventListener("touchstart", (e) => {

    inicioX = e.touches[0].clientX;

});

carousel.addEventListener("touchend", (e) => {

    const fimX = e.changedTouches[0].clientX;

    if (inicioX - fimX > 40) {

        next.click();

    }

    if (fimX - inicioX > 40) {

        prev.click();

    }

});

// ==========================================
// IMPEDIR ZOOM DUPLO TOQUE
// ==========================================

let ultimoToque = 0;

document.addEventListener("touchend", function (event) {

    const agora = new Date().getTime();

    if (agora - ultimoToque <= 300) {

        event.preventDefault();

    }

    ultimoToque = agora;

}, { passive: false });

// ==========================================
// ABRIR CARTA
// ==========================================

abrirCarta.addEventListener("click", () => {

    abrirPagina(6);

});
// ==========================================
// INICIAR PRIMEIRA FOTO
// ==========================================

// ==========================================
// VOLTAR AO INÍCIO
// ==========================================

voltarInicio.addEventListener("click", () => {

    // Volta para a primeira página
    abrirPagina(1);

    // Música
    musica.pause();
    musica.currentTime = 0;
    tocando = false;
    playPause.innerHTML = "▶";

    // Carrossel
    fotoAtual = 0;
    mostrarFoto(0);

    // Jogo
    clearInterval(intervalo);
    jogoLiberado = false;
    virouSim = false;

    naoBtn.innerHTML = "NÃO ✖";
    naoBtn.classList.remove("novoSim");

    contador.innerHTML = "Você tem 15 segundos para tentar clicar no SIM 😏";

    // Página do coração
    amor = 0;
    porcentagem.innerHTML = "0%";
    progresso.style.width = "0%";
    textoBarra.innerHTML = "Clique no coração ❤️";

    carta.classList.remove("subir");

    heartButton.style.width = "180px";
    heartButton.style.height = "180px";

    // Chuva de corações
    chuva.innerHTML = "";

});
mostrarFoto(0);