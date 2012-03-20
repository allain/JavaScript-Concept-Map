//Copyright (C) 2011 by Allain Lalonde (allain.lalonde@gmail.com)
//
//See the file LICENSE.txt for copying permission.

window.Point = function (x, y) {
  this.x = x;
  this.y = y;

  this.toString = function () {
    return "Point(" + x + ", " + y + ")";
  }

};

window.Vector = function (x,y) {
  this.x = x;
  this.y = y;

  this.scale = function(scale) {
    this.x *= scale;
    this.y *= scale;
    return this;
  }

  this.translate = function() {
    if (typeof(arguments[0]) === "object") {
      this.x += arguments[0].x;
      this.y += arguments[0].y;
    } else {
      this.x += arguments[0];
      this.y += arguments[1];
    }
    return this;
  }

  this.length = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  this.normalize = function() {
    var l = this.length();
    if (l > 0) {
      this.x /= l;
      this.y /= l;
    }
    return this;
  }

  this.toString = function () {
    return "Vector(" + x + ", " + y + ")";
  }
}