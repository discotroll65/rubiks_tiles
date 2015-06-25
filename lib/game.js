(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Game = RubiksTiles.Game = function(){
    this.DIM_X = 800;
    this.DIM_Y = 800;
    this.face = new RubiksTiles.Face();
  };

  Game.prototype.draw = function(ctx){
    ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);

    this.face.grid.forEach(function(row){
      row.forEach(function(cell){
        cell.draw(ctx);
      });
    });

    ctx.beginPath();
    //xstart, y start, width, height
    ctx.rect(100,100, 300, 300);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 8;
    ctx.stroke();

  };

})();
