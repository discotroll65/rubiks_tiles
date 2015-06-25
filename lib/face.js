(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Face = RubiksTiles.Face = function (opts){
    this.CELL_WIDTH = 50;
    this.FACE_WIDTH = this.CELL_WIDTH * 3;
    this.color = opts.color;
    this.windowPlace = opts.windowPlace;
    this.LEFT_X = 50;
    this.LEFT_Y = 350;

    this.faceMap = {
      leftStart: [this.LEFT_X, this.LEFT_Y],
      centerStart: [this.FACE_WIDTH + this.LEFT_X, this.LEFT_Y],
      topStart: [this.FACE_WIDTH + this.LEFT_X, this.LEFT_Y - this.FACE_WIDTH],
      rightStart: [2 * this.FACE_WIDTH + this.LEFT_X, this.LEFT_Y],
      bottomStart: [this.FACE_WIDTH + this.LEFT_X, this.LEFT_Y + this.FACE_WIDTH],
      backStart: [this.LEFT_X - this.CELL_WIDTH, this.LEFT_Y + this.FACE_WIDTH + this.CELL_WIDTH]
    };

    this.faceStart = this.faceMap[this.windowPlace];




    this.grid = this.setGrid(this.color, this.faceStart, this.CELL_WIDTH);

    // [
    //   [new RubiksTiles.Cell(this.color, [100, 100]), new RubiksTiles.Cell(this.color, [200,100]), new RubiksTiles.Cell(this.color, [300, 100])],
    //   [new RubiksTiles.Cell(this.color, [100, 200]), new RubiksTiles.Cell(this.color, [200,200]), new RubiksTiles.Cell(this.color, [300, 200])],
    //   [new RubiksTiles.Cell(this.color, [100, 300]), new RubiksTiles.Cell(this.color, [200,300]), new RubiksTiles.Cell(this.color, [300, 300])]
    // ];
  };

  Face.prototype.setGrid = function(color, pos, cellWidth){
    var gridArray = [];
    for (var i= 0; i <= 2; i++){
      var rowArray = [];
      for ( var j = 0; j<= 2; j++){
        rowArray.push(new RubiksTiles.Cell({
            color: color,
            pos: [pos[0] + j * cellWidth, pos[1] + i * cellWidth ],
            cellWidth: cellWidth
          })
        );
      }
      gridArray.push(rowArray);
    }
    return gridArray;
  };


})();
