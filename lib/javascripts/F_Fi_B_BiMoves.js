(function(){
  window.RubiksTiles = window.RubiksTiles || {};
  var Game = RubiksTiles.Game;

  Game.prototype.performFMove = function(){
    var faces = this.facePerspective;

    faces.centerFace.moveRotate();

    this.callHandleF_Fi_U_UiMoves({leftAndTopIdxs: 2,
      rightAndBottomIdxs: 0, inverse: false});
    this.draw(this.ctx);
  };

  Game.prototype.performFiMove = function(){
    var faces = this.facePerspective;

    faces.centerFace.moveRotateI();

    this.callHandleF_Fi_U_UiMoves({leftAndTopIdxs: 2,
      rightAndBottomIdxs: 0, inverse: true});

    this.draw(this.ctx);
  };

  Game.prototype.performBMove = function(){
    var faces = this.facePerspective;

    faces.backFace.moveRotate();

    this.callHandleF_Fi_U_UiMoves({leftAndTopIdxs: 0,
      rightAndBottomIdxs: 2, inverse: true});
    this.draw(this.ctx);
  };

  Game.prototype.performBiMove = function(){
    var faces = this.facePerspective;

    faces.backFace.moveRotateI();

    this.callHandleF_Fi_U_UiMoves({leftAndTopIdxs: 0,
      rightAndBottomIdxs: 2, inverse: false});

    this.draw(this.ctx);
  };

  Game.prototype.callHandleF_Fi_U_UiMoves = function(opts){
    var faces = this.facePerspective;

    this.handleF_Fi_U_UiMoves({
      inverse: opts.inverse,
      leftAndTopIdxs: opts.leftAndTopIdxs,
      rightAndBottomIdxs: opts.rightAndBottomIdxs,
      oldShiftingRowOfTop: faces
        .topFace.grid[opts.leftAndTopIdxs].map(function(cell){
          return cell.color;
        }),
      oldShiftingColOfLeft: [
        faces.leftFace.grid[2][opts.leftAndTopIdxs].color,
        faces.leftFace.grid[1][opts.leftAndTopIdxs].color,
        faces.leftFace.grid[0][opts.leftAndTopIdxs].color
      ],
      oldShiftingRowOfBottom: faces
        .bottomFace.grid[opts.rightAndBottomIdxs].map(function(cell){
          return cell.color;
        }),
      oldShiftingColOfRight: [
        this.facePerspective.rightFace.grid[2][opts.rightAndBottomIdxs].color,
        this.facePerspective.rightFace.grid[1][opts.rightAndBottomIdxs].color,
        this.facePerspective.rightFace.grid[0][opts.rightAndBottomIdxs].color
      ]
    });
  };

  Game.prototype.handleF_Fi_U_UiMoves = function(opts){
    var i;
    if (opts.inverse){
      opts.oldShiftingRowOfTop = opts.oldShiftingRowOfTop.reverse();
      opts.oldShiftingColOfLeft = opts.oldShiftingColOfLeft.reverse();
      opts.oldShiftingRowOfBottom = opts.oldShiftingRowOfBottom.reverse();
      opts.oldShiftingColOfRight = opts.oldShiftingColOfRight.reverse();
    }

    var newTop = (opts.inverse) ? opts.oldShiftingColOfRight : opts.oldShiftingColOfLeft;
    var newRight = (opts.inverse) ? opts.oldShiftingRowOfBottom : opts.oldShiftingRowOfTop;
    var newBottom = (opts.inverse) ? opts.oldShiftingColOfLeft : opts.oldShiftingColOfRight;
    var newLeft = (opts.inverse) ? opts.oldShiftingRowOfTop : opts.oldShiftingRowOfBottom;

    for( i = 0; i < 3; i++){
      this.facePerspective.topFace.grid[opts.leftAndTopIdxs][i].color = newTop[i];
      this.facePerspective.leftFace.grid[i][opts.leftAndTopIdxs].color = newLeft[i];
      this.facePerspective.bottomFace.grid[opts.rightAndBottomIdxs][i].color = newBottom[i];
      this.facePerspective.rightFace.grid[i][opts.rightAndBottomIdxs].color = newRight[i];
    }
  };


})();
