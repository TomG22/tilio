/**
 * Authors:     Edward Fattell
 * File:        Tile.js
 * Description: Individual tile. "Wrapper" for an int with merge function
 */

class Tile {
   constructor(value) {
     this.value = value;
     this.frozen = false;
   }

   static merge(aTile, bTile) {
     if(aTile.value != 0 && aTile.value == bTile.value)
      return new Tile(aTile.value + bTile.value);
     return null;
   }

  toString() {
    return this.value.toString();
  }

  freeze() {
    this.frozen = true;
    setInterval(() => {
      this.frozen = false;
    }, 30000);
  }
}
export default Tile;
