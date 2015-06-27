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
        topFace: "greenFace",
        bottomFace: "blueFace",
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

  Game.prototype.performRotateMove = function(face){
    var relFaces = this.getRelativeFaces(face, this);
    face.moveRotate();
    relFaces.topFace.moveD();
    relFaces.bottomFace.moveD();
    relFaces.rightFace.moveD();
    relFaces.leftFace.moveD();


    this.setFaceMoves();
    this.draw(this.ctx);
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
