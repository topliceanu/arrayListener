var mocha = require('mocha');
var assert = require('assert');

var arrayListener = require('./../');


describe('arrayListener', function () {
	it ('should trigger the event', function (done) {
		var arr = [1,2,3,4,5];
		var listener = arrayListener(arr);
		listener.on('change', function (newArr, oldArr) {
			debugger;
			assert.deepEqual(oldArr, [1,2,3,4,5]);
			assert.deepEqual(newArr, [1,2,3,4,5,6]);
			done();
		});
		arr.push(6);
	});
});


