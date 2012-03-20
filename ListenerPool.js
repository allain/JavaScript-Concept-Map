//Copyright (C) 2011 by Allain Lalonde (allain.lalonde@gmail.com)
//
//See the file LICENSE.txt for copying permission.

function ListenerPool(object) {
  var listeners = [];
	this.length = 0;

  this.broadcastEvent = function (eventMethod, params) {
		for (var listenerIndex = 0; listenerIndex < listeners.length; listenerIndex++) {
      if (listeners[listenerIndex][eventMethod]) {
        listeners[listenerIndex][eventMethod].apply(object, params);
      }
    }
  };

  this.broadcastEventForEach = function (eventMethod, items) {
    for (var listenerIndex = 0; listenerIndex < items.length; listenerIndex++) {
      this.broadcastEvent(eventMethod, [items[listenerIndex]]);
    }
  };

	this.push = function (listener) {
    listeners.push(listener);
		this.length = listeners.length;
	}
}
