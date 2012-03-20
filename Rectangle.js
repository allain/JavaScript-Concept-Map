//Copyright (C) 2011 by Allain Lalonde (allain.lalonde@gmail.com)
//
//See the file LICENSE.txt for copying permission.

window.Rectangle = function(x, y, width, height) {
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;

  this.center = new Vector(x + width / 2, y + height /2);
  this.centerX = x + width /2;
  this.centerY = y + height /2;

  function outcode(p) {
    var rectSlope = Math.abs(height / width);
    var outSlope = Math.abs((p.y - (y + height /2)) / (p.x - (x + width /2)));

    if (rectSlope > outSlope) {
      //leaves on sides
      if (p.x < x) {
        return Rectangle.OUT_LEFT;
      } else if (p.x > x + width) {
        return Rectangle.OUT_RIGHT;
      }
    } else {
      // leaves on top or bottom
      if (p.y < y) {
        return Rectangle.OUT_TOP;
      } else if (p.y > y + height) {
        return Rectangle.OUT_BOTTOM;
      }
    }

    return 0;
  }
  
  this.getOutPointThroughCenter = function(theta) {
    var cx = this.centerX, cy = this.centerY;
    var w = this.width / 2;
    var h = this.height / 2;
    var d = Math.sqrt(w * w + h * h);

    var x = cx + d * Math.cos(theta);
    var y = cy + d * Math.sin(theta);

    var out = outcode(new Vector(x, y));

    var p = new Vector(cx, cy);
    if (out & Rectangle.OUT_TOP) {
      p.translate(- h * ((x - cx) / (y - cy)), -h);
    } else if (out & Rectangle.OUT_BOTTOM) {
      p.translate(h * ((x - cx) / (y - cy)), h);
    } else if (out & Rectangle.OUT_LEFT) {
      p.translate(-w, -w * ((y - cy) / (x - cx)));
    } else if (out & Rectangle.OUT_RIGHT) {
      p.translate(w, w * ((y-cy)/(x-cx)));
    }

    return p;  
  }
}
Rectangle.fromElement$ = function ($e, paddingTop, paddingLeft, border) {
  return new Rectangle(
    parseInt($e.css("left")),
    parseInt($e.css("top")),
    $e.width() + paddingLeft * 2 + border * 2,
    $e.height() + paddingTop * 2 + border * 2);
}

Rectangle.OUT_LEFT = 1;
Rectangle.OUT_RIGHT = 2;
Rectangle.OUT_TOP = 4;
Rectangle.OUT_BOTTOM = 8;
