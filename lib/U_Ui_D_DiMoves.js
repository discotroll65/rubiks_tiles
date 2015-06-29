(function(){
  window.RubiksTiles = window.RubiksTiles || {};
  var Game = RubiksTiles.Game;

  Game.prototype.performUMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.topFace.moveRotate();

    this.handleUandUiMoves({inverse: false});
    this.draw(this.ctx);
  };

  Game.prototype.performUiMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.topFace.moveRotateI();

    this.handleUandUiMoves({inverse: true});
    this.draw(this.ctx);
  };

  Game.prototype.handleUandUiMoves = function(options){
    var face = this.facePerspective.centerFace;

    var oldTopRowOfCenter = face.grid[0].map(function(cell){
      return cell.color;
    });
    var oldTopRowOfLeft = this.facePerspective.leftFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldTopRowOfRight = this.facePerspective.rightFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldTopRowOfBack = this.facePerspective.backFace.grid[0].map(function(cell){
      return cell.color;
    });

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        face.grid[0][i].color =  oldTopRowOfLeft[i];
        this.facePerspective.leftFace.grid[0][i].color =  oldTopRowOfBack[i];
        this.facePerspective.backFace.grid[0][i].color =  oldTopRowOfRight[i];
        this.facePerspective.rightFace.grid[0][i].color =  oldTopRowOfCenter[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        face.grid[0][i].color =  oldTopRowOfRight[i];
        this.facePerspective.leftFace.grid[0][i].color =  oldTopRowOfCenter[i];
        this.facePerspective.backFace.grid[0][i].color =  oldTopRowOfLeft[i];
        this.facePerspective.rightFace.grid[0][i].color =  oldTopRowOfBack[i];
      }
    }
  };

  Game.prototype.performDMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.bottomFace.moveRotate();

    this.handleDandDiMoves({inverse: false});
    this.draw(this.ctx);
  };

  Game.prototype.performDiMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.bottomFace.moveRotateI();

    this.handleDandDiMoves({inverse: true});
    this.draw(this.ctx);
  };

  Game.prototype.handleDandDiMoves = function(options){
    var face = this.facePerspective.centerFace;

    var oldBottomRowOfCenter = face.grid[2].map(function(cell){
      return cell.color;
    });
    var oldBottomRowOfLeft = this.facePerspective.leftFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldBottomRowOfRight = this.facePerspective.rightFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldBottomRowOfBack = this.facePerspective.backFace.grid[2].map(function(cell){
      return cell.color;
    });

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        face.grid[2][i].color =  oldBottomRowOfRight[i];
        this.facePerspective.leftFace.grid[2][i].color =  oldBottomRowOfCenter[i];
        this.facePerspective.backFace.grid[2][i].color =  oldBottomRowOfLeft[i];
        this.facePerspective.rightFace.grid[2][i].color =  oldBottomRowOfBack[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        face.grid[2][i].color =  oldBottomRowOfLeft[i];
        this.facePerspective.leftFace.grid[2][i].color =  oldBottomRowOfBack[i];
        this.facePerspective.backFace.grid[2][i].color =  oldBottomRowOfRight[i];
        this.facePerspective.rightFace.grid[2][i].color =  oldBottomRowOfCenter[i];
      }
    }
  };

})();
