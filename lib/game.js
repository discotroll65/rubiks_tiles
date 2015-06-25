(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Game = RubiksTiles.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.leftFaceX = 50;
    this.leftFaceY = 350;
    this.faces = [
      new RubiksTiles.Face({
        color: "green",
        windowPlace: "centerStart"
      }),
      new RubiksTiles.Face({
        color: "white",
        windowPlace: "topStart"
      }),
      new RubiksTiles.Face({
        color: "yellow",
        windowPlace: "bottomStart"
      }),
      new RubiksTiles.Face({
        color: "orange",
        windowPlace: "leftStart"
      }),
      new RubiksTiles.Face({
        color: "red",
        windowPlace: "rightStart"
      }),
      new RubiksTiles.Face({
        color: "blue",
        windowPlace: "backStart"
      }),
    ];
  };

  Game.prototype.draw = function(ctx){
    ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);

    this.faces.forEach(function(face){
      face.draw(ctx);
    });

  };

})();
