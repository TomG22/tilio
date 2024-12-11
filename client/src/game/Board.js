/**
 * Authors:     Edward Fattell
 * File:        Board.js
 * Description: Represents the 2048 gameboard. Game "backend"/functionality
 */


class Board {
  constructor() {
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
          let a = Tiles[row][col];
          let b = Tiles[row-1][col];
          let mergedTile = Tile.merge(a, b);
          if(mergedTile != 0 && !merged.includes(a) && !merged.includes(b){
            tiles[row][col] = new Tile();
            tiles[row - 1][col] = mergedTile;
            merged.push(mergedTile);
          } else if (b.value == 0) {
            for (let rowMove = row; rowMove < 4; rowMove++) {
              tiles[rowMove - 1][col] = tile[rowMove][col];
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
          let a = Tiles[row][col];
          let b = Tiles[row+1][col];
          let mergedTile = Tile.merge(a, b);
          if(mergedTile != 0 && !merged.includes(a) && !merged.includes(b){
            tiles[row][col] = new Tile();
            tiles[row + 1][col] = mergedTile;
            merged.push(mergedTile);
          } else if (b.value == 0) {
            for (let rowMove = row; rowMove >= 0; rowMove--) {
              tiles[rowMove + 1][col] = tile[rowMove][col];
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
        for (let row = 0; row < 3; row++) {
          let a = Tiles[row][col];
          let b = Tiles[row][col-1];
          let mergedTile = Tile.merge(a, b);
          if(mergedTile != 0 && !merged.includes(a) && !merged.includes(b)){
            tiles[row][col] = new Tile();
            tiles[row][col - 1] = mergedTile;
            merged.push(mergedTile);
          } else if (b.value == 0) {
            for (let colMove = col; colMove >= 0; colMove++) {
              tiles[row][colMove] = tile[row][colMove];
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
      for (let col = 0; col < 3; col+) {
        for (let row = 0; row < 3; row++) {
          let a = Tiles[row][col];
          let b = Tiles[row][col+1];
          let mergedTile = Tile.merge(a, b);
          if(mergedTile != 0 && !merged.includes(a) && !merged.includes(b)){
            tiles[row][col] = new Tile();
            tiles[row][col + 1] = mergedTile;
            merged.push(mergedTile);
          } else if (b.value == 0) {
            for (let colMove = col; colMove >= 0; colMove--) {
              tiles[row][colMove] = tile[row][colMove];
            }
          }
        }
      }
    if(merged.length > 0) {
      fillRandom();
    }
  }

  #fillRandom() {
    const min = 0;
    const max = 3;

    let row;
    let col;

    do {
      let row = Math.floor(Math.random() * (max - min + 1)) + min;
      let col = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (tiles[row][col].value != 0);
    
    const chooseTile = Math.random();
    const tileVal;

    if (chooseTile > 0.90) {
      tileVal = 4;
    } else  {
      tileVal = 2;
    }

    tiles[row][col] = new Tile(tileVal);
  }
}

export default Board;
