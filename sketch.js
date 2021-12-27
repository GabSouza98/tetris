// CANVAS CONFIG
const CANVAS_HEIGHT = 650;
const CANVAS_WIDTH = 1300;

// BOARD CONFIG
const EXTRA_ROWS = 2;
const ROWS = 20 + EXTRA_ROWS;
const COLS = 10;
const RATIO = ROWS / COLS;
const BOX_SIZE = 30;
const BOARD_X1 = 350;
const BOARD_Y1 = 30;
const BOARD_WIDTH = COLS * BOX_SIZE;
const BOARD_HEIGHT = (ROWS - EXTRA_ROWS) * BOX_SIZE;

// MENU CONFIG
const MENU_X1 = BOARD_X1 + BOARD_WIDTH + BOX_SIZE;
const MENU_WIDTH = 10 * BOX_SIZE;
const MENU_Y1 = BOARD_Y1;
const MENU_HEIGHT = BOARD_HEIGHT;

// DRAW CONFIG
const CANVAS_BACKGROUND_COLOR = 50;
const BOARD_BACKGROUND_COLOR = 80;
const MENU_BACKGROUND_COLOR = 80;
const STROKE = 20;
const STROKE_WEIGHT = 1.5;

// GAME CONFIG
const SPEED = 5;

let controller;

function setup() {
  frameRate(5);
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  background(CANVAS_BACKGROUND_COLOR);

  controller = new Controller();
  controller.start();
}

function draw() {
  background(CANVAS_BACKGROUND_COLOR);
  controller.update();
  checkKeyDown();
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

  //keyCode p = 80
  if (keyCode === 80) {
    controller.pauseGame();
  }
}

function checkKeyDown() {
  if (keyIsDown(DOWN_ARROW)) {
    frameRate(15);
  } else {
    frameRate(SPEED);
  }

  // if (keyIsDown(LEFT_ARROW)) {
  //   controller.movePieceLeft();
  // }

  // if (keyIsDown(RIGHT_ARROW)) {
  //   controller.movePieceRight();
  // }
}
