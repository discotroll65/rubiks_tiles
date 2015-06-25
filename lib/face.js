(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Face = RubiksTiles.Face = function (opts){
    this.CELL_WIDTH = 50;
    this.FACE_WIDTH = this.CELL_WIDTH * 3;
    this.color = opts.color;
    this.windowPlace = opts.windowPlace;
    this.LEFT_X = 250;
    this.LEFT_Y = 350;

    this.faceMap = this.setFaceMap(
      this.LEFT_X, this.LEFT_Y, this.FACE_WIDTH, this.CELL_WIDTH
    );

    this.faceStartX = this.faceMap[this.windowPlace][0];
    this.faceStartY= this.faceMap[this.windowPlace][1];

    this.grid = this.setGrid(
      this.color, [this.faceStartX, this.faceStartY], this.CELL_WIDTH
    );

  };

  Face.prototype.setFaceMap = function(leftX, leftY, faceWidth, cellWidth){
    return {
      leftStart: [leftX, leftY],
      centerStart: [faceWidth + leftX, leftY],
      topStart: [faceWidth + leftX, leftY - faceWidth],
      rightStart: [2 * faceWidth + leftX, leftY],
      bottomStart: [faceWidth + leftX, leftY + faceWidth],
      backStart: [leftX - cellWidth, leftY + faceWidth + cellWidth]
    };
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

  Face.prototype.draw = function(ctx){
    this.grid.forEach(function(row){
      row.forEach(function(cell){
        cell.draw(ctx);
      });
    });

    ctx.beginPath();
    //xstart, y start, width, height
    ctx.rect(
      this.faceStartX, this.faceStartY, this.FACE_WIDTH, this.FACE_WIDTH
    );
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;
    ctx.stroke();
  };


})();
