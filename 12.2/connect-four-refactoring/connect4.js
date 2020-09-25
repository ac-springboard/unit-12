'use strict';

import {StatusManager} from './src/process/StatusManager.js';
import {LogicalBoard}  from './src/board/LogicalBoard.js';
import {ClickHandler}  from './src/process/ClickHandler.js';
import {HtmlBoard}     from './src/board/HtmlBoard.js';

// TODO: Use Observer/Observable Pattern
// NOTE FOR THE REVIEWER: Everything that is asked to do in this part and the further ones
//                        were already covered by me on the Unit 11 - ConnecThem.

class Game {

  currPlayer = 1;

  constructor(height, width) {
    this.statusManagerObj = new StatusManager(height, width);
    this.logicalBoardObj  = new LogicalBoard(height, width, this);
    this.clickHandlerObj  = new ClickHandler(height, width,
      this.statusManagerObj,
      this.logicalBoardObj,
      this);
    this.htmlBoardObj     = new HtmlBoard(height, width, this);
    this.init();
  }

  init() {
    this.clickHandler = this.clickHandlerObj.handler.bind(this.clickHandlerObj);
    this.logicalBoardObj.makeLogicalBoard();
    this.htmlBoardObj.makeHtmlBoard(this.clickHandler);
    this.updateHtmlBoard = this.htmlBoardObj.placeInHtmlBoard.bind(this.htmlBoardObj);
  }

  getCurrPlayer() {
    return this.currPlayer;
  }

  setCurrPlayer() {
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  processStatus(row, col, statusCode, doStatus ) {
    const _this = this;
    this.updateHtmlBoard( row, col, this.getCurrPlayer() );
    setTimeout( doStatus, 20 );
    function doStatus () {
      switch (statusCode) {
        case StatusManager.CONTINUE: {
          _this.setCurrPlayer();
          break;
        }
        case StatusManager.TIE: {
          alert('This is a TIE!');
          break;
        }
        case StatusManager.WINNER: {
          alert('Player '+_this.getCurrPlayer());
          break;
        }
        default: {
        }
      }
    };
  }

}

new Game(6, 7);
let stop = true;
