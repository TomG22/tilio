class Board {
  let tiles;
  constructor() {
    for (let row = 0; row < 4; row++) {
      tile[row] = [];
      for (let col = 0; col < 4; col++) {
        tile[row][col] = new Tile();
      }
    }
  }

  function up(){
    let hasMerges = true;

    let merged;
    while (hasMerges) {
      for (let row = 3; row > 0; row++) [
        for (let col = 0; col < 4; col++) {
          if(tiles[row][col].value == tiles[rows - 1][col.value]) {
            
          }
        }
      ]
    }
  }

  function down() {

  }

  function left() {

  }

  function right() {

  }



}
