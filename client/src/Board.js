/**
 * Authors:     Edward Fattell
 * File:        Board.js
 * Description: Represents the 2048 gameboard. Game "backend"/functionality
 */

import Tile from './Tile.js';

class Board {
  constructor(oldBoard) {
    if (oldBoard == null) {
      // Default constructor: creates a brand new board
      this.won = false;
      this.tiles = [];
      this.score = 0;
      for (let row = 0; row < 4; row++) {
        this.tiles[row] = [];
        for (let col = 0; col < 4; col++) {
          this.tiles[row][col] = new Tile(0, null, null);
        }
      }
      this.fillRandom();
      this.fillRandom();
    } else {
      this.score = oldBoard.score;
      this.won = oldBoard.won;
      this.tiles = oldBoard.tiles;
    }
  }

  /*
  * function called by client frontend to correspond to the user
  * pressing an up key
  */
  up(){
    let movedCount = 0;

    movedCount += this.moveUp();
    let merged = [];
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        let a = this.tiles[row][col];
        let b = this.tiles[row+1][col];

        if (a.data.frozen === true || b.data.frozen === true) {
          continue;
        }

        //console.log("atile.data.value: " + a.data.value);
        let mergedTile = Tile.merge(a, b);
        //console.log("merged tile: " + mergedTile);
        if(mergedTile != null && !merged.includes(a) && !merged.includes(b)){
          this.tiles[row][col] = mergedTile;
          this.tiles[row + 1][col] = new Tile(0);
          merged.push(mergedTile);
          this.score += mergedTile.data.value;  // UPDATE SCORE
          if(mergedTile.data.value === 2048) {
            this.won = true;
          }
        }
      }
    }
    movedCount += this.moveUp();
    movedCount += merged.length;
    //console.log("hasMoved" + movedCount);
    if(movedCount > 0) {
      //console.log("Called fill random");
      this.fillRandom();
    }
    //console.log("Won: " + this.won);
    //console.log("Lost: " + this.#gameLost());
  }

  /*
   * helper method that moves all tiles in the board to the northern
   * most position
   */
  moveUp() {
    let result = 0;
    for (let col = 0; col < 4; col++) {
      for(let row = 1; row < 4; row++) {
        // iterate over all previous rows
        for (let prevRow = row -1; prevRow >= 0; prevRow--) {
          // if the previous row has an empty.data.value, swap with the prev + 1 row
          if (this.tiles[prevRow][col].data.value === 0 && this.tiles[prevRow+1][col].data.value !== 0) {
            if(this.tiles[prevRow][col].data.frozen || this.tiles[prevRow+1][col].data.frozen) {
              continue;
            }
            this.tiles[prevRow][col].moveDir = "up";
            this.tiles[prevRow][col] = this.tiles[prevRow + 1][col]
            this.tiles[prevRow + 1][col] = new Tile(0);
            result += 1;
          }
        }
      }
    }
    return result;
  }

  /*
  * function called by client frontend to correspond to the user
  * pressing an down key
  */
  down() {
    let movedCount = 0;

    let merged = [];
    movedCount += this.moveDown();
    for (let row = 3; row > 0; row--) {
      for (let col = 0; col < 4; col++) {
        let a = this.tiles[row][col];
        let b = this.tiles[row-1][col];

        if (a.data.frozen === true || b.data.frozen === true) {
          continue;
        }

        //console.log("atile.data.value: " + a.data.value);
        let mergedTile = Tile.merge(a, b);
        //console.log("merged tile: " + mergedTile);
        if(mergedTile != null && !merged.includes(a) && !merged.includes(b)){
          this.tiles[row][col] = mergedTile;
          this.tiles[row - 1][col] = new Tile(0);
          merged.push(mergedTile);
          this.score += mergedTile.data.value;  // UPDATE SCORE
          if(mergedTile.data.value === 2048) {
            this.won = true;
          }
        }
      }
    }
    movedCount += this.moveDown();
    movedCount += merged.length;
    if(movedCount > 0) {
      //console.log("Called fill random");
      this.fillRandom();
    }
    //console.log("Won: " + this.won);
    //console.log("Lost: " + this.#gameLost());
  }

  /*
   * helper method that moves all tiles in the board to the southern 
   * most position
   */
  moveDown() {
    let result = 0;
    for (let col = 0; col < 4; col++) {
      for(let row = 2; row >= 0; row--) {
        // iterate over all previous rows
        for (let prevRow = row +1; prevRow < 4; prevRow++) {
          // if the previous row has an empty.data.value, swap with the prev + 1 row
          if (this.tiles[prevRow][col].data.value === 0 && this.tiles[prevRow-1][col].data.value !== 0) {
            if(this.tiles[prevRow][col].data.frozen || this.tiles[prevRow-1][col].data.frozen) {
              continue;
            }
            this.tiles[prevRow][col].moveDir = "down";
            this.tiles[prevRow][col] = this.tiles[prevRow -1][col]
            this.tiles[prevRow - 1][col] = new Tile(0);
            result += 1;
          }
        }
      }
    }
    return result;
  }

  /*
  * function called by client frontend to correspond to the user
  * pressing a left key
  */
  left(){
    let movedCount = 0;

    this.movedCount += this.moveLeft();
    let merged = [];
    for (let col = 0; col < 3; col++) {
      for (let row = 0; row < 4; row++) {
        let a = this.tiles[row][col];
        let b = this.tiles[row][col+1];

        if (a.data.frozen === true || b.data.frozen === true) {
          continue;
        }

        //console.log("atile.data.value: " + a.data.value);
        let mergedTile = Tile.merge(a, b);
        //console.log("merged tile: " + mergedTile);
        if(mergedTile != null && !merged.includes(a) && !merged.includes(b)){
          this.tiles[row][col] = mergedTile;
          this.tiles[row][col+1] = new Tile(0);
          merged.push(mergedTile);
          this.score += mergedTile.data.value;  // UPDATE SCORE
          if(mergedTile.data.value === 2048) {
            this.won = true;
          }
        }
      }
    }
    movedCount += this.moveLeft();
    movedCount += merged.length;
    //console.log("merge length" + merged.length);
    if(movedCount > 0) {
      //console.log("Called fill random");
      this.fillRandom();
    }
    //console.log("Won: " + this.won);
    //console.log("Lost: " + this.#gameLost());
  }

  /*
   * helper method that moves all tiles in the board to the western 
   * most position
   */
  moveLeft() {
    let result = 0;
    for (let col = 1; col < 4; col++) {
      for(let row = 0; row < 4; row++) {
        // iterate over all previous rows
        for (let prevCol = col -1; prevCol >= 0; prevCol--) {
          // if the previous row has an empty.data.value, swap with the prev + 1 row
          if (this.tiles[row][prevCol].data.value === 0 && this.tiles[row][prevCol+1].data.value !== 0) {
              if(this.tiles[row][prevCol].data.frozen || this.tiles[row][prevCol+1].data.frozen) {
                continue;
              }
            this.tiles[row][prevCol].moveDir = "left";
            this.tiles[row][prevCol] = this.tiles[row][prevCol+1];
            this.tiles[row][prevCol+1] = new Tile(0);
            result += 1;
          }
        }
      }
    }
    return result;
  }
  /*
  * function called by client frontend to correspond to the user
  * pressing a right key
  */
  right(){
    let movedCount = 0;

    movedCount += this.moveRight();
    let merged = [];
    for (let col = 3; col > 0; col--) {
      for (let row = 0; row < 4; row++) {
        let a = this.tiles[row][col];
        let b = this.tiles[row][col-1];

        if (a.data.frozen === true || b.data.frozen === true) {
          continue;
        }

        //console.log("atile.data.value: " + a.data.value);
        let mergedTile = Tile.merge(a, b);
        //console.log("merged tile: " + mergedTile);
        if(mergedTile != null && !merged.includes(a) && !merged.includes(b)){
          this.tiles[row][col] = mergedTile;
          this.tiles[row][col-1] = new Tile(0);
          merged.push(mergedTile);
          this.score += mergedTile.data.value;  // UPDATE SCORE
          if(mergedTile.data.value === 2048) {
            this.won = true;
          }
        }
      }
    }
    movedCount += this.moveRight();
    movedCount += merged.length;
    //console.log("merge length" + merged.length);
    if(movedCount > 0) {
      //console.log("Called fill random");
      this.fillRandom();
    }
    //console.log("Won: " + this.won);
    //console.log("Lost: " + this.#gameLost());
  }

  /*
   * helper method that moves all tiles in the board to the eastern 
   * most position
   */
  moveRight() {
    let result = 0;
    for (let col = 2; col >= 0; col--) {
      for(let row = 0; row < 4; row++) {
        // iterate over all previous rows
        for (let prevCol = col + 1; prevCol < 4; prevCol++) {
          // if the previous row has an empty.data.value, swap with the prev + 1 row
          if (this.tiles[row][prevCol].data.value === 0 && this.tiles[row][prevCol-1].data.value !== 0) {
            if(this.tiles[row][prevCol].data.frozen || this.tiles[row][prevCol-1].data.frozen) {
              continue;
            }
            this.tiles[row][col].moveDir = "right";
            this.tiles[row][prevCol] = this.tiles[row][prevCol-1];
            this.tiles[row][prevCol-1] = new Tile(0);
            result += 1;
          }
        }
      }
    }
    return result;
  }

  /*
  * private helper method used to check if the game was lost
  */
  gameLost() {
    if(!this.isFull()) {
      return false;
    }
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        let curTile = this.tiles[row][col];

        if(curTile.data.value === 0) {
          return false;
        }

        if (row - 1 >= 0) {
          let upNeighbor = this.tiles[row-1][col];
          if (curTile.data.value === upNeighbor.data.value) {
            return false;
          }
        }
        if (row + 1 < 4) {
          let downNeighbor = this.tiles[row+1][col];
          if (curTile.data.value === downNeighbor.data.value) {
            return false;
          }
        }
        if (col - 1 >= 0) {
          let leftNeighbor = this.tiles[row][col-1];
          if (curTile.data.value === leftNeighbor.data.value) {
            return false;
          }
        }
        if (col + 1 < 4) {
          let rightNeighbor = this.tiles[row][col+1];
          if (curTile.data.value === rightNeighbor.data.value) {
            return false;
          }
        }
      }
    }
    return true;
  }

  /*
  * isFull is a private helper method to check if the board is full
  */
  isFull() {
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        if(this.tiles[row][col].data.value === 0) {
          return false;
        }
      }
    }

    return true;
  }


  /*
  * fillRandom creates a new Tile with a value of 1 or 2
  * and places it in an random empty index of the board
  *
  * will produce a 2 Tile 90% of the time and a 4 Tile 
  * the other 10%
  */
  fillRandom() {
    const min = 0;
    const max = 3;

    let row;
    let col;

    //if(this.isFull) {
    //  return;
    //}

    do {
      row = Math.floor(Math.random() * (max - min + 1)) + min;
      col = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (this.tiles[row][col].data.value !== 0);
    
    const chooseTile = Math.random();
    let tileVal;

    if (chooseTile >= 0.90) {
      tileVal = 4;
    } else  {
      tileVal = 2;
    }

    this.tiles[row][col] = new Tile(tileVal);
  }

  /*
  * freezes the second largest tile in the gameboard for 30
  * seconds
  */
  freezeTile() {
    let largest = null;
    let secondLargest = null;

    for (let row = 0; row < 4; row++) {
      for(let col = 0; col < 4; col++) {
        let aTile = this.tiles[row][col];
        if (largest == null ) {
          largest = aTile;
          continue;
        } else if (secondLargest == null && aTile.data.value <= largest.data.value) {
          secondLargest = aTile;
          continue;
        }

        if(aTile.data.value > largest.data.value) {
          secondLargest = largest;
          largest = aTile;
        } else if (secondLargest != null && aTile.data.value > secondLargest.data.value) {
          secondLargest = aTile;
        }
      }
    }

    if(secondLargest != null) {
      secondLargest.freeze();
    } else if(largest != null){
      largest.freeze();
    }
  }

  getTiles() {
    return this.tiles;
  }

  getTilesData() {
    let result = [];
    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        result.push(this.tiles[row][col].data);
      }
    }
    return result;
  }

  toString() {
    let result = "";
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 4; j++) {

        result += this.tiles[i][j].toString();
      }
    }
    return result;
  }

  getScore() {
    return this.score;
  }
}
export default Board;
