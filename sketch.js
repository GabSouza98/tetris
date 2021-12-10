//constants
const canvasWidth = 500;
const canvasHeight = 600;
const backgroundColor = 50;
const boxDim = 30;
const timer = 800;

//variables
let myBox;

function setup() {
  createCanvas(canvasWidth, canvasHeight);
  myBox = new Box(canvasWidth / 2, 0, boxDim, { r: 150, g: 48, b: 95 });
  setInterval(applyGravity, timer);
}

function draw() {
  background(backgroundColor);
  drawGrid();
  myBox.show();
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
    // Testando 123
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.color = color;
  }
}

function applyGravity() {
  myBox.y += boxDim;
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
