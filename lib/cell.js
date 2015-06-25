(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Cell = RubiksTiles.Cell = function (color, pos){
    this.color = color;
    this.pos = pos;
  };

  Cell.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.rect(this.pos[0],this.pos[1], 100, 100);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

})();
