//Copyright (C) 2011 by Allain Lalonde (allain.lalonde@gmail.com)
//
//See the file LICENSE.txt for copying permission.

(function() {  
  window.Relation = function(from, to, label) {
    this.$html = $("<div class='relation'>" + label + "</div>");
    this.from = from;
    this.to = to;
    this.label = label;

    this.toString = function () {
      return from + " " + label + " " + to;
    }
    
    function lookupRect(concept) {
      if (!window.Relation.rectCache[concept]) {
        var rectangle = Rectangle.fromElement$(concept.$html, 5, 10, 1);
        window.Relation.rectCache[concept] = rectangle;
      }
      
      return window.Relation.rectCache[concept];
    }
    
    this.getEdgePoints = function () {
      if (!window.Relation.edgePointCache[this]) {
        var rect1 = lookupRect(from);
        var rect2 = lookupRect(to);

        var theta = Math.atan2(rect2.center.y - rect1.center.y, rect2.center.x - rect1.center.x);
        var p1 = rect1.getOutPointThroughCenter(theta);
        var p2 = rect2.getOutPointThroughCenter(theta + Math.PI);
        
        window.Relation.edgePointCache[this] = {p1: p1, p2: p2, theta: theta};
      }
      
      return window.Relation.edgePointCache[this];
    }
  }
  
  window.Relation.clearCaches = function () {
    window.Relation.rectCache = [];
    window.Relation.edgePointCache = [];
  }
  
  window.Relation.rectCache = [];
  window.Relation.edgePointCache = [];
})();
