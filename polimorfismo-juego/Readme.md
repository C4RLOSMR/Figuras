# **Videojuego estilo flappy bird**

<code style="color : aqua">function setup()
const GRAVEDAD = 10;
const ALTURA_SALTO = 9;
const ALTURA_SUELO = 20; 
const ANCHO = 400;
const ALTO = 600;
var VELOCIDAD = 3;
let PUNTAJE = 1;
</code>
(Este bloque de codigo es para declarar las variables.)
***

<code style="color : aqua">function setup()
  {
  createCanvas(ANCHO, ALTO);
}     
</code>
(Se crea el tamaño para el canvas del juego)
***

<code style="color : aqua">
function getRndInteger(min, max) {

  return Math.floor(Math.random() * (max - min)) + min;
}
  </code>
 ( Este bloque de codigo recibe 2 parametros min y max, con math.floor
  redondea el numero hacia abajo para devolver un entero.
  Aqui se genera el tamaño de las barras que se deben atravesar.)
  ***
  
  <code style="color : aqua">
class Bird {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.vely = 0;
  }
  </code>

(Dentro del constructor, se establecen cuatro propiedades del objeto Bird que se creará a partir de esta clase: this.x, this.y, this.size y this.vely. Estas propiedades se inicializan con los valores pasados como parámetros, con this.x, this.y y this.size establecidos en los valores pasados para x, y y size, respectivamente, y this.vely inicializado en 0.
Esta clase se utiliza para crear objetos Bird, que se utilizan en el juego.)

***

 <code style="color : aqua">
  draw() {
    circle(this.x, this.y, this.size);
  }
 </code>
(Se utiliza la función circle() para dibujar un círculo en la posición (this.x, this.y) con un diámetro igual a this.size. El uso de this en this.x, this.y y this.size)

***

  <code style="color : aqua">
  
  update() {
    this.y += this.vely;
    this.vely = lerp(this.vely, GRAVEDAD, 0.05);
    this.y = Math.max(this.size / 2, Math.min(this.y, ALTO - ALTURA_SUELO - this.size / 2));   
  }
 </code>
 (Este método se llama en cada cuadro de animación y se utiliza para actualizar la posición vertical del objeto Bird en función de su velocidad vertical.
  La función lerp() se utiliza para interpolar entre dos valores (en este caso, vely y GRAVEDAD) con un factor de interpolación determinado (en este caso, 0.05).
  La línea this.y = Math.max(this.size / 2, Math.min(this.y, ALTO - ALTURA_SUELO - this.size / 2)); asegura que la posición vertical de Bird no se salga de los límites del juego. Math.max() y Math.min() se utilizan para limitar la posición vertical de Bird a estar dentro del rango de this.size / 2 y ALTO - ALTURA_SUELO - this.size / 2.)
  
  ***
  
   <code style="color : aqua">
    flap() {
    this.vely = -ALTURA_SALTO;
  }
</code>
(La función flap() hace que el atributo vely del objeto Bird sea establecido a un valor negativo (-ALTURA_SALTO), lo que provoca que el objeto salte cuando se actualiza en la función update().)
***
<code style="color : aqua">
    checkDeath(pipes) {
    for (var pipe of pipes.pipes_list) {
      if (this.x + this.size / 2 > pipe.x && pipe.height && this.x - this.size / 2 < pipe.x + pipes.width) {
        if (this.y - this.size / 2 <= pipe.height || this.y + this.size / 2 >= pipe.height + pipes.gap) {
          window.location.reload();
        }  } } }}
</code>
(La función "checkDeath" recibe como parámetro un objeto "pipes". Luego, itera sobre la lista de pipes dentro de ese objeto, y verifica si la posición del pájaro (representado por el objeto "this") se superpone con la posición de algún pipe. Si el pájaro toca el pipe, se recarga la página web usando la función "window.location.reload()".)

***

<code style="color : aqua">
function displayScore()
{
  fill(200);
  textSize(20);
  text("Puntaje: " + PUNTAJE,20,50);
}
  </code>
  (La función displayScore() muestra el puntaje actual en la pantalla del juego. Primero, establece el color de relleno en gris claro y el tamaño de fuente en 20. Luego, muestra el texto "Puntaje: " seguido del valor de la variable PUNTAJE en la posición (20,50) de la pantalla.)
  
  ***
  
  <code style="color : aqua">
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
  </code>
  La línea de código define una clase llamada Pipes que tiene un constructor con tres parámetros (ancho, frecuencia y brecha). También inicializa una lista de tuberías con dos objetos que tienen propiedades como posición x, altura aleatoria y si ha sido puntuado o no.
 
 ***
 
 <code style="color : aqua">
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
  </code>
  (La línea de código actualiza la posición de cada tubería en la lista de tuberías y aumenta el puntaje en caso de que una tubería haya pasado el pájaro y se haya anotado un punto. Si una tubería ha pasado el borde izquierdo de la pantalla, la posición de la tubería se restablece en el lado derecho de la pantalla y se genera una nueva altura para la tubería.)
  
  ***
  
   <code style="color : aqua">
    drawPipes() {
    for (var pipe of this.pipes_list) {
      rect(pipe.x, 0, this.width, pipe.height);
      rect(pipe.x, ALTO - ALTURA_SUELO, this.width, -ALTO + pipe.height + ALTURA_SUELO + this.gap);
    }
  }

}
     </code>
  (La función drawPipes() dibuja los tubos del juego en la pantalla. Itera sobre los objetos pipe en la lista pipes_list y dibuja dos rectángulos para cada uno: uno desde la parte superior de la pantalla hasta la altura del tubo, y otro desde la parte inferior del tubo hasta el suelo.)
  
  ***
  
  <code style="color : aqua">
  var bird = new Bird(ANCHO / 2, ALTO / 2, 30);
var pipes = new Pipes(60, 150, 130);
</code>
  (En estas líneas de código se crean una instancia de la clase Bird y otra instancia de la clase Pipes, con ciertos parámetros iniciales. La instancia de la clase Bird se crea en la posición central de la pantalla con un tamaño de 30 píxeles, mientras que la instancia de la clase Pipes se crea con un ancho de 60 píxeles, una frecuencia de 150 píxeles y un hueco de 130 píxeles.)
  
  ***
  
   <code style="color : aqua">
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
     </code>
  (Este código define la función draw(), que se ejecuta repetidamente en un bucle, y se encarga de dibujar el fondo del juego, el pájaro, las tuberías, el puntaje y actualiza la posición del pájaro y de las tuberías en cada iteración del bucle. También comprueba si el pájaro ha chocado con alguna de las tuberías y muestra la puntuación actual.)
  
  ***
   <code style="color : aqua">
  function mouseClicked() {
  bird.flap();
}
 </code>
  (Esta función se ejecuta cada vez que el usuario hace clic en el lienzo del juego. En este caso, llama al método flap() del objeto bird, lo que hace que el circulo salte.)  
    
    ***
![](/Diagrama sin título.drawio.png)
