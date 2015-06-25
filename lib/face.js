(function(){
  window.RubiksTiles = window.RubiksTiles || {};

  var Face = RubiksTiles.Face = function (){
    this.grid = [
      [new RubiksTiles.Cell("blue", [100, 100]), new RubiksTiles.Cell("blue", [200,100]), new RubiksTiles.Cell("blue", [300, 100])],
      [new RubiksTiles.Cell("blue", [100, 200]), new RubiksTiles.Cell("blue", [200,200]), new RubiksTiles.Cell("blue", [300, 200])],
      [new RubiksTiles.Cell("blue", [100, 300]), new RubiksTiles.Cell("blue", [200,300]), new RubiksTiles.Cell("blue", [300, 300])]
    ];
  };

})();
