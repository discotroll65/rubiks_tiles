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

  Game.prototype.getFacePerspective = function(){
    var perspective = {};
    var that = this;
    Object.keys(this.faces).forEach(function(faceKey){
      var face = that.faces[faceKey];
      perspective[face.windowPlace] = (face.color + "Face");
    });
    return perspective;
  };

  Game.prototype.performPositiveXRotate = function(){
    this.axisRotate({
      positive: true,
      xRotation: true,
      newCenterPlace: "bottomFace",
      positiveNextCenterPlace: "centerFace",
      newBackPlace: "topFace",
      positiveNextBackPlace: "backFace",
      oldCenter: this.faces[this.facePerspective.centerFace],
      positiveNextCenter: this.faces[this.facePerspective.topFace],
      oldBack: this.faces[this.facePerspective.backFace],
      positiveNextBack: this.faces[this.facePerspective.bottomFace],
      negInvSpinFace: this.faces[this.facePerspective.leftFace],
      posInvSpinFace: this.faces[this.facePerspective.rightFace]
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
      oldCenter: this.faces[this.facePerspective.centerFace],
      positiveNextCenter: this.faces[this.facePerspective.topFace],
      oldBack: this.faces[this.facePerspective.backFace],
      positiveNextBack: this.faces[this.facePerspective.bottomFace],
      negInvSpinFace: this.faces[this.facePerspective.leftFace],
      posInvSpinFace: this.faces[this.facePerspective.rightFace]
    });
  };

  Game.prototype.performPositiveYRotate = function(){
    this.axisRotate({
      positive: true,
      newCenterPlace: "rightFace",
      positiveNextCenterPlace: "centerFace",
      newBackPlace: "leftFace",
      positiveNextBackPlace: "backFace",
      oldCenter: this.faces[this.facePerspective.centerFace],
      positiveNextCenter: this.faces[this.facePerspective.leftFace],
      oldBack: this.faces[this.facePerspective.backFace],
      positiveNextBack: this.faces[this.facePerspective.rightFace],
      negInvSpinFace: this.faces[this.facePerspective.bottomFace],
      posInvSpinFace: this.faces[this.facePerspective.topFace]
    });
  };

  Game.prototype.performNegativeYRotate = function(){
    this.axisRotate({
      negative: true,
      newCenterPlace: "leftFace",
      positiveNextCenterPlace: "backFace",
      newBackPlace: "rightFace",
      positiveNextBackPlace: "centerFace",
      oldCenter: this.faces[this.facePerspective.centerFace],
      positiveNextCenter: this.faces[this.facePerspective.leftFace],
      oldBack: this.faces[this.facePerspective.backFace],
      positiveNextBack: this.faces[this.facePerspective.rightFace],
      negInvSpinFace: this.faces[this.facePerspective.bottomFace],
      posInvSpinFace: this.faces[this.facePerspective.topFace]
    });
  };

  Game.prototype.performNegativeZRotate = function(){
    this.axisRotate({
      zRotation: true,
      negative: true,
      newCenterPlace: "leftFace",
      positiveNextCenterPlace: "bottomFace",
      newBackPlace: "rightFace",
      positiveNextBackPlace: "topFace",
      oldCenter: this.faces[this.facePerspective.topFace],
      positiveNextCenter: this.faces[this.facePerspective.leftFace],
      oldBack: this.faces[this.facePerspective.bottomFace],
      positiveNextBack: this.faces[this.facePerspective.rightFace],
      negInvSpinFace: this.faces[this.facePerspective.centerFace],
      posInvSpinFace: this.faces[this.facePerspective.backFace]
    });
  };

  Game.prototype.performPositiveZRotate = function(){
    this.axisRotate({
      zRotation: true,
      newCenterPlace: "rightFace",
      positiveNextCenterPlace: "topFace",
      newBackPlace: "leftFace",
      positiveNextBackPlace: "bottomFace",
      oldCenter: this.faces[this.facePerspective.topFace],
      positiveNextCenter: this.faces[this.facePerspective.leftFace],
      oldBack: this.faces[this.facePerspective.bottomFace],
      positiveNextBack: this.faces[this.facePerspective.rightFace],
      negInvSpinFace: this.faces[this.facePerspective.centerFace],
      posInvSpinFace: this.faces[this.facePerspective.backFace]
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
      opts.negInvSpinFace.moveRotateI();
      opts.posInvSpinFace.moveRotateI();
    } else {
      opts.positiveNextCenter.moveRotate();
      opts.positiveNextBack.moveRotate();
      opts.oldCenter.moveRotate();
      opts.oldBack.moveRotate();
      opts.negInvSpinFace.moveRotate();
      opts.posInvSpinFace.moveRotate();
    }

    this.draw(this.ctx);
  };

  Game.prototype.makeFaces = function(){
    return {
      greenFace: new RubiksTiles.Face({
        color: "green",
        windowPlace: "centerFace",
        topFace: "whiteFace",
        bottomFace: "yellowFace",
        leftFace: "orangeFace",
        rightFace: "redFace",
        backFace: "blueFace"
      }),

      whiteFace: new RubiksTiles.Face({
        color: "white",
        windowPlace: "topFace",
        topFace: "blueFace",
        bottomFace: "greenFace",
        leftFace: "orangeFace",
        rightFace: "redFace",
        backFace: "yellowFace"
      }),

      yellowFace: new RubiksTiles.Face({
        color: "yellow",
        windowPlace: "bottomFace",
        topFace: "blueFace",
        bottomFace: "greenFace",
        leftFace: "redFace",
        rightFace: "orangeFace",
        backFace: "whiteFace"
      }),

      orangeFace: new RubiksTiles.Face({
        color: "orange",
        windowPlace: "leftFace",
        topFace: "blueFace",
        bottomFace: "greenFace",
        leftFace: "yellowFace",
        rightFace: "whiteFace",
        backFace: "redFace"
      }),

      redFace: new RubiksTiles.Face({
        color: "red",
        windowPlace: "rightFace",
        topFace: "blueFace",
        bottomFace: "greenFace",
        leftFace: "whiteFace",
        rightFace: "yellowFace",
        backFace: "orangeFace"
      }),

      blueFace: new RubiksTiles.Face({
        color: "blue",
        windowPlace: "backFace",
        topFace: "whiteFace",
        bottomFace: "yellowFace",
        leftFace: "redFace",
        rightFace: "orangeFace",
        backFace: "greenFace"
      })
    };
  };

  Game.prototype.performFMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    face.moveRotate();

    this.handleFandFiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performFiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    face.moveRotateI();

    this.handleFandFiMoves({inverse: true, relFaces: relFaces});

    this.draw(this.ctx);
  };

  Game.prototype.handleFandFiMoves = function(options){
    var relFaces = options.relFaces;

    var oldBottomRowOfTop = relFaces.topFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldRightColOfLeft = [
      relFaces.leftFace.grid[2][2].color, relFaces.leftFace.grid[1][2].color,
      relFaces.leftFace.grid[0][2].color
    ];
    var oldTopRowOfBottom = relFaces.bottomFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldLeftColOfRight = [
      relFaces.rightFace.grid[2][0].color, relFaces.rightFace.grid[1][0].color,
      relFaces.rightFace.grid[0][0].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2][i].color =  oldLeftColOfRight.reverse()[i];
        relFaces.leftFace.grid[i][2].color = oldBottomRowOfTop.reverse()[i];
        relFaces.bottomFace.grid[0][i].color = oldRightColOfLeft.reverse()[i];
        relFaces.rightFace.grid[i][0].color = oldTopRowOfBottom.reverse()[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2][i].color = oldRightColOfLeft[i];
        relFaces.leftFace.grid[i][2].color = oldTopRowOfBottom[i];
        relFaces.bottomFace.grid[0][i].color = oldLeftColOfRight[i];
        relFaces.rightFace.grid[i][0].color = oldBottomRowOfTop[i];
      }
    }
  };

  Game.prototype.performBMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.backFace.moveRotate();

    this.handleBandBiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performBiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.backFace.moveRotateI();

    this.handleBandBiMoves({inverse: true, relFaces: relFaces});

    this.draw(this.ctx);
  };

  Game.prototype.handleBandBiMoves = function(options){
    var relFaces = options.relFaces;

    var oldTopRowOfTop = relFaces.topFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldLeftColOfLeft = [
      relFaces.leftFace.grid[2][0].color, relFaces.leftFace.grid[1][0].color,
      relFaces.leftFace.grid[0][0].color
    ];
    var oldBottomRowOfBottom = relFaces.bottomFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldRightColOfRight = [
      relFaces.rightFace.grid[2][2].color, relFaces.rightFace.grid[1][2].color,
      relFaces.rightFace.grid[0][2].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[0][i].color =  oldLeftColOfLeft[i];
        relFaces.leftFace.grid[i][0].color = oldBottomRowOfBottom[i];
        relFaces.bottomFace.grid[2][i].color = oldRightColOfRight[i];
        relFaces.rightFace.grid[i][2].color = oldTopRowOfTop[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[0][i].color =  oldRightColOfRight.reverse()[i];
        relFaces.leftFace.grid[i][0].color = oldTopRowOfTop.reverse()[i];
        relFaces.bottomFace.grid[2][i].color = oldLeftColOfLeft.reverse()[i];
        relFaces.rightFace.grid[i][2].color = oldBottomRowOfBottom.reverse()[i];
      }
    }
  };

  Game.prototype.performRMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.rightFace.moveRotate();

    this.handleRandRiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performRiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.rightFace.moveRotateI();

    this.handleRandRiMoves({inverse: true, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.handleRandRiMoves = function(options){
    var relFaces = options.relFaces;
    var face = this.faces[this.facePerspective.centerFace];

    var oldRightColOfCenter = [
      face.grid[2][2].color, face.grid[1][2].color,
      face.grid[0][2].color
    ];

    var oldRightColOfTop = [
      relFaces.topFace.grid[2][2].color, relFaces.topFace.grid[1][2].color,
      relFaces.topFace.grid[0][2].color
    ];

    var oldRightColOfBottom = [
      relFaces.bottomFace.grid[2][2].color, relFaces.bottomFace.grid[1][2].color,
      relFaces.bottomFace.grid[0][2].color
    ];

    var oldLeftColOfBack = [
      relFaces.backFace.grid[2][0].color, relFaces.backFace.grid[1][0].color,
      relFaces.backFace.grid[0][0].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2 - i][2].color = oldLeftColOfBack[i];
        face.grid[2 - i][2].color = oldRightColOfTop[i];
        relFaces.bottomFace.grid[2 - i][2].color = oldRightColOfCenter[i];
        relFaces.backFace.grid[2 - i][0].color = oldRightColOfBottom[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2 - i][2].color = oldRightColOfCenter[i];
        face.grid[2 - i][2].color = oldRightColOfBottom[i];
        relFaces.bottomFace.grid[2 - i][2].color = oldLeftColOfBack[i];
        relFaces.backFace.grid[2 - i][0].color = oldRightColOfTop[i];
      }
    }
  };

  Game.prototype.performLMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.leftFace.moveRotate();

    this.handleLandLiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performLiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.leftFace.moveRotateI();

    this.handleLandLiMoves({inverse: true, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.handleLandLiMoves = function(options){
    var relFaces = options.relFaces;
    var face = this.faces[this.facePerspective.centerFace];

    var oldLeftColOfCenter = [
      face.grid[2][0].color, face.grid[1][0].color,
      face.grid[0][0].color
    ];

    var oldLeftColOfTop = [
      relFaces.topFace.grid[2][0].color, relFaces.topFace.grid[1][0].color,
      relFaces.topFace.grid[0][0].color
    ];

    var oldLeftColOfBottom = [
      relFaces.bottomFace.grid[2][0].color, relFaces.bottomFace.grid[1][0].color,
      relFaces.bottomFace.grid[0][0].color
    ];

    var oldRightColOfBack = [
      relFaces.backFace.grid[2][2].color, relFaces.backFace.grid[1][2].color,
      relFaces.backFace.grid[0][2].color
    ];

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2 - i][0].color = oldLeftColOfCenter[i];
        face.grid[2 - i][0].color = oldLeftColOfBottom[i];
        relFaces.bottomFace.grid[2 - i][0].color = oldRightColOfBack[i];
        relFaces.backFace.grid[2 - i][2].color = oldLeftColOfTop[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        relFaces.topFace.grid[2 - i][0].color = oldRightColOfBack[i];
        face.grid[2 - i][0].color = oldLeftColOfTop[i];
        relFaces.bottomFace.grid[2 - i][0].color = oldLeftColOfCenter[i];
        relFaces.backFace.grid[2 - i][2].color = oldLeftColOfBottom[i];
      }
    }
  };

  Game.prototype.performUMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.topFace.moveRotate();

    this.handleUandUiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performUiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.topFace.moveRotateI();

    this.handleUandUiMoves({inverse: true, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.handleUandUiMoves = function(options){
    var relFaces = options.relFaces;
    var face = this.faces[this.facePerspective.centerFace];

    var oldTopRowOfCenter = face.grid[0].map(function(cell){
      return cell.color;
    });
    var oldTopRowOfLeft = relFaces.leftFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldTopRowOfRight = relFaces.rightFace.grid[0].map(function(cell){
      return cell.color;
    });
    var oldTopRowOfBack = relFaces.backFace.grid[0].map(function(cell){
      return cell.color;
    });

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        face.grid[0][i].color =  oldTopRowOfLeft[i];
        relFaces.leftFace.grid[0][i].color =  oldTopRowOfBack[i];
        relFaces.backFace.grid[0][i].color =  oldTopRowOfRight[i];
        relFaces.rightFace.grid[0][i].color =  oldTopRowOfCenter[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        face.grid[0][i].color =  oldTopRowOfRight[i];
        relFaces.leftFace.grid[0][i].color =  oldTopRowOfCenter[i];
        relFaces.backFace.grid[0][i].color =  oldTopRowOfLeft[i];
        relFaces.rightFace.grid[0][i].color =  oldTopRowOfBack[i];
      }
    }
  };

  Game.prototype.performDMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.bottomFace.moveRotate();

    this.handleDandDiMoves({inverse: false, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.performDiMove = function(){
    var face = this.faces[this.facePerspective.centerFace];
    var relFaces = this.getRelativeFaces(face, this);

    relFaces.bottomFace.moveRotateI();

    this.handleDandDiMoves({inverse: true, relFaces: relFaces});
    this.draw(this.ctx);
  };

  Game.prototype.handleDandDiMoves = function(options){
    var relFaces = options.relFaces;
    var face = this.faces[this.facePerspective.centerFace];

    var oldBottomRowOfCenter = face.grid[2].map(function(cell){
      return cell.color;
    });
    var oldBottomRowOfLeft = relFaces.leftFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldBottomRowOfRight = relFaces.rightFace.grid[2].map(function(cell){
      return cell.color;
    });
    var oldBottomRowOfBack = relFaces.backFace.grid[2].map(function(cell){
      return cell.color;
    });

    if (options.inverse){
      for(var i = 0; i < 3; i++){
        face.grid[2][i].color =  oldBottomRowOfRight[i];
        relFaces.leftFace.grid[2][i].color =  oldBottomRowOfCenter[i];
        relFaces.backFace.grid[2][i].color =  oldBottomRowOfLeft[i];
        relFaces.rightFace.grid[2][i].color =  oldBottomRowOfBack[i];
      }
    } else{
      for(var i = 0; i < 3; i++){
        face.grid[2][i].color =  oldBottomRowOfLeft[i];
        relFaces.leftFace.grid[2][i].color =  oldBottomRowOfBack[i];
        relFaces.backFace.grid[2][i].color =  oldBottomRowOfRight[i];
        relFaces.rightFace.grid[2][i].color =  oldBottomRowOfCenter[i];
      }
    }
  };

  Game.prototype.draw = function(){
    var that = this;
    this.ctx.clearRect(0,0, this.DIM_X, this.DIM_Y);

    Object.keys(this.faces).forEach(function(face){
      that.faces[face].draw(that.ctx);
    });
  };

  Game.prototype.getRelativeFaces = function(faceReference, that){
    var topFace = that.faces[faceReference.topFace];
    var bottomFace = that.faces[faceReference.bottomFace];
    var leftFace = that.faces[faceReference.leftFace];
    var rightFace = that.faces[faceReference.rightFace];
    var backFace = that.faces[faceReference.backFace];
    return {
      topFace: topFace,
      bottomFace: bottomFace,
      leftFace: leftFace,
      rightFace: rightFace,
      backFace: backFace
    };
  };
})();
