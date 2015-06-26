(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Game = RubiksTiles.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.leftFaceX = 50;
    this.leftFaceY = 350;

    this.faces = {
      greenFace: new RubiksTiles.Face({
        color: "green",
        windowPlace: "centerStart",
        topFace: "white",
        bottomFace: "yellow",
        leftFace: "orange",
        rightFace: "red",
        backFace: "blue"
      }),

      whiteFace: new RubiksTiles.Face({
        color: "white",
        windowPlace: "topStart",
        topFace: "blue",
        bottomFace: "green",
        leftFace: "orange",
        rightFace: "red",
        backFace: "yellow"
      }),

      yellowFace: new RubiksTiles.Face({
        color: "yellow",
        windowPlace: "bottomStart",
        topFace: "green",
        bottomFace: "blue",
        leftFace: "orange",
        rightFace: "red",
        backFace: "white"
      }),

      orangeFace: new RubiksTiles.Face({
        color: "orange",
        windowPlace: "leftStart",
        topFace: "white",
        bottomFace: "yellow",
        leftFace: "blue",
        rightFace: "green",
        backFace: "red"
      }),

      redFace: new RubiksTiles.Face({
        color: "red",
        windowPlace: "rightStart",
        topFace: "white",
        bottomFace: "yellow",
        leftFace: "orange",
        rightFace: "red",
        backFace: "blue"
      }),

      blueFace: new RubiksTiles.Face({
        color: "blue",
        windowPlace: "backStart",
        topFace: "white",
        bottomFace: "yellow",
        leftFace: "red",
        rightFace: "orange",
        backFace: "green"
      })
    };
  };

  Game.prototype.draw = function(ctx){
    var that = this;
    ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);
    Object.keys(this.faces).forEach(function(face){
      that.faces[face].draw(ctx);
    });

  };

})();
