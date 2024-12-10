/**
 * Authors:     Edward Fattell
 * File:        Tile.js
 * Description: Individual tile. "Wrapper" for an int with merge function
 */

class Tile {
   constructor(value) {
     this.value = value;
   }

   function merge(otherTile) {
     return new Tile(this.value + otherTile);
   }
}
