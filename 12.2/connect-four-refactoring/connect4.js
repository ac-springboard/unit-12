'use strict';

import {StatusManager} from './src/process/StatusManager.js';
import {LogicalBoard}  from './src/board/LogicalBoard.js';
import {ClickHandler}  from './src/process/ClickHandler.js';
import {HtmlBoard}     from './src/board/HtmlBoard.js';

// TODO: Use Observer/Observable Pattern

class Game {

  currPlayer = 1;

  constructor(height, width) {
    this.statusManagerObj = new StatusManager(height, width);
    this.logicalBoardObj  = new LogicalBoard(height, width, this);
    this.clickHandlerObj  = new ClickHandler(height, width,
      this.statusManagerObj,
      this.logicalBoardObj,
      this);
    this.htmlBoardObj     = new HtmlBoard(height, width, this );
    this.init();
  }

  init() {

    // this.status = this.statusManagerObj.getStatus.bind( this.statusManagerObj );
    this.clickHandler = this.clickHandlerObj.handler.bind(this.clickHandlerObj);

    this.logicalBoardObj.makeLogicalBoard();
    // this.logicalBoard = this.logicalBoardObj.getLogicalBoard.bind(this.logicalBoardObj);

    this.htmlBoardObj.makeHtmlBoard(this.clickHandler);
    // this.placeInHtmlBoard = this.htmlBoardObj.placeInHtmlBoard.bind(this.htmlBoardObj);
    // this.htmlBoard = this.htmlBoardObj.getHtmlBoard.bind(this.htmlBoardObj);

    this.logicalBoardObj.updateHtmlBoard = this.htmlBoardObj.placeInHtmlBoard.bind(this.htmlBoardObj);
  }

  getCurrPlayer() {
    return this.currPlayer;
  }

  setCurrPlayer() {
    this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  }

  processStatus(statusCode) {
    switch (statusCode) {
      case StatusManager.CONTINUE: {
        this.setCurrPlayer();
        break;
      }
      case StatusManager.TIE: {
        alert('This is a TIE!');
        break;
      }
      case StatusManager.WINNER: {
        alert('Player ');
        break;
      }
      default: {
      }
    }
  }

}

new Game(6, 7);
