/**
 * Authors:     Edward Fattell
 * File:        Tile.js
 * Description: Individual tile. "Wrapper" for an int with merge function
 */

class Tile {
  // constructs a tile object with its values stored in JSON object
  constructor(value) {
    this.data = {
      value: value,
      frozen: false
    };

  }

  /**
  * merge returns a new Tile object if the two tile parametes
  * aTile and bTile have equal values that do not equal 0 
  *
  * otherwise returns null
  */
  static merge(aTile, bTile) {
    if (aTile.data.value !== 0 && aTile.data.value === bTile.data.value) {
      return new Tile(aTile.data.value + bTile.data.value);
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
}

export default Tile;
