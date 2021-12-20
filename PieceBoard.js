const pieces = {
  1: {
    name: "L",
    color: "#ff8d00",
    matrix: [
      [1, 1, 1],
      [1, 0, 0],
      [0, 0, 0],
    ],
  },
  2: {
    name: "T",
    color: "#9f0096",
    matrix: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
  },
  3: {
    name: "J",
    color: "#ff51bc",
    matrix: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
  },
  4: {
    name: "S",
    color: "#f60000",
    matrix: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
  },
  5: {
    name: "Z",
    color: "#69b625",
    matrix: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
  },
  6: {
    name: "O",
    color: "#faff00",
    matrix: [
      [1, 1],
      [1, 1],
    ],
  },
  7: {
    name: "I",
    color: "#00e4ff",
    matrix: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
};

class PieceBoard extends Board {
  constructor() {
    super();

    // Posição da caixa da piece no piece board
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

    this.pieceNumber = this.generatePieceNumber();
    this.piece = pieces[this.pieceNumber];
    // this.board = this.startBoard();
  }

  generatePieceNumber() {
    let number = Math.floor(1 + Math.random() * Object.keys(pieces).length);
    return number;
  }

  spawnPiece() {
    let middleCol = Math.floor(COLS / 2);

    // Gravando o ponto inicial (topo-esquerdo) da matriz do piece
    // Começa sempre na primeira linha da matriz do board
    this.x1 = middleCol - 1;
    this.y1 = 0;

    this.piece.matrix.map((row, i) =>
      row.map((elem, j) => {
        this.board[i][j + middleCol - 1] = this.pieceNumber * elem;

        // Aqui eu seto o x2 e y2, que vai ser o ponto mais em baixo-direita da matriz
        // como esses for vão do topo-esquerda pro baixo-direita, se eu setar toda vez eu garanto
        // que to pegando o ponto mais em baixo na direita possivel
        this.x2 = j + middleCol - 1;
        // Menos 1 pq quero que seja o index do board
        this.y2 = i;
      })
    );
  }

  applyGravity() {
    for (let i = ROWS - 1; i >= 0; i--) {
      for (let j = 0; j < COLS; j++) {
        if (this.board[i][j] > 0) {
          if (i + 1 >= ROWS) {
            return;
          }
          this.board[i + 1][j] = this.board[i][j];
          this.board[i][j] = 0;
        }
      }
    }
    // Como a peça ta caindo 1 espaço toda vez que aplico gravidade, atualizo o y1 e y2 da posição da matriz da peça
    this.y1 += 1;
    this.y2 += 1;
  }

  touchFloor() {
    for (let j = 0; j < COLS; j++) {
      if (this.board[ROWS - 1][j] > 0) {
        return true;
      }
    }
    return false;
  }

  cropPiece(board, x1, y1, x2, y2) {
    //   TODO: Revisar quando o board for maior
    let croppedLines;
    let cropped = [];

    croppedLines = board.slice(y1, y2 + 1);

    //o cropped está retornando vazio caso x1<0
    if (x1 >= 0) {
      for (let i in croppedLines) {
        cropped.push(croppedLines[i].slice(x1, x2 + 1));
      }
      return cropped;
    } else {
      return null;
    }
  }

  rotatePiece(matrix) {
    let rotated = matrix[0].map((line, index) =>
      matrix.map((row) => row[index]).reverse()
    );
    return rotated;
  }

  applyRotation(gameBoard) {
    //   TODO: Arrumar aqui pra checar se deve rotacionar
    let croppedPiece = this.cropPiece();
    if (croppedPiece === null) {
      return;
    }
    this.board = this.generateBoard();
    let rotated = this.rotatePiece(croppedPiece);

    // //Cria uma matriz pequena de onde a peça estaria no Board
    // let croppedLines;
    // let croppedBoard = [];
    // croppedLines = gameBoard.slice(this.y1, this.y2 + 1);
    // for (let i in croppedLines) {
    //   croppedBoard.push(croppedLines[i].slice(this.x1, this.x2 + 1));
    // }

    // let canRotate = true;

    // for (let j = 0; j < rotated.length; j++) {
    //   for (let i = 0; i < rotated.length; i++) {
    //     if (
    //       (croppedBoard[i][j] > 0 && rotated[i][j] > 0) ||
    //       this.x1 < 0 ||
    //       this.x2 >= cols
    //     ) {
    //       canRotate = false;
    //     }
    //   }
    // }

    // console.log("CAN ROTATE =", canRotate);

    // let pieceSize = croppedPiece.length;
    // if (canRotate) {
    for (let i = 0; i < pieceSize; i++) {
      for (let j = 0; j < pieceSize; j++) {
        this.board[i + this.y1][j + this.x1] = rotated[i][j];
      }
    }
    // } else {
    //   for (let i = 0; i < pieceSize; i++) {
    //     for (let j = 0; j < pieceSize; j++) {
    //       this.board[i + this.y1][j + this.x1] = croppedPiece[i][j];
    //     }
    //   }
    // }
  }

  moveLeft() {
    for (let j = 0; j < COLS; j++) {
      for (let i = 0; i < ROWS; i++) {
        if (this.board[i][j] > 0) {
          if (j - 1 < 0) {
            return;
          }
          this.board[i][j - 1] = this.board[i][j];
          this.board[i][j] = 0;
        }
      }
    }

    this.x1 -= 1;
    this.x2 -= 1;
  }

  moveRight() {
    for (let j = COLS - 1; j >= 0; j--) {
      for (let i = 0; i < ROWS; i++) {
        if (this.board[i][j] > 0) {
          if (j + 1 >= COLS) {
            return;
          }
          this.board[i][j + 1] = this.board[i][j];
          this.board[i][j] = 0;
        }
      }
    }
    this.x1 += 1;
    this.x2 += 1;
  }
}
