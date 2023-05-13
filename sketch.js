
// variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 20;
let raio = diametro /2;


//as coordenadas são contadas do canto superior direito.
//variavel da colisão
let bateu = false

// variaveis da velocidade 
let vxBolinha = 5
let vyBolinha = 5;

//variaveis da raquete
let xRaquete = 10;
let yRaquete = 160;
let comprimentoRaquete = 10;
let alturaRaquete = 80;

// variaveis da raquete do oponente
let xRaqueteOponente = 580;
let yRaqueteOponente = 160;
let vRaqueteOponente;

// variaveis do placar
let meusPontos =0 ;
let pontosOponente =0 ;

// sons do jogo
let raquetada;
let magic;
let trilha;
function preload(){
  trilha = loadSound ("Trilhadomar.mp3");
  magic = loadSound ("moeda.mp3");
  raquetada = loadSound ("buzina.mp3")
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrabolinha();
  movebolinha();
  verificacolisao();
  raquete(xRaquete,yRaquete);
  moveRaquete();
  // colisaominharaquete();
  colideRaqueteBiblioteca (xRaquete, yRaquete);
  raquete(xRaqueteOponente,yRaqueteOponente);
   moveRaqueteOponente ();
  colideRaqueteBiblioteca (xRaqueteOponente, yRaqueteOponente);
  Placar();
  ponto();
  finalDeJogo();
  bolinhaNaoFicaPresa(); 
}

function mostrabolinha() {
  let c = color('#0f0');
  fill(c);
  circle (xBolinha, yBolinha, diametro); 
  }

function movebolinha(){
  xBolinha += vxBolinha
  // += é a mesma coisa que xBolinha=xBolinha+vxBolinha
  yBolinha += vyBolinha 
}

function verificacolisao(){
  //fazendo a bolinha retornar ao reconhecer a borda do cenario
  if (xBolinha + raio >width || xBolinha -raio  <0 ){
    vxBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha -raio  <0 ){
    vyBolinha *= -1
  } 
}

function raquete(x,y){
  let d = color('red')
  fill(d)
  rect(x, y, comprimentoRaquete, alturaRaquete);
}

function moveRaquete (){
  
 if (keyIsDown(83)|| keyIsDown(DOWN_ARROW)) {
      yRaquete = yRaquete + 10 
  }
 
  if (keyIsDown(87) || keyIsDown(UP_ARROW)) {
   yRaquete -= 10 
  }
}
function colisaominharaquete (){
  if (xBolinha - raio < xRaquete + comprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    vxBolinha *= -1
  } 
}

function colideRaqueteBiblioteca (x, y){
 bateu = collideRectCircle(x, y, comprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if (bateu) {
  vxBolinha *= -1;
  raquetada.play(); 
  }
}

function moveRaqueteOponente (){
  vRaqueteOponente = yBolinha - yRaqueteOponente - alturaRaquete/2 
   yRaqueteOponente += vRaqueteOponente
}
function Placar(){
  fill (color(25,25,112));
  rect (130, 5, 40, 30);
  rect (430, 5, 40, 30);
  textSize (20)
  fill (242);
  textAlign(CENTER);
  text (meusPontos, 150,28);
  text (pontosOponente, 450, 28) ;
  
        
  }
function ponto(){
  if (xBolinha > 600-raio)  { 
    meusPontos += 1;
    magic.play();
  }
  if (xBolinha <raio) {
    pontosOponente += 1;
     magic.play();
  }
}
function finalDeJogo(){
  if (meusPontos >= 10) {
     xBolinha = 300;
     yBolinha = 200;
     vxBolinha=0;
     vyBolinha=0;
    textSize (100);
    text ("YOU WIN",300,200);
    textSize (15);
    text ("Aperte espaço para um novo jogo", 300, 250)
  }  
  if (pontosOponente >= 10) {
     xBolinha = 300;
     yBolinha = 200;
     vxBolinha=0;
     vyBolinha=0;
    textSize (90);
    text ("GAME OVER",300,200)
    textSize (15);
    text ("Aperte espaço para um novo jogo", 300, 250)
  }
    if (keyIsDown (32)) {
    vxBolinha = 5;
    vyBolinha = 5;
    meusPontos= 0;
    pontosOponente = 0;
  }
}
function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}