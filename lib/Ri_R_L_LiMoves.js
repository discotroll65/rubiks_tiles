(function(){
  window.RubiksTiles = window.RubiksTiles || {};
  var Game = RubiksTiles.Game;

  Game.prototype.performRMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.rightFace.moveRotate();

    this.handleRandRiMoves({inverse: false});
    this.draw(this.ctx);
  };

  Game.prototype.performRiMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.rightFace.moveRotateI();

    this.handleRandRiMoves({inverse: true});
    this.draw(this.ctx);
  };

  Game.prototype.handleRandRiMoves = function(options){
    var face = this.facePerspective.centerFace;

    var oldRightColOfCenter = [
      face.grid[2][2].color, face.grid[1][2].color,
      face.grid[0][2].color
    ];

    var oldRightColOfTop = [
      this.facePerspective.topFace.grid[2][2].color,
      this.facePerspective.topFace.grid[1][2].color,
      this.facePerspective.topFace.grid[0][2].color
    ];

    var oldRightColOfBottom = [
      this.facePerspective.bottomFace.grid[2][2].color,
      this.facePerspective.bottomFace.grid[1][2].color,
      this.facePerspective.bottomFace.grid[0][2].color
    ];

    var oldLeftColOfBack = [
      this.facePerspective.backFace.grid[2][0].color,
      this.facePerspective.backFace.grid[1][0].color,
      this.facePerspective.backFace.grid[0][0].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        this.facePerspective.topFace.grid[2 - i][2].color = oldLeftColOfBack[i];
        face.grid[2 - i][2].color = oldRightColOfTop[i];
        this.facePerspective.bottomFace.grid[2 - i][2].color = oldRightColOfCenter[i];
        this.facePerspective.backFace.grid[2 - i][0].color = oldRightColOfBottom[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        this.facePerspective.topFace.grid[2 - i][2].color = oldRightColOfCenter[i];
        face.grid[2 - i][2].color = oldRightColOfBottom[i];
        this.facePerspective.bottomFace.grid[2 - i][2].color = oldLeftColOfBack[i];
        this.facePerspective.backFace.grid[2 - i][0].color = oldRightColOfTop[i];
      }
    }
  };

  Game.prototype.performLMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.leftFace.moveRotate();

    this.handleLandLiMoves({inverse: false});
    this.draw(this.ctx);
  };

  Game.prototype.performLiMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.leftFace.moveRotateI();

    this.handleLandLiMoves({inverse: true});
    this.draw(this.ctx);
  };

  Game.prototype.handleLandLiMoves = function(options){
    var face = this.facePerspective.centerFace;

    var oldLeftColOfCenter = [
      face.grid[2][0].color, face.grid[1][0].color,
      face.grid[0][0].color
    ];

    var oldLeftColOfTop = [
      this.facePerspective.topFace.grid[2][0].color,
      this.facePerspective.topFace.grid[1][0].color,
      this.facePerspective.topFace.grid[0][0].color
    ];

    var oldLeftColOfBottom = [
      this.facePerspective.bottomFace.grid[2][0].color,
      this.facePerspective.bottomFace.grid[1][0].color,
      this.facePerspective.bottomFace.grid[0][0].color
    ];

    var oldRightColOfBack = [
      this.facePerspective.backFace.grid[2][2].color,
      this.facePerspective.backFace.grid[1][2].color,
      this.facePerspective.backFace.grid[0][2].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        this.facePerspective.topFace.grid[2 - i][0].color = oldLeftColOfCenter[i];
        face.grid[2 - i][0].color = oldLeftColOfBottom[i];
        this.facePerspective.bottomFace.grid[2 - i][0].color = oldRightColOfBack[i];
        this.facePerspective.backFace.grid[2 - i][2].color = oldLeftColOfTop[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        this.facePerspective.topFace.grid[2 - i][0].color = oldRightColOfBack[i];
        face.grid[2 - i][0].color = oldLeftColOfTop[i];
        this.facePerspective.bottomFace.grid[2 - i][0].color = oldLeftColOfCenter[i];
        this.facePerspective.backFace.grid[2 - i][2].color = oldLeftColOfBottom[i];
      }
    }
  };

})();
