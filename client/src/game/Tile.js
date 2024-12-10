 class Tile {
   constructor(value) {
     this.value = value;
   }

   function merge(otherTile) {
     return new Tile(this.value + otherTile);
   }
}
