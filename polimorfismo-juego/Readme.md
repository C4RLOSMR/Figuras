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
  Este bloque de codigo recibe 2 parametros min y max, con math.floor
  redondea el numero hacia abajo para devolver un entero.
  Aqui se genera el tamaño de las barras que se deben atravesar.
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
Dentro del constructor, se establecen cuatro propiedades del objeto Bird que se creará a partir de esta clase: this.x, this.y, this.size y this.vely. Estas propiedades se inicializan con los valores pasados como parámetros, con this.x, this.y y this.size establecidos en los valores pasados para x, y y size, respectivamente, y this.vely inicializado en 0.
Esta clase se utiliza para crear objetos Bird, que se utilizan en el juego.
***
  



