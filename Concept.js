//Copyright (C) 2011 by Allain Lalonde (allain.lalonde@gmail.com)
//
//See the file LICENSE.txt for copying permission.

window.Concept = function(title, x, y) {
  this.$html = $("<div class='concept'>" + title + "</div>");
  this.$html.data('concept', this);
  this.title = title;
  this.pos = new Vector(x || 0, y || 0);
  this.v = new Vector(0, 0);

  this.toString = function () {
    return this.title;
  }
}