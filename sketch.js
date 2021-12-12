//constants
const rows = 18;
const cols = 10;
const ratio = rows / cols;
const canvasWidth = 300;
const canvasHeight = ratio * canvasWidth;
const backgroundColor = 50;
const speed = 50;

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
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
  },
};

const timer = 800;
let board;
let piece;

function setup() {
  frameRate(15);
  createCanvas(canvasWidth, canvasHeight);
  board = new Board();
  piece = new Piece();
  //generatePiece();
  background(backgroundColor);
  board.drawGrid();
  board.draw();
  piece.draw();
}

function draw() {
  background(backgroundColor);
  piece.update();
  piece.draw();
  board.drawGrid();
  // if (frameCount % 30 == 0) {
  //   throw new Error();
  // }
  board.draw();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    // console.log("Apertei pra cima");
    console.log(piece.cropPiece());
    piece.applyRotation();
    console.log(piece.cropPiece());
    // piece.draw();
  }
}

class Piece {
  constructor() {
    // Posição da caixa da piece
    this.x1 = 0;
    this.y1 = 0;
    this.x2 = 0;
    this.y2 = 0;

    this.pieceNumber = this.generatePieceNumber();
    this.piece = pieces[this.pieceNumber];
    this.board = this.startBoard();
    this.boxHeight = canvasHeight / rows;
    this.boxWidth = canvasWidth / cols;
    this.boxSize = Math.floor(this.boxHeight, this.boxWidth);
  }

  generateBoard() {
    let b = [];
    let lineArray = [];
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        lineArray.push(0);
      }
      b.push(lineArray);
      lineArray = [];
    }
    return b;
  }

  startBoard() {
    let b = this.generateBoard();
    let pieceNumber = this.pieceNumber;
    let p = pieces[pieceNumber];

    let halfCols = Math.floor(cols / 2);

    // Gravando o ponto inicial (topo-esquerdo) da matriz do piece
    // Começa sempre na primeira linha da matriz do board
    this.x1 = halfCols - 1;
    this.y1 = 0;

    for (var i in p.matrix) {
      for (var j in p.matrix[i]) {
        i = int(i);
        j = int(j);
        // let val = pieceNumber * p.matrix[i][j];
        b[i][j + halfCols - 1] = pieceNumber * p.matrix[i][j];

        // Aqui eu seto o x2 e y2, que vai ser o ponto mais em baixo-direita da matriz
        // como esses for vão do topo-esquerda pro baixo-direita, se eu setar toda vez eu garanto
        // que to pegando o ponto mais em baixo na direita possivel
        this.x2 = j + halfCols - 1;
        // Menos 1 pq quero que seja o index do board
        this.y2 = i;
      }
    }
    return b;
  }

  update() {
    // if (frameCount % speed == 0) {
    this.applyGravity();
    // }
  }

  applyGravity() {
    for (let i = rows - 1; i >= 0; i--) {
      for (let j = 0; j < cols; j++) {
        if (this.board[i][j] > 0) {
          if (i + 1 >= rows) {
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
    // console.log(this.cropPiece());
    // console.log(this.x1, this.y1, this.x2, this.y2);
    // console.log(this.board);
    // console.log(this.x1, this.y1, this.x2, this.y2);
  }

  cropPiece() {
    let croppedLines;
    let cropped = [];

    croppedLines = this.board.slice(this.y1, this.y2 + 1);

    for (let i in croppedLines) {
      cropped.push(croppedLines[i].slice(this.x1, this.x2 + 1));
    }
    return cropped;
  }

  rotatePiece(matrix) {
    let rotated = matrix[0].map((line, index) =>
      matrix.map((row) => row[index]).reverse()
    );
    return rotated;
  }

  applyRotation() {
    let croppedPiece = this.cropPiece();

    this.board = this.generateBoard();

    let rotated = this.rotatePiece(croppedPiece);

    let pieceSize = croppedPiece.length;
    for (let i = 0; i < pieceSize; i++) {
      for (let j = 0; j < pieceSize; j++) {
        this.board[i + this.y1][j + this.x1] = rotated[i][j];
      }
    }
  }

  draw() {
    for (var i in this.board) {
      for (var j in this.board[i]) {
        if (this.board[i][j] > 0) {
          fill(this.piece.color);
          rect(j * this.boxSize, i * this.boxSize, this.boxSize, this.boxSize);
        }
      }
    }
  }

  generatePieceNumber() {
    let number = Math.floor(1 + Math.random() * Object.keys(pieces).length);
    return number;
  }
}

class Board {
  constructor() {
    this.board = this.createBoard();
    this.boxHeight = canvasHeight / rows;
    this.boxWidth = canvasWidth / cols;
    this.boxSize = Math.floor(this.boxHeight, this.boxWidth);
  }

  createBoard() {
    let boxes = [];
    let lineArray = [];
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < cols; j++) {
        lineArray.push(0);
      }
      boxes.push(lineArray);
      lineArray = [];
    }
    return boxes;
  }

  drawGrid() {
    //desenha linhas horizontais
    for (var i = 0; i <= rows; i++) {
      stroke(20);
      strokeWeight(0.5);
      line(0, i * this.boxSize, canvasWidth, i * this.boxSize);
    }
    //desenha linhas verticais
    for (var j = 0; j <= cols; j++) {
      stroke(20);
      strokeWeight(0.5);
      line(j * this.boxSize, 0, j * this.boxSize, canvasHeight);
    }
  }

  draw() {
    for (var i in this.board) {
      for (var j in this.board[i]) {
        if (this.board[i][j] > 0) {
          fill(150, 140, 130);
          rect(i * this.boxSize, j * this.boxSize, this.boxSize, this.boxSize);
        }
      }
    }
  }
}
