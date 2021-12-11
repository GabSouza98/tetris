//constants
const canvasWidth = 400;
const canvasHeight = 600;
const backgroundColor = 50;
const boxDim = 20;
const timer = 800;

const L = [ [1, 0, 0],            
            [1, 0, 0],
            [1, 1, 0] ];

const T = [ [0, 0, 0],            
            [0, 1, 0],
            [1, 1, 1] ];

const J = [ [0, 0, 1],            
            [0, 0, 1],
            [0, 1, 1] ];

const S = [ [0, 0, 0],            
            [0, 1, 1],
            [1, 1, 0] ];

const Z = [ [0, 0, 0],            
            [1, 1, 0],
            [0, 1, 1] ];

const V = [ [1, 1, 1],            
            [0, 1, 0],
            [0, 0, 0] ];

const O = [ [1, 1],            
            [1, 1] ];

const I = [ [1, 0, 0, 0],   
            [1, 0, 0, 0],       
            [1, 0, 0, 0],  
            [1, 0, 0, 0] ];   

let pieces = {
                L: L,
                J: J,
                T: T,
                S: S,
                Z: Z,
                O: O,
                I: I
              };              
          
              
//variables
let myBox;
let myPiece;
let speed = 5;
let pieceCount = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //myBox = new Box(canvasWidth / 2, 0, boxDim, { r: 150, g: 48, b: 95 });
  
  myPiece = new Piece(canvasWidth/2, 0, color = { r: 80, g: 150, b: 20 })
   
}

function draw() {
  background(backgroundColor);
  drawGrid();  
  myPiece.show();  
  //myPiece.update();  
}


function keyPressed() { 

  if (keyCode === UP_ARROW) {    
    myPiece.rotate();
  }

  if (keyCode === DOWN_ARROW) {
    myPiece.accelerate();
  }

  if (keyCode === LEFT_ARROW) {
    myPiece.move(-1);   
  }

  if (keyCode === RIGHT_ARROW) {
    myPiece.move(1);    
  }
}

class Box {
  constructor(x = 0, y = 0, boxDimension = 0, color = { r: 0, g: 0, b: 0 }) {
    this.x = x;
    this.y = y;
    this.boxDimension = boxDimension;
    this.color = color;
  }

  show() {
    let { r, g, b } = this.color;
    fill(r, g, b);
    rect(this.x, this.y, this.boxDimension, this.boxDimension);
  }
}

class Piece {
  constructor(x = 0, y = 0, color = { r: 0, g: 0, b: 0 }) {
    this.x = x;
    this.y = y;
    //shape é uma matriz de 1 e 0
    this.shape = this.generateRandomPiece();    
    this.color = color;  
    //boxes é uma matriz de objetos Box
    this.boxes = this.createBoxes();
    
  }

  generateRandomPiece() {
    let keys = Object.keys(pieces)
    let piece = keys[Math.floor(Math.random() * keys.length)]
    return pieces[piece];
  }

  createBoxes() {   
    let boxes = [];
    let lineArray = [];
    let { r, g, b } = this.color;
    fill(r, g, b);
    for(var i=0;i<this.shape.length;i++) {
      for(var j=0;j<this.shape.length;j++) {
        var existBox = this.shape[j][i];        
        lineArray.push(
          new Box(this.x + i*existBox*boxDim,
                  this.y + j*existBox*boxDim,
                  existBox*boxDim,
                  this.color)
        );         
      }      
      boxes.push(lineArray);
      lineArray=[];
    }
    return boxes;
  }

  show() {
    let { r, g, b } = this.color;
    fill(r, g, b);
    for(var i=0;i<this.boxes.length;i++) {
      for(var j=0;j<this.boxes.length;j++) {   
        this.boxes[i][j].show();
      }  
    }  
  }

  applyGravity() {
    for(var i=0;i<this.shape.length;i++) {
      for(var j=0;j<this.shape.length;j++) {
        this.boxes[i][j].y += boxDim;     
      } 
    }   
  }  

  rotate() {  
    this.boxes = this.boxes[0].map((line, index) => this.boxes.map(row => row[index]).reverse());
    console.log(this.boxes)
  }

  move() {
    //
  }

  accelerate() {
    //
  }

  update() {
   
    //VERIFICA SE CHEGOU NO CHÃO
    for(var i=0;i<this.shape.length;i++) {
      for(var j=0;j<this.shape.length;j++) {
        if(this.boxes[i][j].y >= (canvasHeight-boxDim) ){
          return;
        }   
      }             
    } 
      

    if(frameCount % speed == 0 ) {
      this.applyGravity();
    }
  }

}

function drawGrid() {
  //desenha linhas horizontais
  for (i = 0; i <= height; i = i + boxDim) {
    stroke(20);
    strokeWeight(0.5);
    line(0, i, width, i);
  }
  //desenha linhas verticais
  for (i = 0; i <= width; i = i + boxDim) {
    stroke(20);
    strokeWeight(0.5);
    line(i, 0, i, height);
  }
}
