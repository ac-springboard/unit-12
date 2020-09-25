'use strict';

import {StatusManager} from './StatusManager.js';

export class ClickHandler {

  // currPlayer = 1;
  // board;

  constructor(height, width, statusManager, logicalBoard, game) {
    Object.assign(this, {height, width, statusManager, logicalBoard, game});
    this.getStatus           = statusManager.getStatus.bind(statusManager);
    this.getLogicalBoard     = logicalBoard.getLogicalBoard.bind(logicalBoard);
    this.setLogicalCellValue = logicalBoard.setLogicalCellValue.bind(logicalBoard);
    this.getCurrPlayer       = game.getCurrPlayer.bind(game);
    this.processStatus       = game.processStatus.bind(game);
  }

  handler(evt) {

    let board  = this.getLogicalBoard();
    let status = this.getStatus();
    let player = this.getCurrPlayer();

    if (status && status !== StatusManager.CONTINUE) {
      return;
    }

    const col = +evt.target.id;
    let row   = this.findSpotForCol(board, col);
    if ( row === null || row === undefined || row < 0 ) {
      return;
    }

    this.setLogicalCellValue(row, col, player);
    // this.placeInHtmlBoard(player, row, col);
    const newStatus = this.statusManager.update(player, board);
    this.processStatus( row, col, newStatus );
  }

  findSpotForCol(board, col) {
    for (let rowIdx = this.height - 1; rowIdx >= 0; rowIdx--) {
      if (board[rowIdx][col] === null) {
        return rowIdx;
      }
    }
    return null;
  }

}
