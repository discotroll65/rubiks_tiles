(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Game = RubiksTiles.Game = function(ctx){
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.leftFaceX = 50;
    this.leftFaceY = 350;
    this.ctx = ctx;

    this.faces = this.makeFaces();
    this.setFaceMoves();
  };

  Game.prototype.performRotateMove = function(face){
    debugger
    var relFaces = this.getRelativeFaces(face, this);
    face.moveRotate();
    relFaces.topFace.moveR();
    relFaces.bottomFace.moveR();
    relFaces.rightFace.moveR();
    relFaces.leftFace.moveR();


    this.setFaceMoves();
    this.draw(this.ctx);
    // face.setMovesHash();
    // relFaces.topFace.setMovesHash();
    // relFaces.bottomFace.setMovesHash();
    // relFaces.rightFace.setMovesHash();
    // relFaces.leftFace.setMovesHash();
    // relFaces.

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
    faceReference.movesHash.L = that.setL( relFaces.bottomFace );
    faceReference.movesHash.Ri = that.setR( relFaces.topFace );
    faceReference.movesHash.Li = that.setL( relFaces.topFace );

    faceReference.movesHash.U = that.setU( relFaces.bottomFace );
    faceReference.movesHash.D = that.setD( relFaces.bottomFace );
    faceReference.movesHash.Ui = that.setU( relFaces.topFace );
    faceReference.movesHash.Di = that.setD( relFaces.topFace );
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
      leftTop: face.grid[0][0].color,
      middleTop: face.grid[0][1].color,
      rightTop: face.grid[0][2].color
    };
  };

  Game.prototype.setD = function(face){
    return {
      leftDown: face.grid[2][0].color,
      middleDown: face.grid[2][1].color,
      rightDown: face.grid[2][2].color
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
        topFace: "greenFace",
        bottomFace: "blueFace",
        leftFace: "orangeFace",
        rightFace: "redFace",
        backFace: "whiteFace"
      }),

      orangeFace: new RubiksTiles.Face({
        color: "orange",
        windowPlace: "leftStart",
        topFace: "whiteFace",
        bottomFace: "yellowFace",
        leftFace: "blueFace",
        rightFace: "greenFace",
        backFace: "redFace"
      }),

      redFace: new RubiksTiles.Face({
        color: "red",
        windowPlace: "rightStart",
        topFace: "whiteFace",
        bottomFace: "yellowFace",
        leftFace: "orangeFace",
        rightFace: "redFace",
        backFace: "blueFace"
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

})();
