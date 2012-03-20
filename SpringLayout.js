//Copyright (C) 2011 by Allain Lalonde (allain.lalonde@gmail.com)
//
//See the file LICENSE.txt for copying permission.

window.SpringLayout = function() {
  var DAMPING = 0.7;
  var COULOMB_FACTOR = -100;
  var SPRING_CONSTANT = 0.05;
  var SPRING_LENGTH = 100;  

  function coulombRepulsion(c1, c2) {
    var f = new Vector(c2.x - c1.x, c2.y - c1.y);

    var lengthSquared = f.x * f.x + f.y * f.y;

    f.scale(lengthSquared > 0 ? 1 / lengthSquared : 1);

    f.scale(COULOMB_FACTOR);

    return f;
  }

  function hookeAttraction(c1, c2, desiredLength) {
    var f = new Vector(c2.x - c1.x, c2.y - c1.y);
    var length = f.length()
    return f.normalize().scale(length - desiredLength).scale(SPRING_CONSTANT);
  }      

  this.layoutMap = function(conceptMap, conceptMapUI) {
    var targetPos = [];    
    var stepCount = 0;
    var totalEnergy = 0;

    Relation.clearCaches();

    for (var i = 0; i < conceptMap.concepts.length ; i++) {
      var f = new Vector(0,0);

      var c1 = conceptMap.concepts[i];
      targetPos[c1] = new Vector(c1.pos.x, c1.pos.y);

      if (c1.$html.hasClass("ui-draggable-dragging")) {
        c1.v = new Vector(0,0);
        continue;
      }

      for (var j = 0; j < conceptMap.concepts.length; j++) {
        var c2 = conceptMap.concepts[j];
        var coulombForce = coulombRepulsion(c1.pos, c2.pos);
        f.translate(coulombForce.x, coulombForce.y);
      }

      for (var rel = 0; rel < conceptMap.relations.length; rel ++) {
        var relation = conceptMap.relations[rel];
        var hookeForce;
        if (relation.from == c1) {
          var edgePoints = relation.getEdgePoints();
          hookeForce = hookeAttraction(edgePoints.p1, edgePoints.p2, SPRING_LENGTH);
          f.translate(hookeForce);
        } else if (relation.to == c1) {
          var edgePoints = relation.getEdgePoints();
          hookeForce = hookeAttraction(edgePoints.p2, edgePoints.p1, SPRING_LENGTH);
          f.translate(hookeForce);
        }
      }

      c1.v.translate(f);
      c1.v.scale(DAMPING);

      targetPos[c1].translate(c1.v.x, c1.v.y);
    }


    for (var i = 0; i < conceptMap.concepts.length ; i++) {
      var c1 = conceptMap.concepts[i];
      c1.pos.x = Math.min(Math.max(targetPos[c1].x, 0), conceptMapUI.canvas.width);
      c1.pos.y = Math.min(Math.max(0, targetPos[c1].y), conceptMapUI.canvas.height - 30);
      totalEnergy += c1.v.length() * c1.v.length();
    }

    conceptMapUI.repaint();      

    return totalEnergy > 2.5 * conceptMap.concepts.length;
  }   
}


