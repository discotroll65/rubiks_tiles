(function(){
  window.RubiksTiles = window.RubiksTiles || {};
  var Game = RubiksTiles.Game;

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
    opts.positiveNextCenter.reassignWindowPlace(opts.positiveNextCenterPlace);
    if(opts.negative && opts.xRotation){
      opts.positiveNextCenter.moveRotate().moveRotate();
    }

    opts.oldCenter.reassignWindowPlace(opts.newCenterPlace);

    opts.positiveNextBack.reassignWindowPlace(opts.positiveNextBackPlace);
    if(opts.positive && opts.xRotation) {
      opts.positiveNextBack.moveRotate().moveRotate();
    }

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

})();
