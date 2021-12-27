class Menu {
  constructor(nextPiece) {
    this.nextPiece = nextPiece;
  }

  draw() {
    this.drawMenuBorder();
    this.drawNextPieceMenu();
  }

  drawMenuBorder() {
    fill(MENU_BACKGROUND_COLOR);
    rect(MENU_X1, MENU_Y1, MENU_WIDTH, MENU_HEIGHT);
  }

  drawNextPieceMenu() {
    this.drawNextPieceBorder();
    this.drawNextPiece();
  }

  drawNextPieceBorder() {
    fill(MENU_BACKGROUND_COLOR);
    rect(
      MENU_X1 + BOX_SIZE,
      MENU_Y1 + BOX_SIZE,
      MENU_WIDTH - 2 * BOX_SIZE,
      MENU_Y1 + 3 * BOX_SIZE
    );
  }

  drawNextPiece() {
    let pieceMatrix = pieces[this.nextPiece].matrix;

    // Checks kind of piece, some of them will be drawn 1 box size lower
    let drawPiecesLower = ["O", "S", "Z"];
    let drawLower = 0;

    if (drawPiecesLower.includes(pieces[this.nextPiece].name)) {
      drawLower = 1;
    }

    for (let i = 1; i <= pieceMatrix.length; i++) {
      for (let j = 1; j <= pieceMatrix.length; j++) {
        if (pieceMatrix[i - 1][j - 1] > 0) {
          let color = pieces[this.nextPiece].color + "CC";
          fill(color);
          rect(
            MENU_X1 + BOX_SIZE * j + 3 * BOX_SIZE,
            MENU_Y1 + BOX_SIZE * i + drawLower * BOX_SIZE,
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
