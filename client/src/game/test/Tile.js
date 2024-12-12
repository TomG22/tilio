/**
 * Authors:     Edward Fattell
 * File:        Tile.js
 * Description: Individual tile. "Wrapper" for an int with merge function
 */

class Tile {
  constructor(value) {
    this.data = {
      value: value,
      frozen: false
    };
  }

  static merge(aTile, bTile) {
    if (aTile.data.value !== 0 && aTile.data.value === bTile.data.value) {
      return new Tile(aTile.data.value + bTile.data.value);
    }
    return null;
  }

  toString() {
    return this.data.value.toString();
  }

  freeze() {
    this.data.frozen = true;
    setInterval(() => {
      this.data.frozen = false;
    }, 30000);
  }
}

export default Tile;
