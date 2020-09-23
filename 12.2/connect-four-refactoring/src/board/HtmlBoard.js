'use strict';

export class HtmlBoard {

  htmlBoardElem = document.getElementById("board");

  constructor(height, width, game ) {
    Object.assign(this, {height, width });
    // this.clickHandler = game.clickHandlerObj;
  }

  makeHtmlBoard( clickHandler){
    this.addTop( clickHandler );
    this.addCells();
  }

  addTop( clickHandler ) {
    const top = document.createElement("tr");
    top.setAttribute("id", "column-top");
    top.addEventListener("click", clickHandler );

    let headCell;
    for (let colIdx = 0; colIdx < this.width; colIdx++) {
      headCell = document.createElement("td");
      headCell.setAttribute("id", colIdx.toString() );
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

  placeInHtmlBoard(player, row, col) {
    const piece = document.createElement('div');
    piece.classList.add('piece', 'p' + player);
    const correctTd = document.getElementById(`${row}-${col}`);
    correctTd.append(piece);
  }



  // nextPlayer(){
  //   this.currPlayer = this.currPlayer === 1 ? 2 : 1;
  // }

getHtmlBoard() {
    return this.htmlBoardElem;
}

}
