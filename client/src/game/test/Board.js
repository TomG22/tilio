/**
 * Authors:     Edward Fattell
 * File:        Board.js
 * Description: Represents the 2048 gameboard. Game "backend"/functionality
 */

import Tile from './Tile.js';

class Board {
  constructor() {
    this.won = false;
    this.tiles = [];
    for (let row = 0; row < 4; row++) {
      this.tiles[row] = [];
      for (let col = 0; col < 4; col++) {
        this.tiles[row][col] = new Tile(0);
      }
    }
    this.fillRandom();
    this.fillRandom();
  }

  up(){
    let hasMoved = false;

    this.moveUp();
    let merged = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        let a = this.tiles[row][col];
        let b = this.tiles[row+1][col];
        console.log("atile value: " + a.value);
        let mergedTile = Tile.merge(a, b);
        console.log("merged tile: " + mergedTile);
        if(mergedTile != null && !merged.includes(a) && !merged.includes(b)){
          this.tiles[row][col] = mergedTile;
          this.tiles[row + 1][col] = new Tile(0);
          merged.push(mergedTile);
          if(merged.value == 2048) {
            this.won = true;
          }
        }
      }
    }
    hasMoved = this.moveUp();
    console.log("merge length" + merged.length);
    if(hasMoved) {
      console.log("Called fill random");
      this.fillRandom();
    }
  }

  moveUp() {
  let result = false;
  for (let col = 0; col < 4; col++) {
    for(let row = 1; row < 4; row++) {
      // iterate over all previous rows
      for (let prevRow = row -1; prevRow >= 0; prevRow--) {
        // if the previous row has an empty value, swap with the prev + 1 row
        if (this.tiles[prevRow][col].value == 0) {
          this.tiles[prevRow][col] = this.tiles[prevRow + 1][col]
          this.tiles[prevRow + 1][col] = new Tile(0);
          result = true;
        }
      }
    }
  }
  return result;
}

  down() {
    let hasMoved = false;

    let merged = [];
    this.moveDown();
    for (let row = 3; row > 0; row--) {
      for (let col = 0; col < 4; col++) {
        let a = this.tiles[row][col];
        let b = this.tiles[row-1][col];
        console.log("atile value: " + a.value);
        let mergedTile = Tile.merge(a, b);
        console.log("merged tile: " + mergedTile);
        if(mergedTile != null && !merged.includes(a) && !merged.includes(b)){
          this.tiles[row][col] = mergedTile;
          this.tiles[row - 1][col] = new Tile(0);
          merged.push(mergedTile);
          if(merged.value == 2048) {
            this.won = true;
          }
        }
      }
    }
    hasMoved = this.moveDown();
    if(hasMoved) {
      console.log("Called fill random");
      this.fillRandom();
    }
  }

  moveDown() {
    let result = false;
    for (let col = 0; col < 4; col++) {
      for(let row = 2; row >= 0; row--) {
        // iterate over all previous rows
        for (let prevRow = row +1; prevRow < 4; prevRow++) {
          // if the previous row has an empty value, swap with the prev + 1 row
          if (this.tiles[prevRow][col].value == 0) {
            this.tiles[prevRow][col] = this.tiles[prevRow -1][col]
            this.tiles[prevRow - 1][col] = new Tile(0);
            result = true;
          }
        }
      }
    }
    return result;
  }

  left(){
    let hasMoved = false;

    this.moveUp();
    let merged = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        let a = this.tiles[row][col];
        let b = this.tiles[row+1][col];
        console.log("atile value: " + a.value);
        let mergedTile = Tile.merge(a, b);
        console.log("merged tile: " + mergedTile);
        if(mergedTile != null && !merged.includes(a) && !merged.includes(b)){
          this.tiles[row][col] = mergedTile;
          this.tiles[row + 1][col] = new Tile(0);
          merged.push(mergedTile);
          if(merged.value == 2048) {
            this.won = true;
          }
        }
      }
    }
    hasMoved = this.moveUp();
    console.log("merge length" + merged.length);
    if(hasMoved) {
      console.log("Called fill random");
      this.fillRandom();
    }
  }

  moveLeft() {
  let result = false;
  for (let col = 0; col < 4; col++) {
    for(let row = 1; row < 4; row++) {
      // iterate over all previous rows
      for (let prevRow = row -1; prevRow >= 0; prevRow--) {
        // if the previous row has an empty value, swap with the prev + 1 row
        if (this.tiles[prevRow][col].value == 0) {
          this.tiles[prevRow][col] = this.tiles[prevRow + 1][col]
          this.tiles[prevRow + 1][col] = new Tile(0);
          result = true;
        }
      }
    }
  }
  return result;
}
  right() {
    // TODO:

    let hasMoved = false;

    let merged = [];
      for (let col = 0; col < 3; col++) {
        for (let row = 0; row < 4; row++) {
          let a = this.tiles[row][col];
          let b = this.tiles[row][col+1];
          let mergedTile = Tile.merge(a, b);
          if(mergedTile != null && !merged.includes(a) && !merged.includes(b)){
            this.tiles[row][col] = new Tile(0);
            this.tiles[row][col + 1] = mergedTile;
            merged.push(mergedTile);

            if(merged.value == 2048) {
             this.won = true;
            }
          } else if (a.value != 0 && b.value == 0) {
            hasMoved = true;
            for (let colMove = col; colMove >= 0; colMove--) {
              this.tiles[row][colMove + 1] = this.tiles[row][colMove];
              this.tiles[row][colMove] = new Tile(0);
            }
          }
        }
      }
    if(merged.length == 0 && hasMoved) {
      console.log("Called fill random");
      this.fillRandom();
    }
  }

  gameLost() {
    if(!isFull()) {
      return false;
    }
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let curTile = this.tiles[row][col];

        if(curTile.value = 0) {
          return false;
        }

        if (row - 1 >= 0) {
          let upNeighbor = this.tiles[row-1][col];
          if (aTile.value == upNeighbor.value) {
            return false;
          }
        }
        if (row + 1 < 4) {
          let downNeighbor = this.tiles[row+1][col];
          if (aTile.value == downNeighbor.value) {
            return false;
          }
        }
        if (col - 1 >= 0) {
          let leftNeighbor = this.tiles[row][col-1];
          if (aTile.value == leftNeighbor.value) {
            return false;
          }
        }
        if (col + 1 < 4) {
          let rightNeighbor = this.tiles[row][col+1];
          if (aTile.value == rightNeighbor.value) {
            return false;
          }
        }
      }
    }
    return true;
  }

  getBoard() {
    return this.tiles;
  }

  #isFull() {
    for (let aRow in this.tiles) {
      for (let aTile in aRow) {
        if(aTile.value == 0) {
          return false;
        }
      }
    }

    return true;
  }

  fillRandom() {
    const min = 0;
    const max = 3;

    let row;
    let col;

    if(this.isFull) {
      return;
    }

    do {
      console.log("generating new random");
      row = Math.floor(Math.random() * (max - min + 1)) + min;
      col = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (this.tiles[row][col].value !== 0);
    
    const chooseTile = Math.random();
    console.log("chooseTile " + chooseTile);
    let tileVal;

    if (chooseTile >= 0.90) {
      tileVal = 4;
    } else  {
      tileVal = 2;
    }

    this.tiles[row][col] = new Tile(tileVal);
    console.log("new tile val: " + tileVal);
  }
}

export default Board;
