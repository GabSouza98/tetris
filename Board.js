class Board {
  constructor() {
    this.board = this.createEmptyBoard();
    this.boxHeight = canvasHeight / ROWS;
    this.boxWidth = canvasWidth / COLS;
    this.boxSize = Math.floor(this.boxHeight, this.boxWidth);
  }

  createEmptyBoard() {
    let board = new Array(ROWS).fill(0).map(() => Array(COLS).fill(0));
    return board;
  }

  cleanBoard() {
    this.board = this.createEmptyBoard();
  }

  cropBoard(x1, y1, x2, y2) {
    let croppedLines;
    let cropped = [];

    croppedLines = this.board.slice(y1, y2 + 1);

    for (let i in croppedLines) {
      cropped.push(croppedLines[i].slice(x1, x2 + 1));
    }
    return cropped;
  }

  drawGrid() {
    // Desenha linhas horizontais
    for (var i = EXTRAROWS; i <= ROWS; i++) {
      stroke(STROKE);
      strokeWeight(STROKEWEIGHT);
      line(0, i * this.boxSize, canvasWidth, i * this.boxSize);
    }

    // Desenha linhas verticais
    // Como precisa ignorar as duas linhas "escondidas" no topo,
    // preciso começar de um ponto mais abaixo no canvas
    let startingPoint = EXTRAROWS * this.boxSize;
    for (var j = 0; j <= COLS; j++) {
      stroke(STROKE);
      strokeWeight(STROKEWEIGHT);
      line(j * this.boxSize, startingPoint, j * this.boxSize, canvasHeight);
    }
  }

  draw() {
    for (var i = EXTRAROWS; i < ROWS; i++) {
      for (var j = 0; j < COLS; j++) {
        if (this.board[i][j] > 0) {
          let pieceNumber = this.board[i][j];
          let color = pieces[pieceNumber].color + "CC";
          fill(color);
          rect(j * this.boxSize, i * this.boxSize, this.boxSize, this.boxSize);
        }
      }
    }
  }
}
