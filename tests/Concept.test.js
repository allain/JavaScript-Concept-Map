//Copyright (C) 2011 by Allain Lalonde (allain@machete.ca)
//
//See the file LICENSE.txt for copying permission.

/*jslint white: true, browser: true, devel: true, onevar: true, undef: true, nomen: true, eqeqeq: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true, maxerr: 10000, indent: 2*/
/*global test, equals, ok, module, start, stop, Ajenda */



"use strict";

module("Concept");

test("Concept may be created with minimal params", function () {
  var concept = new Concept("testing");
  ok(concept !== null, "concept is not null");
  equals(concept.pos.x, 0, "x coordinate is 0");
  equals(concept.pos.y, 0, "y coordinate is 0");
  ok(concept.$html !== null, "jQuery for concept is not null");
  equals(concept.$html.length, 1, "jQuery for concept is wrapping an element");
});