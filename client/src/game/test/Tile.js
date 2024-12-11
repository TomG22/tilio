/**
 * Authors:     Edward Fattell
 * File:        Tile.js
 * Description: Individual tile. "Wrapper" for an int with merge function
 */

class Tile {
   constructor(value) {
     this.value = value;
   }

   static merge(aTile, bTile) {
     if(aTile.value != 0 && aTile.value == bTile.value)
      return new Tile(aTile.value + bTile.value);
     return null;
   }

  toString() {
    return this.value.toString();
  }
}
export default Tile;
