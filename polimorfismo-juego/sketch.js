
const GRAVITY = 10;
const JUMP_HEIGHT = 9.0;
const GROUND_HEIGHT = 20; 

const WIDTH = 400;
const HEIGHT = 600;

var SCROLL_SPEED = 3;
let score = 0;

function setup() {
  createCanvas(WIDTH, HEIGHT);
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
    this.vely = lerp(this.vely, GRAVITY, 0.05);
    this.y = Math.max(this.size / 2, Math.min(this.y, HEIGHT - GROUND_HEIGHT - this.size / 2));
    
  }

  flap() {
    this.vely = -JUMP_HEIGHT;
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
  text("Score: " + score,20,50);
}


class Pipes {
  constructor(width, frequency, gap) {
    this.width = width;
    this.frequency = frequency;
    this.gap = gap;

    this.pipes_list = [
      { x: 500, height: getRndInteger(this.gap, HEIGHT - GROUND_HEIGHT - this.gap), scored: false },
      { x: 500 + this.width + this.frequency, height: getRndInteger(this.gap, HEIGHT - GROUND_HEIGHT - this.gap), scored: false }
    ];
  }

  update() {   
    for (var pipe of this.pipes_list) {
      pipe.x -= SCROLL_SPEED;
      if (pipe.x + this.width <= 0) {
        pipe.x = WIDTH;
        pipe.height = getRndInteger(this.gap, HEIGHT - GROUND_HEIGHT - this.gap - this.gap);
    score ++;
      }
        
    } 
    
  }

  drawPipes() {
    for (var pipe of this.pipes_list) {
      rect(pipe.x, 0, this.width, pipe.height);
      rect(pipe.x, HEIGHT - GROUND_HEIGHT, this.width, -HEIGHT + pipe.height + GROUND_HEIGHT + this.gap);
    }
  }

}

var bird = new Bird(WIDTH / 2, HEIGHT / 2, 30);
var pipes = new Pipes(60, 150, 130);


function draw() {
  background("#2595DA");

  rect(0, HEIGHT - GROUND_HEIGHT, WIDTH, HEIGHT);

  bird.draw();
  bird.update();
  bird.checkDeath(pipes);

  pipes.update();
  pipes.drawPipes();

  fill(255);
  displayScore();
  // SCROLL_SPEED += 0.01;
}



function mouseClicked() {
  bird.flap();
}
