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

let pieceBoard;
let gameBoard;

function setup() {
  frameRate(5);
  createCanvas(canvasWidth, canvasHeight);
  background(backgroundColor);

  pieceBoard = new PieceBoard();
  pieceBoard.spawnPiece();
  console.log(pieceBoard.piece);
  console.log(pieceBoard.board);
  gameBoard = new GameBoard();
}

function draw() {
  background(backgroundColor);
  gameBoard.drawGrid();
  pieceBoard.draw();
  // gameBoard.draw();

  pieceBoard.applyGravity();
}
