'use strict';

export class LogicalBoard {

  logicalBoard = [];

  constructor(height, width, game) {
    Object.assign(this, {height, width, game});
    // this.placeInHtmlBoard = game.htmlBoardObj.placeInHtmlBoard.bind( game.htmlBoardObj );
    // this.makeLogicalBoard();
    this.updateHtmlBoard = undefined;
  }

  // init() {
  //   this.makeLogicBoard();
  //   this.makeHtmlBoard = new HtmlBoard(this.height, this.width, this.getLogicBoard.bind( this ), this.currPlayer );;
  // }


  makeLogicalBoard() {
    for (let rowIdx = 0; rowIdx < this.height; rowIdx++) {
      this.logicalBoard[rowIdx] = new Array(this.width);
      this.logicalBoard[rowIdx].fill(null);
    }
  }

  getLogicalBoard() {
    return this.logicalBoard;
  }

  setLogicalCellValue( value, rowIdx, colIdx ){
    this.logicalBoard[rowIdx][colIdx] = value;
    this.updateHtmlBoard( value, rowIdx, colIdx );
  }
}
