//Copyright (C) 2011 by Allain Lalonde (allain@machete.ca)
//
//See the file LICENSE.txt for copying permission.

/*jslint white: true, browser: true, devel: true, onevar: true, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true, maxerr: 10000, indent: 2*/
/*global test, equals, ok, module, start, stop, Point */

"use strict";

module("Vector");

test("Vector creates with x and y", function () {
  var p = new Vector(1, 2);
  equals(p.x, 1);
  equals(p.y, 2);
});

test("Vector translates properly", function() {
  var p = new Vector(0, 0);
  p.translate(1, 2);
  equals(p.x, 1);
  equals(p.y, 2);
});

test("Vector scales properly", function() {
  var p = new Vector(1, 2);
  p.scale(2);
  equals(p.x, 2);
  equals(p.y, 4);
});

test("Vector normalizes correctly to unit vector", function() {
  var p = new Vector(1, 2);
  p.normalize();
  ok(Math.abs(p.length() - 1) < 0.001, "length is practically 1");
});

test("Vector length caculates length of vector", function() {
  var p = new Vector(2, 2);
  equals(p.length(), Math.sqrt(8));
});