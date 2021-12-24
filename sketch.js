// Invisible rows at the top, so the pieces have space to rotate and spawn properly
const EXTRAROWS = 2;

//constants
const ROWS = 20 + EXTRAROWS;
const COLS = 10;
const RATIO = ROWS / COLS;
const canvasWidth = 300;
const canvasHeight = RATIO * canvasWidth;
const backgroundColor = 50;
const speed = 5;
const STROKE = 20;
const STROKEWEIGHT = 1.5;

let controller;

function setup() {
  frameRate(5);
  createCanvas(canvasWidth, canvasHeight);
  background(backgroundColor);

  controller = new Controller();
  controller.start();
}

function draw() {
  background(backgroundColor);
  controller.update();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    controller.rotatePiece();
  }

  if (keyCode === LEFT_ARROW) {
    controller.movePieceLeft();
  }

  if (keyCode === RIGHT_ARROW) {
    controller.movePieceRight();
  }
}

function checkAccelerate() {
  if (keyIsDown(DOWN_ARROW)) {
    frameRate(15);
  } else {
    frameRate(speed);
  }
}
