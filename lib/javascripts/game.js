(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Game = RubiksTiles.Game = function(ctx){
    this.DIM_X = 625;
    this.DIM_Y = 560;
    this.leftFaceX = 100;
    this.leftFaceY = 175;
    this.ctx = ctx;
    this.faces = this.makeFaces();

    this.facePerspective = this.getFacePerspective();
  };

  Game.prototype.handleClicks = function(){
    document.getElementsByClassName('scramble')[0]
      .onclick = this.scramble.bind(this);

    // cube rotations
    document.getElementsByClassName('top-controls')[0]
      .onclick = this.performNegativeXRotate.bind(this);
    document.getElementsByClassName('bottom-controls')[0]
      .onclick = this.performPositiveXRotate.bind(this);
    document.getElementsByClassName('right-controls')[0]
      .onclick = this.performPositiveYRotate.bind(this);
    document.getElementsByClassName('left-controls')[0]
      .onclick = this.performNegativeYRotate.bind(this);
    document.getElementsByClassName('clockwise-controls')[0]
      .onclick = this.performNegativeZRotate.bind(this);
    document.getElementsByClassName('counterclockwise-controls')[0]
      .onclick = this.performPositiveZRotate.bind(this);

    // moves
    document.getElementsByClassName('R')[0]
      .onclick = this.performRMove.bind(this);
    document.getElementsByClassName('Ri')[0]
      .onclick = this.performRiMove.bind(this);
    document.getElementsByClassName('L')[0]
      .onclick = this.performLMove.bind(this);
    document.getElementsByClassName('Li')[0]
      .onclick = this.performLiMove.bind(this);
    document.getElementsByClassName('U')[0]
      .onclick = this.performUMove.bind(this);
    document.getElementsByClassName('Ui')[0]
      .onclick = this.performUiMove.bind(this);
    document.getElementsByClassName('D')[0]
      .onclick = this.performDMove.bind(this);
    document.getElementsByClassName('Di')[0]
      .onclick = this.performDiMove.bind(this);
    document.getElementsByClassName('Fi')[0]
      .onclick = this.performFiMove.bind(this);
    document.getElementsByClassName('F')[0]
      .onclick = this.performFMove.bind(this);
    document.getElementsByClassName('B')[0]
      .onclick = this.performBMove.bind(this);
    document.getElementsByClassName('Bi')[0]
      .onclick = this.performBiMove.bind(this);
  };

  Game.prototype.scramble = function(){
    var moves = [
      this.performRMove.bind(this),
      this.performRiMove.bind(this),
      this.performLMove.bind(this),
      this.performLiMove.bind(this),
      this.performUMove.bind(this),
      this.performUiMove.bind(this),
      this.performDMove.bind(this),
      this.performDiMove.bind(this),
      this.performFiMove.bind(this),
      this.performFMove.bind(this),
      this.performBMove.bind(this),
      this.performBiMove.bind(this)
    ];

    for(var i = 0 ; i < 15; i++){
      idx = Math.floor(Math.random() * 13);
      moves[idx]();
    }
  };

  Game.prototype.makeFaces = function(){
    return {
      greenFace: new RubiksTiles.Face({
        color: "green",
        windowPlace: "centerFace",
        leftFaceX: this.leftFaceX,
        leftFaceY: this.leftFaceY
      }),

      whiteFace: new RubiksTiles.Face({
        color: "white",
        windowPlace: "topFace",
        leftFaceX: this.leftFaceX,
        leftFaceY: this.leftFaceY
      }),

      yellowFace: new RubiksTiles.Face({
        color: "yellow",
        windowPlace: "bottomFace",
        leftFaceX: this.leftFaceX,
        leftFaceY: this.leftFaceY
      }),

      orangeFace: new RubiksTiles.Face({
        color: "orange",
        windowPlace: "leftFace",
        leftFaceX: this.leftFaceX,
        leftFaceY: this.leftFaceY
      }),

      redFace: new RubiksTiles.Face({
        color: "red",
        windowPlace: "rightFace",
        leftFaceX: this.leftFaceX,
        leftFaceY: this.leftFaceY
      }),

      blueFace: new RubiksTiles.Face({
        color: "blue",
        windowPlace: "backFace",
        leftFaceX: this.leftFaceX,
        leftFaceY: this.leftFaceY
      })
    };
  };

  Game.prototype.getFacePerspective = function(){
    var perspective = {};
    var that = this;
    Object.keys(this.faces).forEach(function(faceKey){
      var face = that.faces[faceKey];
      perspective[face.windowPlace] = face;
    });
    return perspective;
  };

  Game.prototype.draw = function(){
    var that = this;
    this.ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);

    Object.keys(this.faces).forEach(function(face){
      that.faces[face].draw(that.ctx);
    });
  };
})();
