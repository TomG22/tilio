/**
 * Authors:     Edward Fattell
 * File:        Tile.js
 * Description: Individual tile. "Wrapper" for an int with merge function
 */

class Tile {  
  static allTiles = new Map();

  // constructs a tile object with its values stored in JSON object
  constructor(value, parent1, parent2) {
    this.data = {
      value: value,
      frozen: false,
      id: this.newID(),
      parent1: null,
      parent2: null,
      moveDir: ""
    };

    Tile.allTiles.set(this.data.id, this);


    if (parent1) {
      this.data.parent1 = parent1;
    }

    if (parent2) {
      this.data.parent2 = parent2;
    }
  }


  /**
  * merge returns a new Tile object if the two tile parametes
  * aTile and bTile have equal values that do not equal 0 
  *
  * otherwise returns null
  */
  static merge(aTile, bTile) {
    if (aTile.data.value !== 0 && aTile.data.value === bTile.data.value) {
      const mergedVal = aTile.data.value + bTile.data.value;
      return new Tile(mergedVal, aTile.data.id, bTile.data.id);
    }
    return null;
  }

  /*
  * toString returns a String representation of a tile object
  *
  * used for testing 
  */
  toString() {
    return this.data.value.toString();
  }

  /*
  * freeze freezed its implicit paramter for 30, make it impossible to move or 
  * merge with. Intended to be used as an attack on the live leaderboard.
  */
  freeze() {
    this.data.frozen = true;
    setInterval(() => {
      this.data.frozen = false;
    }, 30000);
  }

  static getTileById(id) {
    return Tile.allTiles.get(id);
  }

  newID() {
    return "" + Date.now() + "+" + Math.random();
  }
}

export default Tile;
