//constants
const canvasWidth = 400;
const canvasHeight = 600;
const backgroundColor = 50;
const boxDim = 20;
const timer = 800;

const L = [ [0, 0, 0],            
            [1, 0, 0],
            [1, 1, 1] ];

const T = [ [0, 0, 0],            
            [0, 1, 0],
            [1, 1, 1] ];

const J = [ [0, 0, 0],            
            [0, 0, 1],
            [1, 1, 1] ];

//variables
let myBox;
let myPiece;
let speed = 10;
let pieceCount = 0;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  //myBox = new Box(canvasWidth / 2, 0, boxDim, { r: 150, g: 48, b: 95 });
  
  myPiece = new Piece(canvasWidth/2, 0, T, color = { r: 80, g: 150, b: 20 })
   
}

function draw() {
  background(backgroundColor);
  drawGrid();  
  myPiece.show();  
  myPiece.update();  
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
  constructor(x = 0, y = 0, shape, color = { r: 0, g: 0, b: 0 }) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.color = color;  
    this.boxes = this.createBoxes();
  }

  createBoxes() {
    let boxes = []
    let { r, g, b } = this.color;
    fill(r, g, b);
    for(var i=0;i<this.shape.length;i++) {
      for(var j=0;j<this.shape.length;j++) {
        var existBox = this.shape[j][i];
        boxes.push(
          new Box(this.x + i*existBox*boxDim,
                  this.y + j*existBox*boxDim,
                  existBox*boxDim,
                  this.color)
        );        
      }
    }
    return boxes;
  }

  show() {
    let { r, g, b } = this.color;
    fill(r, g, b);
    for(var i=0;i<this.boxes.length;i++) {   
      this.boxes[i].show();
    }    
  }

  applyGravity() {
    for(var i=0;i<this.boxes.length;i++) {   
      this.boxes[i].y += boxDim;      
    }   
  }

  update() {
    
       
    

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
