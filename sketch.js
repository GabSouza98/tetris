//constants
const rows = 18;
const cols = 10;
const ratio = rows/cols;
const canvasWidth = 300;
const canvasHeight = ratio*canvasWidth;
const backgroundColor = 50;
const speed = 20;

const pieces = {
    1: {name: "L",
        color: '#ff8d00',
        matrix:[[1, 1, 1],            
                [1, 0, 0],
                [0, 0, 0]]
        },
    2: {name: "T",
        color: '#9f0096',
        matrix:[[1, 1, 1],            
                [0, 1, 0],
                [0, 0, 0]]
        },
    3: {name: "J",
        color: '#ff51bc',
        matrix: [ [1, 1, 1],            
                  [0, 0, 1],
                  [0, 0, 0] ]
        },
    4: {name: "S",
        color: '#f60000',
        matrix: [ [0, 1, 1],            
                  [1, 1, 0],
                  [0, 0, 0] ]
        },
    5: {name: "Z",
        color: '#69b625',
        matrix: [ [1, 1, 0],            
                  [0, 1, 1],
                  [0, 0, 0] ]
        },
    6: {name: "O",
        color: '#faff00',
        matrix: [ [1, 1],            
                  [1, 1] ]
        },
    7: {name: "I",
        color: '#00e4ff',
        matrix: [ [1, 1, 1, 1],   
                  [0, 0, 0, 0],       
                  [0, 0, 0, 0],  
                  [0, 0, 0, 0] ]
        },
}


const timer = 800;
let board;
let piece;

function setup() {
    createCanvas(canvasWidth, canvasHeight);    
    board = new Board(); 
    piece = new Piece();  
    //generatePiece();   
    
  }
  
function draw() {
    background(backgroundColor);
    board.drawGrid();  
    board.draw();   
    piece.draw();   
    //piece.update();
}

class Piece {
    constructor() {
        this.pieceNumber = this.generatePieceNumber();
        this.piece = pieces[this.pieceNumber];
        this.board = this.startBoard();
        this.boxHeight = canvasHeight/rows;
        this.boxWidth = canvasWidth/cols;
        this.boxSize = Math.floor(this.boxHeight,this.boxWidth);         
                
    }

    generateBoard() {
        let b = [];
        let lineArray = [];
        for(var i=0; i<rows;i++) {
            for(var j=0; j<cols; j++) {
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
        
        let halfCols = Math.floor(cols/2);        

        for (var i in p.matrix) {            
            for (var j in p.matrix[i]) { 
                i = int(i);
                j = int(j);                                            
                b[i][j + halfCols - 1] = pieceNumber * p.matrix[i][j];                
            }
        }       
        return b;
        
    }

    update() {
        if(frameCount % speed == 0 ) {
            this.applyGravity();
            
          }
    }

    applyGravity() {
        
    }

    draw() {
        fill(this.piece.color)
        for (var i in this.board) {            
            for (var j in this.board[i]) {
                if(this.board[i][j]>0) {                    
                    rect(j*this.boxSize, i*this.boxSize, this.boxSize, this.boxSize);
                }                 
            }
        }
    }

    generatePieceNumber() {
        let number = Math.floor(1 + Math.random() * (Object.keys(pieces).length))        
        return number;
    }


}

class Board {
    constructor() {
        this.board = this.createBoard();        
        this.boxHeight = canvasHeight/rows;
        this.boxWidth = canvasWidth/cols;
        this.boxSize = Math.floor(this.boxHeight,this.boxWidth);        
    }   

    createBoard() {
        let boxes = [];
        let lineArray = [];
        for(var i=0; i<rows;i++) {
            for(var j=0; j<cols; j++) {
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
            line(0, i*this.boxSize, canvasWidth, i*this.boxSize);
        }
        //desenha linhas verticais
        for (var j = 0; j <= cols; j++) {
            stroke(20);
            strokeWeight(0.5);
            line(j*this.boxSize, 0, j*this.boxSize, canvasHeight);
        }
        
    }

    draw() {
        for (var i in this.board) {            
            for (var j in this.board[i]) {
                if(this.board[i][j]>0) {
                    fill(150, 140, 130);
                    rect(i*this.boxSize, j*this.boxSize, this.boxSize, this.boxSize);
                }  
               
            }
        }
    }
}

