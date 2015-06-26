(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Face = RubiksTiles.Face = function (opts){
    this.color = opts.color;
    this.windowPlace = opts.windowPlace;
    this.topFace = opts.topFace;
    this.bottomFace = opts.bottomFace;
    this.rightFace = opts.rightFace;
    this.leftFace = opts.leftFace;
    this.backFace = opts.backFace;

    this.LEFT_FACE_X = 250;
    this.LEFT_FACE_Y = 350;
    this.CELL_WIDTH = 50;
    this.FACE_WIDTH = this.CELL_WIDTH * 3;

    this.facePositionMap = this.setFaceMap(
      this.LEFT_FACE_X, this.LEFT_FACE_Y, this.FACE_WIDTH, this.CELL_WIDTH
    );

    this.faceStartX = this.facePositionMap[this.windowPlace][0];
    this.faceStartY= this.facePositionMap[this.windowPlace][1];

    this.grid = this.setGrid(
      this.color, [this.faceStartX, this.faceStartY], this.CELL_WIDTH
    );
    this.movesHash = {};
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

  Face.prototype.moveR = function(){
    this.grid[0][2].color = this.movesHash.R.topRight;
    this.grid[1][2].color = this.movesHash.R.midRight;
    this.grid[2][2].color = this.movesHash.R.bottomRight;
  };

  Face.prototype.moveRi = function(){
    this.grid[0][2].color = this.movesHash.Ri.topRight;
    this.grid[1][2].color = this.movesHash.Ri.midRight;
    this.grid[2][2].color = this.movesHash.Ri.bottomRight;
  };

  Face.prototype.moveL = function(){
    this.grid[0][0].color = this.movesHash.L.topLeft;
    this.grid[1][0].color = this.movesHash.L.midLeft;
    this.grid[2][0].color = this.movesHash.L.bottomLeft;
  };

  Face.prototype.moveL = function(){
    this.grid[0][0].color = this.movesHash.Li.topLeft;
    this.grid[1][0].color = this.movesHash.Li.midLeft;
    this.grid[2][0].color = this.movesHash.Li.bottomLeft;
  };

  Face.prototype.moveU = function(){
    this.grid[0][0].color = this.movesHash.U.leftUp;
    this.grid[0][1].color = this.movesHash.U.middleUp;
    this.grid[0][2].color = this.movesHash.U.rightUp;
  };

  Face.prototype.moveUi = function(){
    this.grid[0][0].color = this.movesHash.Ui.leftUp;
    this.grid[0][1].color = this.movesHash.Ui.middleUp;
    this.grid[0][2].color = this.movesHash.Ui.rightUp;
  };

  Face.prototype.moveD = function(){
    this.grid[2][0].color = this.movesHash.D.leftDown;
    this.grid[2][1].color = this.movesHash.D.middleDown;
    this.grid[2][2].color = this.movesHash.D.rightDown;
  };

  Face.prototype.moveDi = function(){
    this.grid[2][0].color = this.movesHash.Di.leftDown;
    this.grid[2][1].color = this.movesHash.Di.middleDown;
    this.grid[2][2].color = this.movesHash.Di.rightDown;
  };

  Face.prototype.moveRotate = function(){
    var rotatedArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    for(var i = 0; i < 3; i++ ){
      for(var j = 0; j < 3; j++){
        rotatedArray[j][ 2 - i ] = this.grid[i][j];
      }
    }

    this.grid = rotatedArray;
  };

  Face.prototype.moveRotateI = function(){
    var rotatedArray = [
      [null, null, null],
      [null, null, null],
      [null, null, null]
    ];

    for(var i = 0; i < 3; i++ ){
      for(var j = 0; j < 3; j++){
        rotatedArray[2 - j][ i ] = this.grid[i][j];
      }
    }

    this.grid = rotatedArray;
  };

})();
