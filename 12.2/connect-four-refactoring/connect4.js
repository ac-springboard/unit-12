'use strict';

class Game {
  constructor(height, width) {
    this.board = new Board(height, width);
  }
}

class Board {

  logicBoard = [];
  currPlayer = 1;

  constructor(height, width) {
    Object.assign(this, {height, width});
    this.init();
  }

  init() {
    this.makeLogicBoard();
    this.makeHtmlBoard = new HtmlBoard(this.height, this.width, this.getLogicBoard.bind( this ), this.currPlayer );;
  }

  makeLogicBoard() {
    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {
      this.logicBoard[rowIdx] = new Array(this.width);
      this.logicBoard[rowIdx].fill(null);
    }
  }

  getLogicBoard(){
    return this.logicBoard;
  }

}

class HtmlBoard {

  htmlBoardElem = document.getElementById("board");

  constructor(height, width, getLogicBoard, currPlayer ) {
    Object.assign(this, {height, width, getLogicBoard, currPlayer });
    this.init();
  }

  init() {
    this.addTop();
    this.addCells();
  }

  addTop() {
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    const handleClick = new HandleClick( this. height, this.width, this.getLogicBoard.bind(this), this.processStatus( this )  );
    top.addEventListener("click", handleClick.handle.bind(handleClick));

    let headCell;
    for (let x = 0; x < this.width; x++) {
      headCell = document.createElement("td");
      headCell.setAttribute("id", x);
      top.append(headCell);
    }
    this.htmlBoardElem.append(top);
  }

  addCells() {
    let row;
    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {
      row = document.createElement("tr");
      for (let colIdx = 0; colIdx < this.width; colIdx++) {
        const cell = document.createElement("td");
        cell.setAttribute("id", `${rowIdx}-${colIdx}`);
        row.append(cell);
      }
      this.htmlBoardElem.append(row);
    }
  }

  processStatus( statusCode ){
    switch ( statusCode ){
      case Status.CONTINUE:{
        this.nextPlayer();
        break;
      }
      case Status.TIE: {
        alert( 'This is a TIE!');
        break;
      }
      case Status.WINNER: {
        alert( 'Player ' )
        break;
      }
      default:{
      }
    }
  }

  nextPlayer(){
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }



}

class HandleClick {

  currPlayer = 1;
  board;

  constructor(height, width, getLogicBoard, processStatus  ) {
    Object.assign(this, {height, width, getLogicBoard, processStatus });
    this.status = new Status( this.height, this.width );
  }

  handle(evt) {

    if (this.status && this.status.current && this.status.current !== Status.CONTINUE) {
      return;
    }

    this.board = Object.call( this.getLogicBoard ) ;
    const col = +evt.target.id;
    let row   = this.findSpotForCol(col );
    if ( !row) {
      return;
    }
    this.placeInTable(row, col);
    const newStatus = status.update( this.currPlayer, this.board );
    Object.call( this.processStatus, newStatus );

  }

  findSpotForCol(col) {
    for (let rowIdx = this.height - 1; rowIdx >= 0; rowIdx--) {
      if (this.board[rowIdx][col] === null) {
        return rowIdx;
      }
    }
    return null;
  }

  placeInTable(row, col) {
    const piece = document.createElement('div');
    piece.classList.add('piece', 'p' + this.currPlayer);
    const correctTd = document.getElementById(`${row}-${col}`);
    correctTd.append(piece);
  }

}

class Status {
  static CONTINUE = -1;
  static TIE      = 0;
  static WINNER   = 1;
  isWinner        = false;
  isTie           = false;
  current         = Status.CONTINUE;

  constructor( height, width ) {
    Object.assign(this, {height, width});
  }

  update(currPlayer, board) {
    Object.assign(this, {currPlayer, board});
    this.checkForWin();
    if (this.isWinner) {
      this.current = Status.WINNER;
    } else {
      this.checkForTie();
      if (this.isTie) {
        this.current = Status.TIE;
      } else {
        this.current = Status.CONTINUE;
      }
    }
    return this.current;
  }

  checkForWin() {
    function _win(cells) {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < this.board.length && // height
          x >= 0 &&
          x < this.board[0].length && // width
          this.board[y][x] === this.currPlayer
      );
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let horiz  = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        let vert   = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        let diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        let diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          this.isWinner = true;
        }
      }
    }
  }

  checkForTie() {
    this.isTie = this.board.flat().every((elem) => elem !== null);
  }
}

new Game( 6, 7 );
