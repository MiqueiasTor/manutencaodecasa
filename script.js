// ----------------- Barra de navegação -------------------- //

// Variáveis da barra: 
let loading = document.querySelector('.menu-sanduiche '); // Container do menu
let elemento = document.querySelectorAll('.bar'); // Barrinhas do sanduíche
let check = true; // Variável de verificação do evento para que assim, possa aplicar as funções
let time = 300; // tempo das animações
let conteudo = document.querySelector('.navbar ul'); // Elemento que contém o contaúdo que será apresentado ao iteragrir com o sanduíche

elemento.forEach((item) => item.style.transitionDuration = `${time}ms`); // Aplicando o tempo da animação á propriedade transitionDuration em cada elemento que contém a classe .bar

// Função responsável por retornar o tamanho do menu, segundo a quantidade de elementos presentes dentro dele.
function set_height() {
    let sum = 0;    
    document.querySelectorAll('.navbar ul li').forEach(
        (item) => {
            sum += (Number(window.getComputedStyle(item).height.slice(0, window.getComputedStyle(item).height.indexOf('px'))));
        }   
    )
    return sum + 'px';
}

// Função responsável por aplicar os efeitos:
let animationON = () => {

    elemento[0].style.top = `calc(((var(--size-menu) / 2) / 2) - ${window.getComputedStyle(elemento[0]).height} / 2)`;
    elemento[1].style.transform = 'scale(0)';
    elemento[2].style.bottom = `calc(((var(--size-menu) / 2) / 2) - ${window.getComputedStyle(elemento[0]).height} / 2)`;

    setTimeout(() => {
        elemento[0].style.transform = 'rotate(45deg)';
        setTimeout(() => {
            elemento[2].style.transform = 'rotate(135deg)';
        })
    }, time);

    check = false;
    elemento.forEach((item) => item.style.backgroundColor = 'red');

    conteudo.style.height = set_height();

}


// Função responsável por reiniciar os efeitos: 
let animationOFF = () => {

    elemento[0].style.transform = 'rotate(0deg)';
    elemento[2].style.transform = 'rotate(0deg)';

    setTimeout(() => {
        elemento[0].style.top = '0';
        elemento[1].style.transform = 'scale(1)';
        elemento[2].style.bottom = '0';
    }, time);

    check = true;
    elemento.forEach((item) => item.style.backgroundColor = '#fff');
    conteudo.style.height = '0px';

}

// Função que executa as funções de efeito(animationON e animationOFF), sendo executadas a depender das condições. 
let funcionalidades = () => {
    var largura = window.getComputedStyle(document.body).width; // Pegando a largura da tela
    var valor_largura = Number(largura.slice(0, largura.indexOf('px'))); // Formatando esse valor para "Number"

    loading.onclick = () => { // Evento de clique, junto a uma condição que tem o seu valor mudado a cada clique. Essa modificação é feita pelas funções de efeito, ou seja, variáveil de verificação

        if (check) {
            animationON(); // Ativando as animações
        } else {
            animationOFF(); // Reiniciando as animações
        }

    }

    (valor_largura > 460) && animationOFF(); // Curto circuito responsável por desativar os efeitos quando a tela é maior que 460px
}
funcionalidades() // Inicializando, garantido sempre a execução do código
window.onresize = funcionalidades; // Evento de redimencionamento

// ------------------- Animações de scroll ---------------------- //

let time_animate = .5; // Tempo de duração (utilizada apenas nos elementos de cabeçalho)
var target = document.querySelectorAll('[data-anime]'); // Elementos que contem o custom data attribute "data-anime"

// Função responsável por aplicar os efeitos
function scrollAnime() {
    const topDistance = window.pageYOffset; // Pegando à distância do topo da tela em relação ao topo da página
    target.forEach((item) => {  // forEach para aplicar os efeitos aos elementos da variável target

        item.style.transitionDelay = `${item.dataset.delay}s`;
        item.style.transitionDuration = `${item.dataset.duration}s`;
        
        DistanceItem = item.offsetTop; // Pegando a distância do elemento em relação ao topo da página

        ((topDistance + (window.innerHeight * .98)) >= DistanceItem) ? item.classList.add('animate') : item.classList.remove('animate'); // Caso a expressão (topDistance + calculo) for maior que DistanceItem, o operador ternário executa a expressão responsável por adicionar à classe "animate", se não, ela remove a classe "animate"
    });
}
scrollAnime(); // Inicializando, garantido sempre a execução do código
window.onscroll = scrollAnime; // Evento de rolagem


// ------------------- Animação de movimento de mouse ---------------- //

const cardContactHeader = document.querySelector('.c-card-contato');
const cardContactImg = document.querySelector('.c-contact .img');
const cardContactDesc = document.querySelector('.c-contact .desc');

window.onmousemove = () => {
    
    var movex = 100;
    var movey = 40;

    cardContactImg.style.transform = `translate3d(-${event.clientX/movex + 'px'}, ${event.clientY/movey + 'px'}, 0)`;
    cardContactDesc.style.transform =`translate3d(${event.clientX/movex + 'px'}, -${event.clientY/movey + 'px'}, 0)`;
    cardContactHeader.style.transform = `translate3d(${event.clientX/movex + 'px'}, -${event.clientY/movey + 'px'}, 0)`;

}

