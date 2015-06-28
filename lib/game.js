(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Game = RubiksTiles.Game = function(ctx){
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.leftFaceX = 50;
    this.leftFaceY = 350;
    this.ctx = ctx;
    this.facePerspective = this.initialFacePerspective();

    this.faces = this.makeFaces();
    this.setFaceMoves();
  };

  Game.prototype.initialFacePerspective = function(){
    return {
      centerFace: "greenFace",
      topFace: "whiteFace",
      bottomFace: "yellowFace",
      leftFace: "orangeFace",
      rightFace: "redFace",
      backFace: "blueFace"
    };
  };

  Game.prototype.makeFaces = function(){
    return {
      greenFace: new RubiksTiles.Face({
        color: "green",
        windowPlace: "centerStart",
        topFace: "whiteFace",
        bottomFace: "yellowFace",
        leftFace: "orangeFace",
        rightFace: "redFace",
        backFace: "blueFace"
      }),

      whiteFace: new RubiksTiles.Face({
        color: "white",
        windowPlace: "topStart",
        topFace: "blueFace",
        bottomFace: "greenFace",
        leftFace: "orangeFace",
        rightFace: "redFace",
        backFace: "yellowFace"
      }),

      yellowFace: new RubiksTiles.Face({
        color: "yellow",
        windowPlace: "bottomStart",
        topFace: "blueFace",
        bottomFace: "greenFace",
        leftFace: "redFace",
        rightFace: "orangeFace",
        backFace: "whiteFace"
      }),

      orangeFace: new RubiksTiles.Face({
        color: "orange",
        windowPlace: "leftStart",
        topFace: "blueFace",
        bottomFace: "greenFace",
        leftFace: "yellowFace",
        rightFace: "whiteFace",
        backFace: "redFace"
      }),

      redFace: new RubiksTiles.Face({
        color: "red",
        windowPlace: "rightStart",
        topFace: "blueFace",
        bottomFace: "greenFace",
        leftFace: "whiteFace",
        rightFace: "yellowFace",
        backFace: "orangeFace"
      }),

      blueFace: new RubiksTiles.Face({
        color: "blue",
        windowPlace: "backStart",
        topFace: "whiteFace",
        bottomFace: "yellowFace",
        leftFace: "redFace",
        rightFace: "orangeFace",
        backFace: "greenFace"
      })
    };
  };

  Game.prototype.performFMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    face.moveRotate();

    this.handleFandFiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performFiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    face.moveRotateI();

    this.handleFandFiMoves({inverse: true, relFaces: relFaces});

    this.draw(this.ctx);
  };

  Game.prototype.handleFandFiMoves = function(options){
    var relFaces = options.relFaces;

    var oldBottomRowOfTop = relFaces.topFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldRightColOfLeft = [
      relFaces.leftFace.grid[2][2].color, relFaces.leftFace.grid[1][2].color,
      relFaces.leftFace.grid[0][2].color
    ];
    var oldTopRowOfBottom = relFaces.bottomFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldLeftColOfRight = [
      relFaces.rightFace.grid[2][0].color, relFaces.rightFace.grid[1][0].color,
      relFaces.rightFace.grid[0][0].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2][i].color =  oldLeftColOfRight.reverse()[i];
        relFaces.leftFace.grid[i][2].color = oldBottomRowOfTop.reverse()[i];
        relFaces.bottomFace.grid[0][i].color = oldRightColOfLeft.reverse()[i];
        relFaces.rightFace.grid[i][0].color = oldTopRowOfBottom.reverse()[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2][i].color = oldRightColOfLeft[i];
        relFaces.leftFace.grid[i][2].color = oldTopRowOfBottom[i];
        relFaces.bottomFace.grid[0][i].color = oldLeftColOfRight[i];
        relFaces.rightFace.grid[i][0].color = oldBottomRowOfTop[i];
      }
    }
  };

  Game.prototype.performBMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.backFace.moveRotate();

    this.handleBandBiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performBiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.backFace.moveRotateI();

    this.handleBandBiMoves({inverse: true, relFaces: relFaces});

    this.draw(this.ctx);
  };

  Game.prototype.handleBandBiMoves = function(options){
    var relFaces = options.relFaces;

    var oldTopRowOfTop = relFaces.topFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldLeftColOfLeft = [
      relFaces.leftFace.grid[2][0].color, relFaces.leftFace.grid[1][0].color,
      relFaces.leftFace.grid[0][0].color
    ];
    var oldBottomRowOfBottom = relFaces.bottomFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldRightColOfRight = [
      relFaces.rightFace.grid[2][2].color, relFaces.rightFace.grid[1][2].color,
      relFaces.rightFace.grid[0][2].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[0][i].color =  oldLeftColOfLeft[i];
        relFaces.leftFace.grid[i][0].color = oldBottomRowOfBottom[i];
        relFaces.bottomFace.grid[2][i].color = oldRightColOfRight[i];
        relFaces.rightFace.grid[i][2].color = oldTopRowOfTop[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[0][i].color =  oldRightColOfRight.reverse()[i];
        relFaces.leftFace.grid[i][0].color = oldTopRowOfTop.reverse()[i];
        relFaces.bottomFace.grid[2][i].color = oldLeftColOfLeft.reverse()[i];
        relFaces.rightFace.grid[i][2].color = oldBottomRowOfBottom.reverse()[i];
      }
    }
  };

  Game.prototype.performRMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.rightFace.moveRotate();

    this.handleRandRiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performRiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.rightFace.moveRotateI();

    this.handleRandRiMoves({inverse: true, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.handleRandRiMoves = function(options){
    var relFaces = options.relFaces;
    var face = this.faces[this.facePerspective.centerFace];

    var oldRightColOfCenter = [
      face.grid[2][2].color, face.grid[1][2].color,
      face.grid[0][2].color
    ];

    var oldRightColOfTop = [
      relFaces.topFace.grid[2][2].color, relFaces.topFace.grid[1][2].color,
      relFaces.topFace.grid[0][2].color
    ];

    var oldRightColOfBottom = [
      relFaces.bottomFace.grid[2][2].color, relFaces.bottomFace.grid[1][2].color,
      relFaces.bottomFace.grid[0][2].color
    ];

    var oldLeftColOfBack = [
      relFaces.backFace.grid[2][0].color, relFaces.backFace.grid[1][0].color,
      relFaces.backFace.grid[0][0].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2 - i][2].color = oldLeftColOfBack[i];
        face.grid[2 - i][2].color = oldRightColOfTop[i];
        relFaces.bottomFace.grid[2 - i][2].color = oldRightColOfCenter[i];
        relFaces.backFace.grid[2 - i][0].color = oldRightColOfBottom[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2 - i][2].color = oldRightColOfCenter[i];
        face.grid[2 - i][2].color = oldRightColOfBottom[i];
        relFaces.bottomFace.grid[2 - i][2].color = oldLeftColOfBack[i];
        relFaces.backFace.grid[2 - i][0].color = oldRightColOfTop[i];
      }
    }
  };

  Game.prototype.performLMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.leftFace.moveRotate();

    this.handleLandLiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performLiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.leftFace.moveRotateI();

    this.handleLandLiMoves({inverse: true, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.handleLandLiMoves = function(options){
    var relFaces = options.relFaces;
    var face = this.faces[this.facePerspective.centerFace];

    var oldLeftColOfCenter = [
      face.grid[2][0].color, face.grid[1][0].color,
      face.grid[0][0].color
    ];

    var oldLeftColOfTop = [
      relFaces.topFace.grid[2][0].color, relFaces.topFace.grid[1][0].color,
      relFaces.topFace.grid[0][0].color
    ];

    var oldLeftColOfBottom = [
      relFaces.bottomFace.grid[2][0].color, relFaces.bottomFace.grid[1][0].color,
      relFaces.bottomFace.grid[0][0].color
    ];

    var oldRightColOfBack = [
      relFaces.backFace.grid[2][2].color, relFaces.backFace.grid[1][2].color,
      relFaces.backFace.grid[0][2].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2 - i][0].color = oldLeftColOfCenter[i];
        face.grid[2 - i][0].color = oldLeftColOfBottom[i];
        relFaces.bottomFace.grid[2 - i][0].color = oldRightColOfBack[i];
        relFaces.backFace.grid[2 - i][2].color = oldLeftColOfTop[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2 - i][0].color = oldRightColOfBack[i];
        face.grid[2 - i][0].color = oldLeftColOfTop[i];
        relFaces.bottomFace.grid[2 - i][0].color = oldLeftColOfCenter[i];
        relFaces.backFace.grid[2 - i][2].color = oldLeftColOfBottom[i];
      }
    }
  };

  Game.prototype.draw = function(){
    var that = this;
    this.ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
    Object.keys(this.faces).forEach(function(face){
      that.faces[face].draw(that.ctx);
    });
  };


  Game.prototype.setFaceMoves = function(){
    var that = this;
    Object.keys(this.faces).forEach(function(faceColor){
      var faceReference = that.faces[faceColor];
      that.setMovesHash(faceReference, that);
    });
  };

  Game.prototype.setMovesHash= function(faceReference, that){
    var relFaces = that.getRelativeFaces(faceReference, that);

    faceReference.movesHash.R = that.setR( relFaces.bottomFace );
    faceReference.movesHash.Ri = that.setR( relFaces.topFace );
    faceReference.movesHash.L = that.setL( relFaces.topFace );
    faceReference.movesHash.Li = that.setL( relFaces.bottomFace );

    faceReference.movesHash.U = that.setU( relFaces.rightFace );
    faceReference.movesHash.Ui = that.setU( relFaces.leftFace );
    faceReference.movesHash.D = that.setD( relFaces.leftFace );
    faceReference.movesHash.Di = that.setD( relFaces.rightFace );
  };

  Game.prototype.getRelativeFaces = function(faceReference, that){
    var topFace = that.faces[faceReference.topFace];
    var bottomFace = that.faces[faceReference.bottomFace];
    var leftFace = that.faces[faceReference.leftFace];
    var rightFace = that.faces[faceReference.rightFace];
    var backFace = that.faces[faceReference.backFace];
    return {
      topFace: topFace,
      bottomFace: bottomFace,
      leftFace: leftFace,
      rightFace: rightFace,
      backFace: backFace
    };
  };

  Game.prototype.setR = function( face ){
    return {
      topRight: face.grid[0][2].color,
      midRight: face.grid[1][2].color,
      bottomRight: face.grid[2][2].color
    };
  };

  Game.prototype.setL = function( face ){
    return {
      topLeft: face.grid[0][0].color,
      midLeft: face.grid[1][0].color,
      bottomLeft: face.grid[2][0].color
    };
  };

  Game.prototype.setU = function(face){
    return {
      leftUp: face.grid[0][0].color,
      middleUp: face.grid[0][1].color,
      rightUp: face.grid[0][2].color
    };
  };

  Game.prototype.setD = function(face){
    return {
      leftDown: face.grid[2][0].color,
      middleDown: face.grid[2][1].color,
      rightDown: face.grid[2][2].color
    };
  };

})();
