/*Controlando elementos da tela*/
let seuVotoPara = document.querySelector('.d-1-1 span');
let cargo = document.querySelector('.d-1-2 span');
let descricaoGeral = document.querySelector('.d-1-4');
let aviso = document.querySelector('.d-2');
let imagens = document.querySelector('.d-1-right');
let numeros = document.querySelector('.d-1-3');

let etapaAtual = 0;
let numero = '';
let Votobranco = false;
let votos = [];
const idAudio = '#som__urna';

function comecaEtapa(){

    let etapa = etapas[etapaAtual]

    let numeroHTML = '';
    numero = '';
    Votobranco = false;

    for (let i = 0; i < etapa.numeros; i++){
        if (i === 0){
            numeroHTML += '<div class="num pisca"></div>';
        } else {
        numeroHTML += '<div class="num"></div>';
        }
    }

    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descricaoGeral.innerHTML = '';
    aviso.style.display = 'none';
    imagens.innerHTML= '';
    numeros.innerHTML = numeroHTML;
}

/*Controlando botões*/

function clicou(n){
    let elNumero = document.querySelector('.num.pisca');
    if (elNumero !== null){
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca')
        if (elNumero.nextElementSibling){
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            atualizaInterface()
        }
    } 
}

function atualizaInterface(){
    let etapa = etapas[etapaAtual]
    let candidato = etapa.candidatos.filter((item) => {
        if(item.numero === numero){
            return true
        } else {
            return false
        }
    });
    if (candidato.length > 0){
        candidato = candidato[0];
        seuVotoPara.style.display = 'block';
        descricaoGeral.innerHTML += ` 
        Nome: ${candidato.nome}</br>
        Partido: ${candidato.partido}</br> `;
        aviso.style.display = 'block'

        let fotosHTML = '';
        for(let i in candidato.fotos){
            fotosHTML += `<div class="d-1-image"><img src="assets/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`
        }
        imagens.innerHTML += fotosHTML;
    } else {
        seuVotoPara.style.display = 'block';
        descricaoGeral.innerHTML = ` 
        <div class="aviso__grande pisca">VOTO NULO<div/>`;
        aviso.style.display = 'block'
    }
}

function branco(){
    if (numero === ''){
        Votobranco = true;
        seuVotoPara.style.display = 'block';
        numeros.innerHTML = '';
        descricaoGeral.innerHTML = ` 
        <div class="aviso__grande pisca">VOTO EM BRANCO<div/>`;
        aviso.style.display = 'block';
        imagens.innerHTML = '';
    } else {
        alert('Para votar em branco não digite nenhum número!')
    }
}
function corrige(){
    comecaEtapa();
}

function confirma(){
    let etapa = etapas[etapaAtual]
    let votoConfirmado = false;

    if (Votobranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
            }
        )
    } else if (etapa.numeros === numero.length){
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
            }
        )
    }
    if (votoConfirmado){
        etapaAtual++;
        if (etapas[etapaAtual] !== undefined){
            comecaEtapa();
        } else {
          document.querySelector('.tela').innerHTML='<div class="aviso__fim pisca">FIM<div/>'
          tocaSom(idAudio)
          console.log(votos);
        }
    }
}

/*Começando a etapa*/

comecaEtapa();

/*Som da Urna*/

function tocaSom (seletorAudio){
    const elemento = document.querySelector(seletorAudio);

    if (elemento && elemento.localName === 'audio'){
        elemento.play();
    } else {
        alert('Elemento não encontrado ou seletor inválido!');
    }
};
