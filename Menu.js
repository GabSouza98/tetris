class Menu {
  constructor(nextPiece) {
    this.x1 = MENU_X1;
    this.x2 = MENU_WIDTH;
    this.y1 = MENU_Y1;
    this.y2 = MENU_HEIGHT;
    this.nextPiece = nextPiece;
  }

  draw() {
    fill(MENU_BACKGROUND_COLOR);
    rect(this.x1, this.y1, this.x2, this.y2);
    this.drawNextPiece();
  }

  drawNextPiece() {
    fill(MENU_BACKGROUND_COLOR);
    rect(
      this.x1 + BOX_SIZE,
      this.y1 + BOX_SIZE,
      this.x2 - 2 * BOX_SIZE,
      this.y1 + 3 * BOX_SIZE
    );

    let pieceMatrix = pieces[this.nextPiece].matrix;

    for (let i = 1; i <= pieceMatrix.length; i++) {
      for (let j = 1; j <= pieceMatrix.length; j++) {
        if (pieceMatrix[i - 1][j - 1] > 0) {
          let color = pieces[this.nextPiece].color + "CC";
          fill(color);
          rect(
            this.x1 + BOX_SIZE * j + 3 * BOX_SIZE,
            this.y1 + BOX_SIZE * i,
            BOX_SIZE,
            BOX_SIZE
          );
        }
      }
    }
  }

  setNextPiece(nextPiece) {
    this.nextPiece = nextPiece;
  }
}
