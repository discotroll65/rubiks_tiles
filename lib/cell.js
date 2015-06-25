(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Cell = RubiksTiles.Cell = function (opts){
    this.color = opts.color;
    this.pos = opts.pos;
    this.width = opts.cellWidth;
  };

  Cell.prototype.draw = function(ctx){
    ctx.beginPath();
    ctx.rect(this.pos[0],this.pos[1], this.width, this.width);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 4;
    ctx.stroke();
  };

})();
