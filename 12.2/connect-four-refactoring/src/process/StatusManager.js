'use strict';

export class StatusManager {
  static CONTINUE = -1;
  static TIE      = 0;
  static WINNER   = 1;
  isWinner        = false;
  isTie           = false;
  current         = StatusManager.CONTINUE;

  constructor( height, width ) {
    Object.assign(this, {height, width});
  }

  update(currPlayer, board) {
    // Object.assign(this, {currPlayer, board});
    this.checkForWin( currPlayer, board );
    if (this.isWinner) {
      this.current = StatusManager.WINNER;
    } else {
      this.checkForTie(board);
      if (this.isTie) {
        this.current = StatusManager.TIE;
      } else {
        this.current = StatusManager.CONTINUE;
      }
    }
    return this.current;
  }

  checkForWin( currPlayer, board ) {
    function _win(cells) {
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < board.length && // height
          x >= 0 &&
          x < board[0].length && // width
          board[y][x] === currPlayer
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

  checkForTie(board ) {
    this.isTie = board.flat().every((elem) => elem !== null);
  }

  getStatus(){
    return this.current;
  }
}
