(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Face = RubiksTiles.Face = function (opts){
    this.color = opts.color;
    this.windowPlace = opts.windowPlace;

    this.LEFT_FACE_X = opts.leftFaceX;
    this.LEFT_FACE_Y = opts.leftFaceY;
    this.CELL_WIDTH = 50;
    this.FACE_WIDTH = this.CELL_WIDTH * 3;

    this.getBearings();

    this.grid = this.setGrid(
      this.color, [this.faceStartX, this.faceStartY], this.CELL_WIDTH
    );
  };

  Face.prototype.reassignWindowPlace = function(newPlace){
    this.windowPlace = newPlace;
    this.getBearings();
  };

  Face.prototype.getBearings = function(){
    this.facePositionMap = this.setFaceMap(
      this.LEFT_FACE_X, this.LEFT_FACE_Y, this.FACE_WIDTH, this.CELL_WIDTH
    );

    this.faceStartX = this.facePositionMap[this.windowPlace][0];
    this.faceStartY = this.facePositionMap[this.windowPlace][1];
    if(this.grid){
      this.resetCellPos([this.faceStartX, this.faceStartY], this.CELL_WIDTH);
    }
  };


  Face.prototype.setFaceMap = function(leftX, leftY, faceWidth, cellWidth){
    return {
      leftFace: [leftX, leftY],
      centerFace: [faceWidth + leftX, leftY],
      topFace: [faceWidth + leftX, leftY - faceWidth],
      rightFace: [2 * faceWidth + leftX, leftY],
      bottomFace: [faceWidth + leftX, leftY + faceWidth],
      backFace: [leftX - cellWidth, leftY + faceWidth + cellWidth]
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

  Face.prototype.resetCellPos = function(newPos, cellWidth){
    for (var i = 0; i < 3; i++ ){
      for (var j = 0; j < 3; j++){
        this.grid[i][j].pos = [newPos[0] + j * cellWidth, newPos[1] + i * cellWidth];
      }
    }
  };

  Face.prototype.resetGridColor = function(rotatedColorsArray){
    for(var i = 0; i < 3; i++){
      for(var j = 0; j < 3; j++){
        this.grid[i][j].color = rotatedColorsArray[i][j];
      }
    }
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

  Face.prototype.moveRotate = function(){
    var rotatedColorsArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    for(var i = 0; i < 3; i++ ){
      for(var j = 0; j < 3; j++){
        rotatedColorsArray[j][ 2 - i ] = this.grid[i][j].color;
      }
    }

    this.resetGridColor(rotatedColorsArray);
    return this;
  };

  Face.prototype.moveRotateI = function(){
    var rotatedColorsArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    for(var i = 0; i < 3; i++ ){
      for(var j = 0; j < 3; j++){
        rotatedColorsArray[2 - j][ i ] = this.grid[i][j].color;
      }
    }

    this.resetGridColor(rotatedColorsArray);
    return this;
  };


})();
