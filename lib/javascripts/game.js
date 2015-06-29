(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Game = RubiksTiles.Game = function(ctx){
    this.DIM_X = 650;
    this.DIM_Y = 650;
    this.leftFaceX = 100;
    this.leftFaceY = 225;
    this.ctx = ctx;
    this.faces = this.makeFaces();

    this.facePerspective = this.getFacePerspective();
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
