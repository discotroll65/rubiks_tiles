(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Game = RubiksTiles.Game = function(ctx){
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.leftFaceX = 50;
    this.leftFaceY = 350;
    this.ctx = ctx;
    this.faces = this.makeFaces();

    this.facePerspective = this.getFacePerspective();
  };

  Game.prototype.makeFaces = function(){
    return {
      greenFace: new RubiksTiles.Face({
        color: "green",
        windowPlace: "centerFace",
      }),

      whiteFace: new RubiksTiles.Face({
        color: "white",
        windowPlace: "topFace",
      }),

      yellowFace: new RubiksTiles.Face({
        color: "yellow",
        windowPlace: "bottomFace",
      }),

      orangeFace: new RubiksTiles.Face({
        color: "orange",
        windowPlace: "leftFace",
      }),

      redFace: new RubiksTiles.Face({
        color: "red",
        windowPlace: "rightFace",
      }),

      blueFace: new RubiksTiles.Face({
        color: "blue",
        windowPlace: "backFace",
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
