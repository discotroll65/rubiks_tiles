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

  Game.prototype.performPositiveXRotate = function(){
    this.axisRotate({
      positive: true,
      xRotation: true,
      newCenterPlace: "bottomFace",
      positiveNextCenterPlace: "centerFace",
      newBackPlace: "topFace",
      positiveNextBackPlace: "backFace",
      oldCenter: this.facePerspective.centerFace,
      positiveNextCenter: this.facePerspective.topFace,
      oldBack: this.facePerspective.backFace,
      positiveNextBack: this.facePerspective.bottomFace,
      negInvSpinFace: this.facePerspective.leftFace,
      posInvSpinFace: this.facePerspective.rightFace
    });
  };

  Game.prototype.performNegativeXRotate = function(){
    this.axisRotate({
      negative: true,
      xRotation: true,
      newCenterPlace: "topFace",
      positiveNextCenterPlace: "backFace",
      newBackPlace: "bottomFace",
      positiveNextBackPlace: "centerFace",
      oldCenter: this.facePerspective.centerFace,
      positiveNextCenter: this.facePerspective.topFace,
      oldBack: this.facePerspective.backFace,
      positiveNextBack: this.facePerspective.bottomFace,
      negInvSpinFace: this.facePerspective.leftFace,
      posInvSpinFace: this.facePerspective.rightFace
    });
  };

  Game.prototype.performPositiveYRotate = function(){
    this.axisRotate({
      positive: true,
      newCenterPlace: "rightFace",
      positiveNextCenterPlace: "centerFace",
      newBackPlace: "leftFace",
      positiveNextBackPlace: "backFace",
      oldCenter: this.facePerspective.centerFace,
      positiveNextCenter: this.facePerspective.leftFace,
      oldBack: this.facePerspective.backFace,
      positiveNextBack: this.facePerspective.rightFace,
      negInvSpinFace: this.facePerspective.bottomFace,
      posInvSpinFace: this.facePerspective.topFace
    });
  };

  Game.prototype.performNegativeYRotate = function(){
    this.axisRotate({
      negative: true,
      newCenterPlace: "leftFace",
      positiveNextCenterPlace: "backFace",
      newBackPlace: "rightFace",
      positiveNextBackPlace: "centerFace",
      oldCenter: this.facePerspective.centerFace,
      positiveNextCenter: this.facePerspective.leftFace,
      oldBack: this.facePerspective.backFace,
      positiveNextBack: this.facePerspective.rightFace,
      negInvSpinFace: this.facePerspective.bottomFace,
      posInvSpinFace: this.facePerspective.topFace
    });
  };

  Game.prototype.performNegativeZRotate = function(){
    this.axisRotate({
      zRotation: true,
      negative: true,
      newCenterPlace: "rightFace",
      positiveNextCenterPlace: "topFace",
      newBackPlace: "leftFace",
      positiveNextBackPlace: "bottomFace",
      oldCenter: this.facePerspective.topFace,
      positiveNextCenter: this.facePerspective.leftFace,
      oldBack: this.facePerspective.bottomFace,
      positiveNextBack: this.facePerspective.rightFace,
      negInvSpinFace: this.facePerspective.backFace,
      posInvSpinFace: this.facePerspective.centerFace
    });


  };

  Game.prototype.performPositiveZRotate = function(){
    this.axisRotate({
      zRotation: true,
      positive: true,
      newCenterPlace: "leftFace",
      positiveNextCenterPlace: "bottomFace",
      newBackPlace: "rightFace",
      positiveNextBackPlace: "topFace",
      oldCenter: this.facePerspective.topFace,
      positiveNextCenter: this.facePerspective.leftFace,
      oldBack: this.facePerspective.bottomFace,
      positiveNextBack: this.facePerspective.rightFace,
      negInvSpinFace: this.facePerspective.backFace,
      posInvSpinFace: this.facePerspective.centerFace
    });
  };

  Game.prototype.axisRotate = function(opts){
    // debugger
    opts.positiveNextCenter.reassignWindowPlace(opts.positiveNextCenterPlace);
    if(opts.negative && opts.xRotation){ opts.positiveNextCenter.moveRotate().moveRotate(); }

    opts.oldCenter.reassignWindowPlace(opts.newCenterPlace);

    opts.positiveNextBack.reassignWindowPlace(opts.positiveNextBackPlace);
    if(opts.positive && opts.xRotation) {opts.positiveNextBack.moveRotate().moveRotate();}

    opts.oldBack.reassignWindowPlace(opts.newBackPlace);
    if(opts.xRotation){ opts.oldBack.moveRotate().moveRotate(); }

    this.facePerspective = this.getFacePerspective();

    if (opts.positive && !opts.zRotation){
      opts.negInvSpinFace.moveRotate();
      opts.posInvSpinFace.moveRotateI();
    } else if (!opts.zRotation){
      opts.negInvSpinFace.moveRotateI();
      opts.posInvSpinFace.moveRotate();
    } else if(opts.positive){
      opts.positiveNextCenter.moveRotateI();
      opts.positiveNextBack.moveRotateI();
      opts.oldCenter.moveRotateI();
      opts.oldBack.moveRotateI();
      opts.posInvSpinFace.moveRotateI();
      opts.negInvSpinFace.moveRotate();
    } else {
      opts.positiveNextCenter.moveRotate();
      opts.positiveNextBack.moveRotate();
      opts.oldCenter.moveRotate();
      opts.oldBack.moveRotate();
      opts.negInvSpinFace.moveRotateI();
      opts.posInvSpinFace.moveRotate();
    }

    this.draw(this.ctx);
  };

  Game.prototype.performFMove = function(){
    var face = this.facePerspective.centerFace;

    face.moveRotate();

    this.handleFandFiMoves({inverse: false});
    this.draw(this.ctx);
  };

  Game.prototype.performFiMove = function(){
    var face = this.facePerspective.centerFace;

    face.moveRotateI();

    this.handleFandFiMoves({inverse: true});

    this.draw(this.ctx);
  };

  Game.prototype.handleFandFiMoves = function(options){

    var oldBottomRowOfTop = this.facePerspective.topFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldRightColOfLeft = [
      this.facePerspective.leftFace.grid[2][2].color, this.facePerspective.leftFace.grid[1][2].color,
      this.facePerspective.leftFace.grid[0][2].color
    ];
    var oldTopRowOfBottom = this.facePerspective.bottomFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldLeftColOfRight = [
      this.facePerspective.rightFace.grid[2][0].color, this.facePerspective.rightFace.grid[1][0].color,
      this.facePerspective.rightFace.grid[0][0].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        this.facePerspective.topFace.grid[2][i].color =  oldLeftColOfRight.reverse()[i];
        this.facePerspective.leftFace.grid[i][2].color = oldBottomRowOfTop.reverse()[i];
        this.facePerspective.bottomFace.grid[0][i].color = oldRightColOfLeft.reverse()[i];
        this.facePerspective.rightFace.grid[i][0].color = oldTopRowOfBottom.reverse()[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        this.facePerspective.topFace.grid[2][i].color = oldRightColOfLeft[i];
        this.facePerspective.leftFace.grid[i][2].color = oldTopRowOfBottom[i];
        this.facePerspective.bottomFace.grid[0][i].color = oldLeftColOfRight[i];
        this.facePerspective.rightFace.grid[i][0].color = oldBottomRowOfTop[i];
      }
    }
  };

  Game.prototype.performBMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.backFace.moveRotate();

    this.handleBandBiMoves({inverse: false});
    this.draw(this.ctx);
  };

  Game.prototype.performBiMove = function(){
    var face = this.facePerspective.centerFace;

    this.facePerspective.backFace.moveRotateI();

    this.handleBandBiMoves({inverse: true});

    this.draw(this.ctx);
  };

  Game.prototype.handleBandBiMoves = function(options){

    var oldTopRowOfTop = this.facePerspective.topFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldLeftColOfLeft = [
      this.facePerspective.leftFace.grid[2][0].color, this.facePerspective.leftFace.grid[1][0].color,
      this.facePerspective.leftFace.grid[0][0].color
    ];
    var oldBottomRowOfBottom = this.facePerspective.bottomFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldRightColOfRight = [
      this.facePerspective.rightFace.grid[2][2].color, this.facePerspective.rightFace.grid[1][2].color,
      this.facePerspective.rightFace.grid[0][2].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        this.facePerspective.topFace.grid[0][i].color =  oldLeftColOfLeft[i];
        this.facePerspective.leftFace.grid[i][0].color = oldBottomRowOfBottom[i];
        this.facePerspective.bottomFace.grid[2][i].color = oldRightColOfRight[i];
        this.facePerspective.rightFace.grid[i][2].color = oldTopRowOfTop[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        this.facePerspective.topFace.grid[0][i].color =  oldRightColOfRight.reverse()[i];
        this.facePerspective.leftFace.grid[i][0].color = oldTopRowOfTop.reverse()[i];
        this.facePerspective.bottomFace.grid[2][i].color = oldLeftColOfLeft.reverse()[i];
        this.facePerspective.rightFace.grid[i][2].color = oldBottomRowOfBottom.reverse()[i];
      }
    }
  };

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
      this.facePerspective.topFace.grid[2][2].color, this.facePerspective.topFace.grid[1][2].color,
      this.facePerspective.topFace.grid[0][2].color
    ];

    var oldRightColOfBottom = [
      this.facePerspective.bottomFace.grid[2][2].color, this.facePerspective.bottomFace.grid[1][2].color,
      this.facePerspective.bottomFace.grid[0][2].color
    ];

    var oldLeftColOfBack = [
      this.facePerspective.backFace.grid[2][0].color, this.facePerspective.backFace.grid[1][0].color,
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
      this.facePerspective.topFace.grid[2][0].color, this.facePerspective.topFace.grid[1][0].color,
      this.facePerspective.topFace.grid[0][0].color
    ];

    var oldLeftColOfBottom = [
      this.facePerspective.bottomFace.grid[2][0].color, this.facePerspective.bottomFace.grid[1][0].color,
      this.facePerspective.bottomFace.grid[0][0].color
    ];

    var oldRightColOfBack = [
      this.facePerspective.backFace.grid[2][2].color, this.facePerspective.backFace.grid[1][2].color,
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
