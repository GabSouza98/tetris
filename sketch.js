//constants
const ROWS = 20;
const COLS = 10;
const RATIO = ROWS / COLS;
const canvasWidth = 300;
const canvasHeight = RATIO * canvasWidth;
const backgroundColor = 50;
const speed = 5;
const STROKE = 20;
const STROKEWEIGHT = 1.5;

// let pieceBoard;
// let gameBoard;
let controller;

function setup() {
  frameRate(5);
  createCanvas(canvasWidth, canvasHeight);
  background(backgroundColor);

  controller = new Controller();
  controller.start();
  // pieceBoard = new PieceBoard();
  // pieceBoard.spawnPiece();
  // console.log(pieceBoard.piece);
  // console.log(pieceBoard.board);
  // gameBoard = new GameBoard();
}

function draw() {
  background(backgroundColor);
  controller.update();
  // gameBoard.drawGrid();
  // pieceBoard.draw();
  // gameBoard.draw();

  // pieceBoard.applyGravity();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    controller.pieceBoard.applyRotation(controller.gameBoard.board);
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
