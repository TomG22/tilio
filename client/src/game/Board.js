/**
 * Authors:     Edward Fattell
 * File:        Board.js
 * Description: Represents the 2048 gameboard. Game "backend"/functionality
 */



class Board {
  constructor() {
    this.won = false;
    for (let row = 0; row < 4; row++) {
      this.tiles[row] = [];
      for (let col = 0; col < 4; col++) {
        tile[row][col] = new Tile();
      }
    }
  }

  up(){
    let hasMerges = true;

    let merged;
      for (let row = 3; row > 0; row--) {
        for (let col = 0; col < 4; col++) {
          let a = this.tiles[row][col];
          let b = this.tiles[row-1][col];
          let mergedTile = Tile.merge(a, b);
          if(mergedTile != 0 && !merged.includes(a) && !merged.includes(b){
            this.tiles[row][col] = new Tile();
            this.tiles[row - 1][col] = mergedTile;
            merged.push(mergedTile);
            if(merged.value == 2048) {
             this.won = true;
            }
          } else if (b.value == 0) {
            for (let rowMove = row; rowMove < 4; rowMove++) {
              this.tiles[rowMove - 1][col] = tile[rowMove][col];
            }
          }
        }
      }
    if(merged.length > 0) {
      fillRandom();
    }
  }

  down() {
    let hasMerges = true;

    let merged;
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
          let a = this.tiles[row][col];
          let b = this.tiles[row+1][col];
          let mergedTile = Tile.merge(a, b);
          if(mergedTile != 0 && !merged.includes(a) && !merged.includes(b){
            this.tiles[row][col] = new Tile();
            this.tiles[row + 1][col] = mergedTile;
            merged.push(mergedTile);

            if(merged.value == 2048) {
             this.won = true;
            }
          } else if (b.value == 0) {
            for (let rowMove = row; rowMove >= 0; rowMove--) {
              this.tiles[rowMove + 1][col] = tile[rowMove][col];
            }
          }
        }
      }
    if(merged.length > 0) {
      fillRandom();
    }
  }

  left() {
    // TODO:

    let hasMerges = true;

    let merged;
      for (let col = 4; col > 0; col--) {
        for (let row = 0; row < 4; row++) {
          let a = this.tiles[row][col];
          let b = this.tiles[row][col-1];
          let mergedTile = Tile.merge(a, b);
          if(mergedTile != 0 && !merged.includes(a) && !merged.includes(b)){
            this.tiles[row][col] = new Tile();
            this.tiles[row][col - 1] = mergedTile;
            merged.push(mergedTile);

            if(merged.value == 2048) {
             this.won = true;
            }
          } else if (b.value == 0) {
            for (let colMove = col; colMove >= 0; colMove++) {
              this.tiles[row][colMove + 1] = tile[row][colMove];
            }
          }
        }
      }
    if(merged.length > 0) {
      fillRandom();
    }
  }

  right() {
    // TODO:

    let hasMerges = true;

    let merged;
      for (let col = 0; col < 3; col++) {
        for (let row = 0; row < 4; row++) {
          let a = this.tiles[row][col];
          let b = this.tiles[row][col+1];
          let mergedTile = Tile.merge(a, b);
          if(mergedTile != 0 && !merged.includes(a) && !merged.includes(b)){
            this.tiles[row][col] = new Tile();
            this.tiles[row][col + 1] = mergedTile;
            merged.push(mergedTile);

            if(merged.value == 2048) {
             this.won = true;
            }
          } else if (b.value == 0) {
            for (let colMove = col; colMove >= 0; colMove--) {
              this.tiles[row][colMove - 1] = tile[row][colMove];
            }
          }
        }
      }
    if(merged.length > 0) {
      fillRandom();
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

  #isFull() {
    for (let aTile in this.tiles) {
      if(aTile.value == 0) {
        return false;
      }
    }

    return true;
  }

  #fillRandom() {
    const min = 0;
    const max = 3;

    let row;
    let col;

    do {
      let row = Math.floor(Math.random() * (max - min + 1)) + min;
      let col = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (this.tiles[row][col].value != 0);
    
    const chooseTile = Math.random();
    const tileVal;

    if (chooseTile > 0.90) {
      tileVal = 4;
    } else  {
      tileVal = 2;
    }

    this.tiles[row][col] = new Tile(tileVal);
  }
}

export default Board;
