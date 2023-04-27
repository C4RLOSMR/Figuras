
const GRAVEDAD = 10;
const ALTURA_SALTO = 9;
const ALTURA_SUELO = 20; 

const ANCHO = 400;
const ALTO = 600;

var VELOCIDAD = 3;
let PUNTAJE = 1;

function setup() {
  createCanvas(ANCHO, ALTO);
}

function getRndInteger(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;
}

class Bird {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vely = 0;
  }

  draw() {
    circle(this.x, this.y, this.size);
  }
  

  update() {
    this.y += this.vely;
    this.vely = lerp(this.vely, GRAVEDAD, 0.05);
    this.y = Math.max(this.size / 2, Math.min(this.y, ALTO - ALTURA_SUELO - this.size / 2));
    
  }

  flap() {
    this.vely = -ALTURA_SALTO;
  }

  checkDeath(pipes) {
    for (var pipe of pipes.pipes_list) {
      if (this.x + this.size / 2 > pipe.x && pipe.height && this.x - this.size / 2 < pipe.x + pipes.width) {
        if (this.y - this.size / 2 <= pipe.height || this.y + this.size / 2 >= pipe.height + pipes.gap) {
          window.location.reload();
        }
      }

    }
  }
}

function displayScore()
{
  fill(200);
  textSize(20);
  text("Puntaje: " + PUNTAJE,20,50);
}


class Pipes {
  constructor(width, frequency, gap) {
    this.width = width;
    this.frequency = frequency;
    this.gap = gap;

    this.pipes_list = [
      { x: 500, height: getRndInteger(this.gap, ALTO - ALTURA_SUELO - this.gap), scored: false },
      { x: 500 + this.width + this.frequency, height: getRndInteger(this.gap, ALTO - ALTURA_SUELO - this.gap), scored: false }
    ];
  }

  update() {   
    for (var pipe of this.pipes_list) {
      pipe.x -= VELOCIDAD;
      if (pipe.x + this.width <= 0) {
        pipe.x = ANCHO;
        pipe.height = getRndInteger(this.gap, ALTO - ALTURA_SUELO - this.gap - this.gap);
    PUNTAJE ++;
      }
        
    } 
    
  }

  drawPipes() {
    for (var pipe of this.pipes_list) {
      rect(pipe.x, 0, this.width, pipe.height);
      rect(pipe.x, ALTO - ALTURA_SUELO, this.width, -ALTO + pipe.height + ALTURA_SUELO + this.gap);
    }
  }

}

var bird = new Bird(ANCHO / 2, ALTO / 2, 30);
var pipes = new Pipes(60, 150, 130);


function draw() {
  background("#2595DA");

  rect(0, ALTO - ALTURA_SUELO, ANCHO, ALTO);

  bird.draw();
  bird.update();
  bird.checkDeath(pipes);

  pipes.update();
  pipes.drawPipes();


  displayScore();
 
}



function mouseClicked() {
  bird.flap();
}
