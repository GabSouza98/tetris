class Controller {
  constructor() {
    this.pieceBoard = new PieceBoard();
    this.gameBoard = new GameBoard();
    this.pieceLifespan = 0;
    this.score = 0;
  }

  start() {
    this.pieceBoard.spawnPiece();
    this.gameBoard.drawGrid();
    this.gameBoard.draw();
    this.pieceBoard.draw();
  }

  update() {
    if (
      this.pieceBoard.touchFloor() ||
      this.touchOtherPieceVertically(this.gameBoard, this.pieceBoard)
    ) {
      this.gameBoard.consume(this.pieceBoard);

      this.score += this.gameBoard.getScore();

      if (this.pieceLifespan == 0) {
        this.gameOver();
      }
      this.pieceBoard = new PieceBoard();
      this.pieceBoard.spawnPiece();
      this.pieceLifespan = 0;
    } else {
      this.pieceBoard.applyGravity();
      this.pieceLifespan++;
    }

    this.pieceBoard.draw();
    this.gameBoard.drawGrid();
    this.gameBoard.draw();
  }

  gameOver() {
    background(255);
    this.pieceBoard = new PieceBoard();
    this.pieceBoard.spawnPiece();
    this.gameBoard = new GameBoard();
    this.pieceLifespan = 0;
    this.score = 0;
  }

  movePieceRight() {
    if (this.touchOtherPieceHorizontally(this.gameBoard, this.pieceBoard)) {
      return;
    }
    this.pieceBoard.moveRight();
  }

  movePieceLeft() {
    if (this.touchOtherPieceHorizontally(this.gameBoard, this.pieceBoard)) {
      return;
    }
    this.pieceBoard.moveLeft();
  }

  touchOtherPieceVertically(gameBoard, pieceBoard) {
    for (let i = ROWS - 1; i >= 0; i--) {
      for (let j = 0; j < COLS; j++) {
        if (pieceBoard.board[i][j] > 0) {
          if (gameBoard.board[i + 1][j] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }

  touchOtherPieceHorizontally(gameBoard, pieceBoard) {
    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        if (pieceBoard.board[i][j] > 0) {
          if (j - 1 < 0 || j + 1 > COLS - 1) {
            continue;
          }
          if (gameBoard.board[i][j + 1] > 0 || gameBoard.board[i][j - 1] > 0) {
            return true;
          }
        }
      }
    }
    return false;
  }
}
