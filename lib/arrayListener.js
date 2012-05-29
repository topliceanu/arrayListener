var arrayListener = function (arr) {
	'use strict';

	var _typeof = function (obj) {
			return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
		},

		cloneArray = function (arr) {
			return arr.slice(0, arr.length);
		},

		callbacks = {
			'change': []
		},

		trigger = function () {
			debugger;
			var _args = Array.prototype.slice.call(arguments);
			var ev = _args[0];
			var args = _args.slice(1);
			callbacks[ev].forEach( function (callback) {
				callback.apply(this, args); //TODO add params
			});
		},

		on = function (ev, callback) {
			if (_typeof(ev) !== 'string' ||
					_typeof(callbacks[ev]) !== 'array') {
				throw new Error('unsupported event '+ev);
			}
			if (_typeof(callback) !== 'function') {
				throw new Error('callback not specified');
			}
			callbacks[ev].push(callback);
		},	

		off = function (ev) {
			if (_typeof(ev) === 'string' ||
					callbacks.keys().indexOf(ev) !== -1) {
				callbacks[ev] = [];
			}
		},

		interval = 100, // ms
		snapshot = cloneArray(arr),

		different = function (arr1, arr2) {
			var i, n1 = arr1.length, n2 = arr2.length;
			if (n1 !== n2) {
				return true;
			}

			for (i = 0; i <= n1; i++) {
				if (arr1[i] !== arr2[i]) {
					return true;	
				}
			}
			return false;
		},

		listen = function () {
			var current = cloneArray(arr);
			if (different(snapshot, current)) {
				trigger('change', current, snapshot);
				snapshot = current;
			}
			
			setTimeout(listen, 100);
		};


	if (_typeof(arr) !== 'array') {
		throw new Error('argument must be array');
	}
	listen();

	return {
		'on': on,
		'off': off
	};
};



module.exports = arrayListener;
